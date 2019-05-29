<template>
	<div class="hello">
		<button class="next" v-on:click="nextRound">Next Round</button>
		<button class="start" v-on:click="startRound">Start Round</button>
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
		nextRound(){
			this.$store.dispatch( 'nextRound' );
		},
		startRound(){
			this.$store.dispatch( 'startRound' );
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button{
	padding:15px;
	margin-right:20px;
	border:none;
	border-radius:10px;
	font-weight:bold;
}
.start{
	background:#0061ff;
	color:white;
}
.next{
	background:orange;
	color:white;
}
</style>
