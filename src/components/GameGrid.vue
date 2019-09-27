<template>
	<div class="hello">
		<ul class="gameGrid" v-bind:class="{ isRunning: roundRunning }">
			<li class="gameItem" v-for="game in games" v-bind:class="{ open: isOpen(game.id), inactive: !game.active }">
				<div class="gameSettingsToggle" v-on:click="toggleOpen( game.id )">*</div>
				<p class="gameName">{{ game.name }}</p>
				<p class="info" v-if="game.teamNext !== ''">
					<span class="teamName" v-if="teamById( game.teamNext )">{{ teamById( game.teamNext ).name }} <span v-on:click="openModal()" class="moveText">Move</span></span><br>
					<span class="stateLabel">Next Team</span>
				</p>
				<p class="info" v-if="game.teamCurrent !== ''">
					<span class="teamName" v-if="teamById( game.teamCurrent )">{{ teamById( game.teamCurrent ).name }}</span><br>
					<span class="stateLabel">Current Team</span>
				</p>
				<p class="info empty" v-if="game.teamNext == '' && game.teamCurrent == ''">Empty</p>
				<div class="gameSettings">
					<p class="status" v-bind:class="game.status"><span class="indicator"></span>{{ game.status }}</p>
					<ul class="settingActions">
						<li class="settingActionItem">
							<button 
								v-on:click="talkToGame( game.id, 'pause' )"
								v-bind:disabled="game.status !== 'running'"
								v-if="game.status !== 'paused'">
								Pause
							</button>
							<button 
								v-on:click="talkToGame( game.id, 'pause' )"
								v-if="game.status == 'paused'">
								Resume
							</button>
						</li>
						<li class="settingActionItem">
							<button
								v-on:click="talkToGame( game.id, 'kill' )"
								v-bind:disabled="game.status !== 'running'">
								Stop
							</button>
						</li>
						<li class="settingActionItem">
							<button
								v-on:click="talkToGame( game.id, 'dump' )">
								Check Status
							</button>
						</li>
					</ul>
					<div class="activateButtons">
						<button
							v-on:click="setGameActiveState( game, false )"
							v-if="game.active == true">
							Deactivate
						</button>
						<button
							v-on:click="setGameActiveState( game, true )"
							v-if="game.active == false">
							Activate
						</button>
					</div>
					<div class="gameSettingsClose" v-on:click="toggleOpen( game.id )">X</div>
				</div>
			</li>
		</ul>
		<div class="sortModal" v-if="showModal">
			<h2 class="modalTitle">Assign Teams</h2>
			<div class="listsWrapper">
				<ul class="gameList">
					<li v-for="game in activeGamesInOrder">{{ game.name }}</li>
				</ul>
				<ul class="teamsList">
					<draggable v-model="teamsInGameOrder" group="teams">
						<li v-for="team in teamsInGameOrder" v-bind:class="{empty: team.name == 'empty'}">{{ team.name }}</li>
					</draggable>
				</ul>
			</div>
			<div class="buttons">
				<button class="save" v-on:click="saveAndCloseSort()">Save</button>
			</div>
		</div>
		<div class="sortModalOverlay" v-if="showModal"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';

export default {
	data(){
		return {
			ui:[],
			gameData:{
				name: '',
				order: '',
				active: true,
				id: ''
			},
			showModal: false,
			teamsInGameOrder:[]
		}
	},
	methods:{
		addGame(){
			this.$store.dispatch( 'addGame', {name: this.gameData.name, order: this.gameData.order, active: true} );
			this.gameData.name = '';
			this.gameData.order = '';
		},
		removeGame( id ){
			this.$store.dispatch( 'removeGame', id );
		},
		isOpen( id ){
			let uiElement = this.ui.find(( element ) => {
				return element.id == id;
			});
			if ( typeof uiElement !== 'undefined' ) {
				return uiElement.menuOpen;
			} else {
				return;
			}
		},
		toggleOpen( id ){
			let uiElementIndex = this.ui.findIndex((element) => {
				return element.id == id;
			});
			this.ui[uiElementIndex].menuOpen = !this.ui[uiElementIndex].menuOpen;
		},
		talkToGame( id, action ){
			this.$store.dispatch( 'talkToGame', {
				id: id,
				route: action
			});
		},
		checkStatus( id ) {
			this.$store.dispatch( 'checkStatus', id );
		},
		openModal(){
			// Order the team by the games in order
			this.teamsInGameOrder = [];
			this.activeGamesInOrder.forEach(( game ) => {
				if( game.teamNext !== "" ) {
					this.teamsInGameOrder.push( this.teamById( game.teamNext ) );
				} else {
					this.teamsInGameOrder.push( { name: "empty", placeholder: true } )
				}
			});
			this.showModal = true;
		},
		setGameActiveState( game, state ){
			if( state == true ) {
				this.$store.commit( 'updateGameActive', game );
			} else {
				this.$store.commit( 'updateGameInactive', game )
			}
		},
		saveAndCloseSort(){
			this.showModal = false;
			// Clear clear out all active games
			this.activeGamesInOrder.forEach((game) => {
				this.$store.commit( 'clearTeamNextOnGame', game );
			});
			// Re-assign all the teams we have have
			this.teamsInGameOrder.forEach((team, index) => {
				let game = this.activeGamesInOrder[index];
				// Clear out the gamecurrent on the team
				this.$store.commit( 'clearGameNextOnTeam', team );
				// Clear out this team's id on the game
				this.$store.commit( 'clearTeamNextOnGame', game );
				// If the team name is literally "empty" then it's the placeholder and we dont want to assign anything based on this
				if ( team.name !== "empty" ) {
					// Assign the next team to the game
					this.$store.commit( 'assignGameToTeam', {
						game: game,
						teamNext: team.id
					});
					// Assign the next game to the team
					this.$store.commit( 'assignNextTeamToGame', {
						team: team,
						gameNext: game.id
					});
				}
			});
			this.showModal = false;
		}
	},
	computed:{
		...mapGetters({
			teamById: 'teamById',
			games: 'gamesInOrder',
			roundRunning: 'running',
			activeGamesInOrder: 'activeGamesInOrder'

		})
	},
	created(){
		this.$store.dispatch( 'fetchGames' ).then(() => {
			this.games.forEach(( val ) => {
				this.ui.push({
					id: val.id,
					menuOpen: false
				});
			});
		});		
	},
	components:{
		draggable
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.gameGrid{
	list-style:none;
	margin:0px auto;
	padding:0px;
	width:100%;
	display:flex;
	justify-content:space-between;
	margin-top:-10px;
	flex-wrap:wrap;

	&.isRunning{
		.gameItem{
			opacity:0.5
		}
	}
}
.gameItem{
	border:1px solid #cacaca;
	padding:20px;
	margin:10px;
	text-align:left;
	width:calc( 33% - 60px );
	border-radius:5px;
	min-height:150px;
	display:flex;
	flex-direction:column;
	justify-content:space-around;
	position:relative;
	overflow:hidden;

	&:last-child{
		border-bottom:1px solid #cacaca;
	}

	&:hover{
		.gameSettingsToggle{
			opacity:1;
		}
	}

	&.open{
		.gameSettingsToggle{
			display:none;
		}

		.gameSettings{
			display:block;
		}

		&.inactive{
			opacity:1;
		}
	}

	&.inactive{
		opacity:0.5;
		background:#EDF2F7;
	}
}

.info{
	text-align:center;
	font-size:1.2em;
	line-height:0.85em;

	&.empty{
		color:#cdcdcd;
		font-style:italic;
	}

	.stateLabel{
		text-transform:uppercase;
		font-size:0.5em;
	}

	.teamName{
		text-transform:capitalize;
		position:relative;

		&:hover{
			.moveText{
				opacity:0.8;
			}
		}
	}

	.moveText{
		text-transform:uppercase;
		text-decoration:underline;
		font-size:10%;
		position:absolute;
		opacity:0;
		left:calc( 100% + 5px );
		top:50%;
		transform:translateY( -50% );
		transition:opacity 200ms ease;
		cursor:pointer;
	}
}
.gameName{
	font-weight:bold;
	margin:0px;
	text-align:center;
	font-size:1.5em;
}
.id{
	font-style:italic;
	font-size:10px;
}
.gameSettingsToggle{
	opacity:0;
	border:1px solid #cacaca;
	padding:3px;
	text-align:center;
	position:absolute;
	width:15px;
	height:15px;
	top:10px;
	right:10px;
	border-radius:3px;
	box-shadow:0px 1px 2px #cacaca;
	cursor:pointer;
	transition:all 0.15s ease;

	&:hover{
		box-shadow:0px 1px 6px #cacaca;
	}
}

.gameSettingsClose{
	position:absolute;
	width:15px;
	height:15px;
	top:10px;
	right:10px;
	text-align:center;
}

.gameSettings{
	position:absolute;
	left:0px;
	right:0px;
	top:0px;
	bottom:0px;
	background:rgba( #2A4365, 0.90 );
	display:none;
	color:#ffffff;
	padding:20px;
}

.status{
	text-transform:capitalize;
	margin:0px 0px 20px 0px;
	text-align:center;

	&.error{
		.indicator{
			background:#C53030;
			box-shadow:0px 0px 5px #F56565;
		}
	}

	&.idle{
		.indicator{
			background:#9AE6B4;
			box-shadow:0px 0px 5px #F0FFF4;
		}
	}

	&.running{
		.indicator{
			background:#2F855A;
			box-shadow:0px 0px 5px #48BB78;
		}
	}

	&.paused{
		.indicator{
			background:#F6E05E;
			box-shadow:0px 0px 5px #FEFCBF;
		}
	}

	&.ending{
		.indicator{
			background:#DD6B20;
			box-shadow:0px 0px 5px #F6AD55;
		}
	}
}

.indicator{
	display:inline-block;
	height:10px;
	width:10px;
	background:#ffffff;
	border-radius:100%;
	margin-right:8px;
}

.settingActions{
	list-style:none;
	margin:0px;
	padding:0px;
	text-align:center;
}

.settingActionItem{
	padding:2px;
	display:inline;
}

.activateButtons{
	position:absolute;
	bottom:10px;
	left:10px;
}

// Sort Modal
.sortModalOverlay{
	position:absolute;
	top:0px;
	left:0px;
	bottom:0px;
	right:0px;
	background:rgba( #000000, 0.35 );
	z-index:9;
}
.sortModal{
	position:absolute;
	top:15%;
	left:50%;
	transform:translateX( -50% );
	background:#ffffff;
	padding:10px 0px 0px;
	border:1px solid #cacaca;
	z-index:10;
	border-radius:10px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	overflow:hidden;
}
.teamsList{
	margin:0px;
	padding:0px;
	list-style:none;

	li{
		background:#EDF2F7;
		border-radius:3px;
		padding:5px 10px;
		font-weight:bold;
		text-transform:capitalize;
		margin-bottom:15px;
		cursor:all-scroll;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

		&.empty{
			background:none;
			font-style:italic;
			font-weight:400;
			box-shadow:none;
			color:#A0AEC0;
		}
	}
}
.gameList{
	margin:0px;
	padding:0px;
	list-style:none;

	li{
		padding:5px 15px 5px 5px;
		margin-bottom:15px;
		font-weight:bold;
		text-align:left;

	}
}

.listsWrapper{
	display:flex;
	margin:0px 50px 20px;
}

.buttons{
	text-align:right;
	padding:10px;
	background:#EDF2F7;
}

.save{
	background:#2C5282;
	border:none;
	font-weight:bold;
	color:#ffffff;
	padding:10px 20px;
	border-radius:5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	display:inline-block;
	cursor:pointer;
}
</style>
