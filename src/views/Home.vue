<template>
  <div class="home">
    <GameGrid/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameGrid from '@/components/GameGrid.vue'

export default {
  name: 'home',
  components: {
    GameGrid
  }
}
</script>
