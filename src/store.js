import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '@/firebase.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		session: '',
		running: false,
		teams:[],
		games:[],
		assignments:[],
		scores:[],
		sessionInfo:[
			{
				teamName: 'Robert',
				emails: '',
				ready: true,
				gameStarted: 'gameid',
				gameNext: 'gameid',
				gameCurrent: 'gameId',
				scores:[
					{
						game: 'id',
						score: 10
					},
					{
						game: 'id1',
						score: 20,
					},
					{
						game: 'id2',
						score: 30,
					}
				]
			}
		]
	},
	getters:{
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
				return team.gameCurrent == '';
			});
		},
		rotatingTeams( state, getters ) {
			return getters.readyTeams.filter(( team ) => {
				return team.gameCurrent !== '';
			});
		}
	},
	actions:{
		fetchGames( context ) {
			let games = [];
			fb.gamesCollection.get().then( querySnapshot => {
				querySnapshot.forEach( doc => {
					let game = doc.data();
					game.id = doc.id;
					game.teamCurrent = '';
					game.teamNext = '';
					games.push( game );
				});
				context.commit( 'setGames', games );
			})
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
			fb.gamesCollection.add( game ).then( (docRef) => {
				game.id = docRef.id;
				game.teamCurrent = '';
				// game.created = fb.firestore.FieldValue.serverTimestamp()
				context.commit( 'addGame', game );
			});
		},
		createTeam( context, team ) {
			// Modify the object before updating to the DB
			team.created = fb.firebase.firestore.Timestamp.now();
			fb.teamsCollection.add( team ).then( (docRef) => {
				// Modify the obejct before adding to the store
				team.id = docRef.id;
				team.ready = false;
				team.gameStarted = '';
				team.gameCurrent = '';
				team.gameNext = '';
				context.commit( 'addTeam', team );
			})
		},
		nextRound( context ) {
			// Get active games and teams
			const newTeams = context.getters.newTeams;
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
			// Assign in-progress teams to next rooms
			// get active rooms in order
			// get active teams in order
			// Advance teams one index
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
			});
			// Change team assignments from next game to current game
			readyAssignedTeams.forEach(( team ) => {
				context.commit( 'moveTeamToGame', {
					team: team,
					nextGame: team.gameNext
				});
			});
		}
	},
	mutations: {
		addTeam(state, team) {
			state.teams.push( team );
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
		}

	}
})
