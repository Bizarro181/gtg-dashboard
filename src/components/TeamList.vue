<template>
	<div class="hello">
		<h1>TeamList</h1>
		<ul class="teamsList">
			<li v-for="team in teams" class="teamItem" v-bind:class="{ ready: team.ready }">
				<p class="teamName">{{ team.name }}</p>
				<div class="actions">
					<input type="checkbox" v-model="team.ready" />
				</div>
			</li>
		</ul>
		<form v-on:submit.prevent="addTeam">
			<input type="text" v-model="teamData.name" placeholder="Team Name" />
			<input type="text" v-model="teamData.emails" placeholder="Email(s)" />
			<input type="checkbox" v-model="teamData.ready" />
			<button type="submit">Add</button>
		</form>
	</div>
</template>

<script>
export default {
	data(){
		return {
			teamData:{
				name: '',
				emails: '',
				id: '',
				ready: false
			}
		}
	},
	methods:{
		addTeam(){
			this.$store.commit( 'addTeam', {name: this.teamData.name, emails: this.teamData.emails, ready: this.teamData.ready} );
			this.teamData.name = '';
			this.teamData.emails = '';
			this.teamData.ready = '';
		}
	},
	computed:{
		teams(){
			return this.$store.state.teams;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.teamsList{
	list-style:none;
	margin:0px auto;
	padding:0px;
	width:500px;
}
.teamItem{
	display:flex;
	align-items:center;
	justify-content:space-between;
	border:1px solid #cacaca;
	border-bottom:none;
	padding:20px;

	&:last-child{
		border-bottom:1px solid #cacaca;
	}

	&.ready{
		background:#cce8c6;
	}
}
.teamName{
	font-weight:500;
	margin:0px;
}
</style>
