<template>
	<div class="actionWrapper">
		<button class="rotate" v-on:click="nextRound" :disabled="( readyTeams.length === 0 || roundReady ) || roundRunning">Rotate Teams</button>
		<button class="lock" v-on:click="lockTeams" :disabled=" !roundReady || roundRunning || teamsLocked ">Lock Teams</button>
		<button class="start" v-on:click="startRound" :disabled="!teamsLocked || roundRunning">Start Round</button>
		<p class="running" v-if="roundRunning">Running</p>
		<a href="#" v-on:click="clear()">Clear</a>
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
		lockTeams(){
			this.$store.dispatch( 'lockTeams' );
		},
		nextRound(){
			this.$store.dispatch( 'nextRound' );
		},
		startRound(){
			this.$store.dispatch( 'startRound' );
		},
		clear(){
			this.$store.dispatch( 'clear' );
		}
	},
	computed:{
		readyTeams(){
			return this.$store.getters.readyTeams;
		},
		roundReady(){
			return this.$store.getters.ready;
		},
		roundRunning(){
			return this.$store.getters.running;
		},
		teamsLocked(){
			return this.$store.getters.locked;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.actionWrapper{
	display:flex;
	align-items:center;
}
button{
	padding:15px;
	margin-right:20px;
	border:none;
	border-radius:10px;
	font-weight:bold;

	&[disabled="disabled"]{
		opacity:0.75;
	}
}
.start{
	background:#48BB78;
	color:white;
	cursor:pointer;	
}
.lock{
	background:#ED8936;
	color:white;
	cursor:pointer;
}
.rotate{
	background:#ECC94B;
	color:white;
	cursor:pointer;
}
.running{
	font-weight:bold;
	color:#ffffff;
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
