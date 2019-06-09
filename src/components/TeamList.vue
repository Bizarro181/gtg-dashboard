<template>
	<div class="hello">
		<ul class="teamsList">
			<li v-for="( team, index ) in teams" class="teamItem" v-bind:class="{ ready: team.ready }">
				<p class="teamName">{{ team.name }}<br><span class="id">{{ team.id }}</span></p>
				<div class="actions">
					<input type="checkbox" :checked="team.ready" v-on:change="validateReady( index, $event )" />
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
				id: ''
			}
		}
	},
	methods:{
		addTeam(){
			this.$store.dispatch( 'createTeam', 
				{
					name: this.teamData.name,
					emails: this.teamData.emails.split( ',' ),
				}
			);
			this.teamData.name = '';
			this.teamData.emails = '';
			this.teamData.ready = '';
		},
		validateReady( index, event ){
			event.preventDefault();
			// if the team isnt ready, check if making it ready would give us more ready teams than we have ready games
			if( this.teams[index].ready === false && this.readyTeams.length + 1 <= this.activeGamesInOrder.length ) {
				this.$store.commit( 'setTeamReadyStatus', {
					team: this.teams[index],
					status: true
				});
			}
			// If we're unreadying the team, we dont care (for now), just do it
			if( this.teams[index].ready === true ) {
				this.$store.commit( 'setTeamReadyStatus', {
					team: this.teams[index],
					status: false
				});
			}
		}
	},
	computed:{
		teams(){
			return this.$store.state.teams;
		},
		readyTeams(){
			return this.$store.getters.readyTeams;
		},
		activeGamesInOrder(){
			return this.$store.getters.activeGamesInOrder;
		},
		canReady(){
			return this.readyTeams.length + 1 <= this.activeGamesInOrder.length;
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
	text-align:left;
}

.id{
	font-size:10px;
	font-style:italic;
}
</style>
