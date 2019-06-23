<template>
  <div class="home">
    <TeamPanel />
  </div>
</template>

<script>
// @ is an alias to /src
import TeamPanel from '@/components/TeamPanel.vue'

export default {
  name: 'home',
  components: {
    TeamPanel
  }
}
</script>
