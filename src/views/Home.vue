<template>
	<div class="home">
		<div class="sidebar">
			<TeamPanel/>
		</div>
		<div class="main">
			<GameGrid/>
		</div>
		<div class="actionBar">
			<DashboardActions/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import GameGrid from '@/components/GameGrid.vue'
import TeamPanel from '@/components/TeamPanel.vue'
import DashboardActions from '@/components/DashboardActions.vue'

export default {
  name: 'home',
  components: {
    GameGrid,
    TeamPanel,
    DashboardActions
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
.main{
	width:100%;
}
.actionBar{
	position:fixed;
	bottom:0px;
	left:0px;
	right:0px;
	height:60px;
	display:flex;
	align-items:center;
	padding:10px;
	background:#4299E1;
	flex-direction:flex-end;
}
</style>