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
		}
	},
	actions:{
		fetchGames( context ) {
			let games = [];
			fb.gamesCollection.get().then( querySnapshot => {
				querySnapshot.forEach( doc => {
					let game = doc.data();
					game.id = doc.id;
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
				context.commit( 'addGame', game );
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
		}
	}
})
