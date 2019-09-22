<template>
	<div class="teamPanel">
		<h1>Leaderboard</h1>
		<ul class="teamsList">
			<li v-for="( team, index ) in teamsSortedByScore" class="teamItem" v-bind:class="{ ready: team.ready }">
				<div class="scoreLeft">
					<p class="teamName">{{ team.name }}</p>
					<p class="gamesPlayed">{{ scoreCountById( team.id ) ? scoreCountById( team.id ) : 0 }} {{ gamesText( scoreCountById( team.id ) ) }} played</p>
				</div>
				<div class="scoreRight">
					<p class="score" v-if="( team.ready && scoresById( team.id ) ) || scoresById( team.id ) > 0">{{ scoresById( team.id) }}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	methods:{
		gamesText( score ){
			if ( score == 1 ){
				return "game";
			} else {
				return "games";
			}
		}
	},
	computed:{
		...mapGetters({
			scoresById: 'scoresById',
			scoreCountById: 'scoreCountById',
			teamsSortedByScore: 'teamsSortedByScore'
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
	max-width:600px;
}
.teamItem{
	display:flex;
	align-items:center;
	justify-content:space-between;
	border:1px solid #cacaca;
	border-bottom:none;
	padding:20px;
	text-align:left;

	&:last-child{
		border-bottom:1px solid #cacaca;
	}
}
.teamName{
	font-weight:500;
	margin:0px;
	text-align:left;
	text-transform:capitalize;
	font-size:34px;
}

.id{
	font-size:10px;
	font-style:italic;
}

.score{
	font-weight:bold;
	font-size:30px;
}

p{
	margin:0px;
}

.gamesPlayed{
	font-size:10px;
	font-style:italic;
}
</style>
