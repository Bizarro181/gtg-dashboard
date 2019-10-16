<template>
	<div class="leaderboard">
		<h1 class="leaderboardHeader">Leaderboard</h1>
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

<style lang="scss">
.scores{
	background-color:#2c3e50;
	height:100vh;
	#nav{
		display:none;
	}

	&:before{
		content:" ";
		display:block;
		position:absolute;
		top:0;
		left:0;
		bottom:0;
		right:0;
		background:linear-gradient(transparentize(#000,1) 50%, transparentize(darken(#000,10),0.75) 50%), linear-gradient(90deg,transparentize(#ff0000,0.94),transparentize(#000000,0.85),transparentize(#0000ff,0.94));
		z-index:2;
		background-size:100% 3px, 1px 100%;
		pointer-events:none;
		opacity:0.5;
	}
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@font-face {
    font-family: 'VT323';
    src: url('~/fonts/vt323-regular-webfont.woff2') format('woff2'),
         url('~/fonts/vt323-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.leaderboardHeader{
	font-size:55px;
	font-weight:normal;
	text-transform:uppercase;
	letter-spacing:5px;
}
.leaderboard{
	font-family:'VT323';
	background:#2c3e50;
	color:#ffffff;
	text-shadow:0px 0px 4px rgba( #ffffff, 0.5 );
}
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
	border-bottom:none;
	padding:20px;
	text-align:left;
}
.teamName{
	font-weight:500;
	margin:0px;
	text-align:left;
	text-transform:capitalize;
	font-size:50px;
}

.id{
	font-size:10px;
	font-style:italic;
}

.score{
	font-size:50px;
}

p{
	margin:0px;
}

.gamesPlayed{
	font-size:20px;
	font-style:italic;
}
</style>
