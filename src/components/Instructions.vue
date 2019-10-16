<template>
	<div class="hello">
		<template v-if="roundReady">
			<h1 class="instructionsHeader">{{ message }} - Advance to the Next Round</h1>
			<ul class="grid">
				<li class="gridItem" v-for="team in teams">
					<img class="gameLogo" :src="'images/' + gameById( team.gameNext ).logo + '.png'">
					<p><span class="teamName">{{ team.name }}</span></p>
				</li>
			</ul>
		</template>
		<template v-else>
			<p class="waitMessage">Awiting Next Instructions</p>
		</template>		
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
			},
			messages:[
				'Great Job!',
				'You Did It!',
				'Excellent',
				'Way to Go',
				'Empty Platitudes!'
			],
			message:''
		}
	},
	methods:{
		getMessage(){
			this.message = this.messages[Math.floor( Math.random() * 4 )];
		}
	},
	computed:{
		...mapGetters({
			gameById: 'gameById',
			teams: 'readyTeams',
			roundRunning: 'running',
			roundReady: 'ready'
		})
	},
	watch:{
		roundReady: function(){
			this.getMessage();
		}
	}
};
</script>

<style lang="scss">
.instructions{
	background-color:#2c3e50;
	min-height:100vh;
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
.instructionsHeader{
	color:#ffffff;
	text-shadow:0px 0px 4px rgba( #ffffff, 0.5 );
	font-size:60px;
	font-family:'VT323';
	font-weight:400;
}
.grid{
	list-style:none;
	margin:0px;
	padding:0px;
	display:flex;
	justify-content:center;
	flex-wrap:wrap;
	font-family:'VT323';
	text-shadow:0px 0px 4px rgba( #ffffff, 0.5 );
}
.gridItem{
	width:calc( 50% - 22px );
	margin:10px;
	padding:20px;
	box-sizing:border-box;
	display:flex;
	align-items:center;
	justify-content:center;
}
.gameLogo{
	width:35%;
}
.teamName{
	font-weight:400;
	font-size:50px;
	text-transform:capitalize;
	color:#ffffff;
	margin-left:10px;
}
.waitMessage{
	font-weight:bold;
	margin:0px;

	&::after{
		content:'\2026';
		display:inline-block;
		vertical-align:bottom;
		width:0em;
		overflow:hidden;
		animation: ellipsis steps(4,end) 1.5s infinite;
	}
}
@keyframes ellipsis {
	to {
		width: 1.25em;    
	}
}
</style>
