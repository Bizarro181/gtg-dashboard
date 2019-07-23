<template>
	<div class="hello">
		<template v-if="roundReady">
			<h1>{{ message }} - advance to the following games</h1>
			<ul class="grid">
				<li class="gridItem" v-for="team in teams">
					<p><span class="teamName">{{ team.name }}</span>: {{ gameById( team.gameNext ).name }}</p>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid{
	list-style:none;
	margin:0px;
	padding:0px;
	display:flex;
	justify-content:center;
	flex-wrap:wrap;
}
.gridItem{
	border:1px solid black;
	width:calc( 50% - 22px );
	margin:10px;
	border:1px solid #cacaca;
}
.teamName{
	font-weight:bold;
	font-size:1.2em;
	text-transform:capitalize;
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
