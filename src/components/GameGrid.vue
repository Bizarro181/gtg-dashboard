<template>
	<div class="hello">
		<ul class="gameGrid" v-bind:class="{ isRunning: roundRunning }">
			<li class="gameItem" v-for="game in games">
				<p class="gameName">{{ game.name }}</p>
				<p class="info" v-if="game.teamNext !== ''">
					<span class="teamName" v-if="teamById( game.teamNext )">{{ teamById( game.teamNext ).name }}</span><br>
					<span class="stateLabel">Next Team</span>
				</p>
				<p class="info" v-if="game.teamCurrent !== ''">
					<span class="teamName" v-if="teamById( game.teamCurrent )">{{ teamById( game.teamCurrent ).name }}</span><br>
					<span class="stateLabel">Current Team</span>
				</p>
				<p class="info empty" v-if="game.teamNext == '' && game.teamCurrent == ''">Empty</p>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data(){
		return {
			gameData:{
				name: '',
				order: '',
				active: true,
				id: ''
			}
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
		}
	},
	computed:{
		...mapGetters({
			teamById: 'teamById',
			games: 'gamesInOrder',
			roundRunning: 'running'
		})
	},

	created(){
		this.$store.dispatch( 'fetchGames' );
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

	&:last-child{
		border-bottom:1px solid #cacaca;
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
</style>
