<template>
	<div class="hello">
		<ul class="gameGrid" v-bind:class="{ isRunning: roundRunning }">
			<li class="gameItem" v-for="game in games">
				<p class="gameName">{{ game.name }}</p>
				<p class="info">Team Next:<br><span class="id" v-if="teamById( game.teamNext )">{{ teamById( game.teamNext ).name }}</span></p>
				<p class="info">Team Current:<br><span class="id" v-if="teamById( game.teamCurrent )">{{ teamById( game.teamCurrent ).name }}</span></p>
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

	&.isRunning{
		.gameItem{
			opacity:0.5
		}
	}
}
.gameItem{
	display:flex;
	justify-content:space-between;
	border:1px solid #cacaca;
	padding:20px;
	margin:10px;
	flex-wrap:wrap;
	text-align:left;

	.info{
		flex-basis:100%;
		text-align:left;
	}

	&:last-child{
		border-bottom:1px solid #cacaca;
	}
}
.gameName{
	font-weight:bold;
	margin:0px;
	text-align:center;
}
.id{
	font-style:italic;
	font-size:10px;
}
</style>
