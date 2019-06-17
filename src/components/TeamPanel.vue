<template>
	<div class="teamPanel">
		<h1>TeamList</h1>
		<ul class="teamsList">
			<li v-for="( team, index ) in teams" class="teamItem" v-bind:class="{ ready: team.ready }">
				<p class="teamName">{{ team.name }}</p><br><span v-if="team.ready">Score: {{ scoresById( team.id) }}</span>
				<div class="actions">
					<input type="checkbox" :checked="team.ready" :disabled="( !team.ready && !canReady )" v-on:change="validateReady( index, $event )" />
				</div>
			</li>
		</ul>
		<form v-on:submit.prevent="addTeam">
			<input type="text" v-model="teamData.name" placeholder="Team Name" />
			<input type="text" v-model="teamData.emails" placeholder="Email(s)" />
			<button type="submit">Add</button>
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

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
			} else if( this.teams[index].ready === true ) {
				// If we're unreadying the team, we dont care (for now), just do it
				this.$store.commit( 'setTeamReadyStatus', {
					team: this.teams[index],
					status: false
				});
			}
		}
	},
	computed:{
		teams(){
			return this.$store.getters.teams;
		},
		readyTeams(){
			return this.$store.getters.readyTeams;
		},
		activeGamesInOrder(){
			return this.$store.getters.activeGamesInOrder;
		},
		canReady(){
			return this.readyTeams.length + 1 <= this.activeGamesInOrder.length;
		},
		...mapGetters({
			scoresById: 'scoresById'
		})
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.teamsList{
	list-style:none;
	margin:0px auto;
	padding:0px;
	width:100%;
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
