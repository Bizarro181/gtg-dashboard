<template>
	<div class="hello">
		<h1>GameList</h1>
		<ul class="gamesList">
			<li class="gameItem" v-for="game in games">
				<p class="gameName">{{ game.name }}</p>
				<input :value="game.address" v-on:input="updateAddress( game.id, $event )">
				<select type="text">
					<option value=""> - Logo -</option>
					<option v-for="(name, slug) in logos" :value="slug" :selected="slug == game.logo">{{ name }}</option>
				</select>
				<div class="actions">
					<button v-on:click="removeGame(game.id)">Remove</button>
				</div>
			</li>
		</ul>
		<form v-on:submit.prevent="addGame">
			<input type="text" v-model="gameData.name" placeholder="Game Name" />
			<input type="text" v-model="gameData.address" placeholder="Address" />
			<input type="text" v-model="gameData.order" placeholder="Order" />
			<select type="text" v-model="gameData.logo">
				<option value=""> - Logo -</option>
				<option v-for="(name, slug) in logos" :value="slug">{{ name }}</option>
			</select>
			<button type="submit">Add</button>
		</form>
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
				id: '',
				address: 'localhost:2021',
				logo: '',
			},
			logos:{
				fact_attack_pixel: "Fact Attack",
				power_surge_pixel: "Power Surge",
				manhunt_pixel: "Manhunt"
			}
		}
	},
	methods:{
		addGame(){
			this.$store.dispatch( 'addGame', {
				name: this.gameData.name,
				order: this.gameData.order,
				active: true,
				address: this.gameData.address,
				logo: this.gameData.logo
			});
			this.gameData.name = '';
			this.gameData.order = '';
			this.gameData.address = 'localhost:2021';
			this.gameData.logo = '';
		},
		removeGame( id ){
			this.$store.dispatch( 'removeGame', id);
		},
		updateAddress( id, event ) {
			this.$store.dispatch( 'updateGameAddress', {
				gameId: id,
				value: event.target.value
			});
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
.gamesList{
	list-style:none;
	margin:0px auto;
	padding:0px;
	width:500px;
}
.gameItem{
	display:flex;
	align-items:center;
	justify-content:space-between;
	border:1px solid #cacaca;
	border-bottom:none;
	padding:20px;

	&:last-child{
		border-bottom:1px solid #cacaca;
	}
}
.gameName{
	font-weight:bold;
	margin:0px;
}
</style>
