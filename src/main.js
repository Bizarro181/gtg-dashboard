import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

console.log('env', JSON.stringify(process.env))

// This is the dashboard server address
Vue.use( new VueSocketIO({
		debug: true,
		connection: process.env.VUE_APP_REMOTE_URL,
		// connection: 'http://localhost:3030',
		vuex:{
			store,
			actionPrefix: 'SOCKET_'
		}
	})
);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
