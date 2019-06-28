import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '@/firebase.js';
import uuidv3 from 'uuid/v3';

// Generate our UUID namespaces
const rootNamespace = '8a529469-9676-4682-9a5f-466df3938395';
const gameNamespace = uuidv3( 'game', rootNamespace );
const teamNamespace = uuidv3( 'team', rootNamespace );

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		session: '',
		running: false,
		ready: false,
		teams:[],
		games:[],
		assignments:[],
		scores:[],
		sessionInfo:{
			gamesStarted:0,
			gamesCompleted:0
		}
	},
	getters:{
		teams( state, getters ) {
			return state.teams;
		},
		gamesInOrder( state, getters ) {
			return state.games.sort((a, b) => {
				if ( a.order < b.order ) {
					return -1;
				}
				if ( a.orbder > b.order ) {
					return 1;
				}
				return 0;
			});
		},
		activeGamesInOrder( state, getters ) {
			return getters.gamesInOrder.filter(( game ) => {
				return game.active == true;
			});
		},
		activeEmptyGamesInOrder( state, getters ) {
			return getters.activeGamesInOrder.filter(( game ) => {
				return game.teamNext == '';
			});
		},
		readyTeams( state, getters ) {
			return state.teams.filter(( team ) => {
				return team.ready == true;
			});
		},
		newTeams( state, getters ) {
			return getters.readyTeams.filter(( team ) => {
				return team.gameStarted == '';
			});
		},
		rotatingTeams( state, getters ) {
			return getters.readyTeams.filter(( team ) => {
				return team.gameStarted !== '';
			});
		},
		teamById( state, getters ) {
			return ( id ) => {
				return state.teams.find( team => {
					return team.id === id;
				});
			}; 
		},
		gameById: ( state, getters ) => ( id ) => {
			return state.games.find( game => game.id === id);
		},
		ready( state ){
			return state.ready;
		},
		running( state ){
			return state.running;
		},
		scoresById( state, getters ) {
			return ( id ) => {
				if( state.scores.length > 0 ) {
					// Filter by id, map to only the score and reduce it to the sum
					return state.scores.filter( score => score.teamId === id ).map( score => score.score ).reduce( ( prev, next ) => prev + next, 0 );
				} else {
					return false;
				}
			}
		},
		scoreCountById( state, getters ) {
			return ( id ) => {
				if( state.scores.length > 0 ) {
					// Filter by id, map to only the score and reduce it to the sum
					return state.scores.filter( score => score.teamId === id ).length;
				} else {
					return false;
				}
			}
		},
	},
	actions:{
		SOCKET_gameComplete( context, data ){
			context.commit( 'addScore', data );
			context.commit( 'incrementGamesCompleted' );
			// Have all the games that we sent start signals to completed?
			if( context.state.sessionInfo.gamesCompleted == context.state.sessionInfo.gamesStarted ) {
				context.commit( 'setRunningFalse' );
				context.commit( 'resetGamesStarted' );
				context.commit( 'resetGamesCompleted' );
			}
		},
		SOCKET_updateTeams( context, teams ) {
			context.commit( 'setTeams', teams )
		},
		fetchGames( context ) {
			let games = [];
			fb.gamesCollection.get().then( querySnapshot => {
				querySnapshot.forEach( doc => {
					let game = doc.data();
					game.teamCurrent = '';
					game.teamNext = '';
					games.push( game );
				});
				console.log( games );
				context.commit( 'setGames', games );
			});
		},
		removeGame( context, id ) {
			fb.gamesCollection.doc( id ).delete().then( () => {
				let index = context.state.games.findIndex((element, index, array) => {
					return element.id == id;
				});
				context.commit( 'removeGame', index );
			});
		},
		addGame( context, game ) {
			// Get the creation timestamp
			const created = Date.now();
			// Generate a UUID for our game and set some default values
			game.id = uuidv3( game.name + created, gameNamespace );
			game.created = created;
			game.teamCurrent = '';
			// Update the store
			context.commit( 'addGame', game );
			// Update the remote
			fb.gamesCollection.add( game );
		},
		createTeam( context, team ) {
			// Modify the object before updating to the DB
			// team.created = fb.firebase.firestore.Timestamp.now();
			// Get the creation timestamp
			const created = Date.now();
			// Generate a UUID for the team and set some default values
			team.id = uuidv3( team.name + created, teamNamespace );
			team.ready = false;
			team.gameStarted = '';
			team.gameCurrent = '';
			team.gameNext = '';
			// Update the store
			context.commit( 'addTeam', team );
			// Update the remote
			fb.teamsCollection.add( team );
		},
		nextRound( context ) {
			const rotatingTeams = context.getters.rotatingTeams;
			const activeGamesInOrder = context.getters.activeGamesInOrder;
			if ( rotatingTeams.length > 0 ) {
				// Reverse through the active games array
				for( let i = activeGamesInOrder.length - 1; i >= 0; i-- ) {
					let game = activeGamesInOrder[i];
					// If this game isnt empty, we want to advance this team to the next game
					if ( game.teamCurrent !== '' ) {
						// Set the next game
						let nextGame = {};
						if( i == activeGamesInOrder.length - 1 ) {
							nextGame = activeGamesInOrder[0];
						} else {
							nextGame = activeGamesInOrder[i+1];
						}
						const teamId = game.teamCurrent;
						// Set the next game's next team to the current game's current team
						context.commit( 'assignGameToTeam', {
							game: nextGame,
							teamNext: teamId
						});
						//nextGame.teamNext = teamId;
						// Clear out the current game's current team
						context.commit( 'clearTeamCurrentOnGame', game );
						//game.teamCurrent = '';
						// Update the next game for the team
						const team = rotatingTeams.find(( team ) => {
							return team.id == teamId;
						});
						context.commit( 'assignNextTeamToGame', {
							team: team,
							gameNext: nextGame.id
						});
						context.commit( 'clearGameCurrentOnTeam', team );
					}
				}
			}
			// Get active games and teams
			const newTeams = context.getters.newTeams;
			if ( newTeams.length > 0 ) {
				// Assign new teams to empty rooms
				newTeams.forEach(( team ) => {
					let games = context.getters.activeEmptyGamesInOrder;
					// Assign the "first game" to the game
					context.commit( 'assignFirstGame', {
						team: team,
						game: games[0].id
					});
					// Assign the game to the team
					context.commit( 'assignNextTeamToGame', {
						team: team,
						gameNext: games[0].id
					});
					// Assign the team to the game
					context.commit( 'assignGameToTeam', {
						game: games[0],
						teamNext: team.id
					});
				});
			}
			// Advance the round - we're ready to start
			context.commit( 'roundReadyTrue' );
			// Update teams to the remote
			this._vm.$socket.emit( 'updateTeams', context.getters.teams );
		},
		startRound( context ) {
			// Get all active games w/ teams
			const activeFilledGames = context.state.games.filter(( game ) => {
				return game.active && game.teamNext !== '';
			});
			// Get all active teams w/ games
			const readyAssignedTeams = context.state.teams.filter(( team ) => {
				return team.ready && team.gameNext !== '';
			});
			// Move next game to current game and empty out next game
			activeFilledGames.forEach(( game ) => {
				context.commit( 'startSingleGame', {
					game: game,
					nextTeam: game.teamNext
				});
				context.commit( 'incrementGamesStarted' );
			});
			// Change team assignments from next game to current game
			readyAssignedTeams.forEach(( team ) => {
				context.commit( 'moveTeamToGame', {
					team: team,
					nextGame: team.gameNext
				});
			});
			// Set running to true and reset the roundReady flag
			context.commit( 'setRunningTrue' );
			context.commit( 'roundReadyFalse' );
			// Fake a game by timing back in
			// setTimeout(() => {
			// 	context.commit( 'setRunningFalse' );
			// }, 5000);
		}
	},
	mutations: {
		addTeam(state, team) {
			state.teams.push( team );
		},
		setTeams(state, teams) {
			Vue.set( state, 'teams', [...teams] );
		},
		addGame(state, game) {
			state.games.push( game );
		},
		setGames(state, games) {
			state.games = games;
		},
		removeGame(state, index){
			state.games.splice( index, 1 );
		},
		assignNextTeamToGame( state, payload ) {
			payload.team.gameNext = payload.gameNext;
		},
		assignGameToTeam( state, payload ) {
			payload.game.teamNext = payload.teamNext;
		},
		assignFirstGame( state, payload ) {
			payload.team.gameStarted = payload.game;
		},
		// Take teamNext and move to teamCurrent
		startSingleGame( state, payload ) {
			payload.game.teamCurrent = payload.nextTeam;
			payload.game.teamNext = '';
		},
		// Take gameNext and move to gameCurrent
		moveTeamToGame( state, payload ) {
			payload.team.gameCurrent = payload.nextGame;
			payload.team.gameNext = '';
		},
		clearTeamCurrentOnGame( state, payload ) {
			payload.teamCurrent = '';
		},
		clearGameCurrentOnTeam( state, payload ) {
			payload.gameCurrent = '';
		},
		roundReadyTrue( state ) {
			state.ready = true;
		},
		roundReadyFalse( state ) {
			state.ready = false;
		},
		setRunningTrue( state ) {
			state.running = true;
		},
		setRunningFalse( state ) {
			state.running = false;
		},
		setTeamReadyStatus( state, payload ) {
			payload.team.ready = payload.status;
		},
		addScore( state, scoreData ) {
			state.scores.push( scoreData );
		},
		incrementGamesStarted( state ) {
			state.sessionInfo.gamesStarted++;
		},
		resetGamesStarted( state ) {
			state.sessionInfo.gamesStarted = 0;
		},
		incrementGamesCompleted( state ) {
			state.sessionInfo.gamesCompleted++;
		},
		resetGamesCompleted( state ) {
			state.sessionInfo.gamesCompleted = 0;
		}

	}
})
