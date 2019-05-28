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
		startRound( context ) {
			// Get active games and teams
			const newTeams = context.getters.newTeams;
			// Assign new teams to empty rooms
			newTeams.forEach(( team ) => {
				let games = context.getters.activeEmptyGamesInOrder;
				context.commit( 'assignNextTeamToRoom', {
					team: team,
					gameNext: games[0].id
				});
				context.commit( 'assignRoomToTeam', {
					game: games[0],
					teamNext: team.id
				});
			});
			
			// Loop through teams, if they werent in a game put them in first available game
			// const nextRoundTeams = readyTeams.map((team) => {
			// 	// If they dont have a 
			// 	if( team.currentGame != '' ) {
			// 		context.state.teams.indexOf( '' );
			// 	}
			// });
			// // If they were in a game, put them into the
			// console.log( context.getters.readyTeams );

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
		assignNextTeamToRoom( state, payload ) {
			payload.team.gameNext = payload.gameNext;
		},
		assignRoomToTeam( state, payload ) {
			payload.game.teamNext = payload.teamNext;
		}

	}
})
