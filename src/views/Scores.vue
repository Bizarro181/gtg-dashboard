<template>
  <div class="home">
    <Scoreboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Scoreboard from '@/components/Scoreboard.vue'

export default {
  name: 'home',
  components: {
    Scoreboard
  }
}
</script>
