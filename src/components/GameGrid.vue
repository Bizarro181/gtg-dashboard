<template>
	<div class="hello">
		<ul class="gameGrid" v-bind:class="{ isRunning: roundRunning }">
			<li class="gameItem" v-for="game in games" v-bind:class="{ open: isOpen(game.id)}">
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
								v-on:click="talkToGame( game.id, 'resume' )"
								v-if="game.status == 'paused'">
								Resume
							</button>
						</li>
						<li class="settingActionItem">
							<button 
								v-on:click="talkToGame( game.id, 'EndGame' )"
								v-bind:disabled="game.status == 'idle' || game.status == 'ending'">
								End Game
							</button>
						</li>
						<li class="settingActionItem">
							<button
								v-on:click="talkToGame( game.id, 'reset' )"
								v-bind:disabled="game.status !== 'running'">
								Stop
							</button>
						</li>
						<li class="settingActionItem">
							<button
								v-on:click="talkToGame( game.id, 'status' )">
								Check Status
							</button>
						</li>
					</ul>
					<div class="gameSettingsClose" v-on:click="toggleOpen( game.id )">X</div>
				</div>
			</li>
		</ul>
		<div class="sortModal" v-if="showModal">
			<div class="listsWrapper">
				<ul class="gameList">
					<li v-for="game in activeGamesInOrder">{{ game.name }}</li>
				</ul>
				<ul class="teamsList">
					<draggable v-model="teamsInGameOrder" group="teams">
						<li v-for="team in teamsInGameOrder">{{ team.name }}</li>
					</draggable>
				</ul>
			</div>
		</div>
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
			return uiElement.menuOpen;
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
			this.showModal = !this.showModal;
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

// Sort Modal
.listsWrapper{
	display:flex;
}
</style>
