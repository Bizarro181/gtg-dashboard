<template>
	<div class="hello">
		<button v-on:click="startRound">Start Round</button>
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
}
</style>
