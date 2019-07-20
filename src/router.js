import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Games from './views/Games.vue'
import Teams from './views/Teams.vue'
import Scores from './views/Scores.vue'
import GameInfo from './components/GameInfo.vue'
import Instructions from './components/Instructions.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/games',
      name: 'games',
      component: Games
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    },
    {
      path: '/scores',
      name: 'scores',
      component: Scores
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: Instructions
    },
     {
      path: '/game/:gameName',
      name: 'gameInfo',
      component: GameInfo,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
