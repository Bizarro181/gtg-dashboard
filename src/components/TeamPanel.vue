<template>
	<div class="teamPanel">
		<ul class="teamsList">
			<li v-for="( team, index ) in teams" class="teamItem" v-bind:class="{ ready: team.ready }">
				<div class="teamInfo">
					<div class="teamInfoWrapper">
						<p class="teamName">{{ team.name }}</p>
						<p class="points"><span class="bold">{{ scoresById( team.id ) ? scoresById( team.id ) : 0 }}</span> points</p>
						<p class="gamesPlayed"><span class="bold">{{ scoreCountById( team.id ) ? scoreCountById( team.id ) : 0 }}</span> {{ gamesText( scoreCountById( team.id ) ) }} played</p>
					</div>
					<div class="teamActions">
						<div class="teamAction readyAction">
							<input id="ready" type="checkbox" :checked="team.ready" :disabled="( !team.ready && !canReady )" v-on:change="validateReady( index, $event )" /><label for="ready">Ready?</label>
						</div>
						<div class="teamAction removeAction" :disabled="( team.ready )" v-on:click="removeTeam( index );">
							Remove
						</div>
					</div>
				</div>
				<!-- <p>{{ team.id }}</p> -->
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
			},
			nouns: ["ninjas", "chairs", "pancakes", "statues", "unicorns", "rainbows", "lasers", "senors", "bunnies", "captains", "cupcakes", "carrots", "gnomes", "glitters", "potatoes", "salads", "curtains", "beets", "toilets", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "kazoos", "singers", "trampolines", "carousels", "carnival", "locomotives", "balloons", "artisans", "artists", "colorists", "inkers", "coppersmiths", "directors", "designers", "models", "musicians", "pencillers", "producers", "teachers", "mechanics", "beaders","engineers", "millers", "moldmakers", "plants", "bears",],
			adjs: ["adamant", "boorish", "calamitous", "caustic", "bald", "itchy", "fierce", "great", "massive", "little", "big","fat","skinny","clean","dirty","fancy","fit","gentle","happy","sad","morose","embarrased","rowdy","jolly","silly","excellent","breathtaking", "wandering", "precise", "knowing"]
		}
	},
	methods:{
		addTeam(){
			if ( this.teamData.name == '' ) {
				this.generateTeamName();
			}
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
		},
		generateTeamName(){
			let adj = Math.floor( Math.random() * this.adjs.length );
			let noun = Math.floor( Math.random() * this.nouns.length );
			this.teamData.name = this.adjs[adj] + ' ' + this.nouns[noun];
		},
		gamesText( score ){
			if ( score == 1 ){
				return "game";
			} else {
				return "games";
			}
		},
		removeTeam( teamIndex ) {
			if( !this.teams[teamIndex].ready ){
				this.$store.commit( 'removeTeam', teamIndex );
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
			scoresById: 'scoresById',
			scoreCountById: 'scoreCountById'
		})
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.teamPanel{
	height:calc( 100vh - 180px );
	overflow:scroll;
}
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
	padding:0px;
	border-bottom-left-radius:15px;
	border-bottom-right-radius:15px;
	overflow:hidden;
	margin-bottom:20px;

	&:last-child{
		border-bottom:1px solid #cacaca;
	}

	&.ready{
		.readyAction{
			background:#68D391;
		}
	}
}
.bold{
	font-weight:bold;
}
.teamInfo{
	font-weight:500;
	margin:0px;
	text-align:left;
	width:100%;

	p{
		margin:0px;
	}

	.teamName{
		font-size:1.2em;
		text-transform:capitalize;
	}

	.points{
		font-style:italic;
		font-size:smaller;
		color:#6d6c6c;
	}

	.gamesPlayed{
		font-style:italic;
		font-size:smaller;
		color:#6d6c6c;
	}
}

.teamInfoWrapper{
	padding:20px 20px 10px 20px;
}

.id{
	font-size:10px;
	font-style:italic;
}

.teamActions{
	display:flex;
	align-items:center;
	justify-content:center;
}

.teamAction{
	flex:1 0 auto;
	padding:5px 0px;
	text-align:center;
	font-size:smaller;
}

.readyAction{
	background:#F7FAFC;
	color:#276749;
}

.removeAction{
	cursor:pointer;
	color:#C53030;
	background-color:#FC8181;
	border-left:1px solid #CBD5E0;
	

	&[disabled]{
		cursor:default;
		color:#CBD5E0;
		background:#F7FAFC;
	}
}
</style>
