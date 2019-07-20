<template>
  <div class="home">
    <GameInfo :gameName=gameName />
  </div>
</template>

<script>
// @ is an alias to /src
import GameInfo from '@/components/GameInfo.vue'

export default {
	props: ['gameName'],
  name: 'home',
  components: {
    GameInfo
  }
}
</script>
