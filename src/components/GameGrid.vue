<template>
	<div class="hello">
		<ul class="gameGrid">
			<li class="gameItem" v-for="game in games">
				<p class="gameName">{{ game.name }}</p>
				<p>Team Next: {{ game.teamNext }}</p>
				<p>Team Current: {{ game.teamCurrent }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
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
		games(){
			return this.$store.getters.gamesInOrder;
		}
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
	width:500px;
	display:flex;
	justify-content:space-between;
}
.gameItem{
	display:flex;
	align-items:center;
	justify-content:space-between;
	border:1px solid #cacaca;
	padding:20px;
	margin:10px;
	flex-wrap:wrap;

	&:last-child{
		border-bottom:1px solid #cacaca;
	}
}
.gameName{
	font-weight:bold;
	margin:0px;
}
</style>
