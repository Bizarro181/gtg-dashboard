<template>
  <div class="home">
    <TeamList/>
  </div>
</template>

<script>
// @ is an alias to /src
import TeamList from '@/components/TeamList.vue'

export default {
  name: 'home',
  components: {
    TeamList
  }
}
</script>
