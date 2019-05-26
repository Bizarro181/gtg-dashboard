<template>
	<div class="home">
		<div class="sidebar">
			<TeamPanel/>
		</div>
		<div class="main">
			<GameGrid/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import GameGrid from '@/components/GameGrid.vue'
import TeamPanel from '@/components/TeamPanel.vue'

export default {
  name: 'home',
  components: {
    GameGrid,
    TeamPanel
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home{
	display:flex;
}
.sidebar{
	width:30%;
}
</style>