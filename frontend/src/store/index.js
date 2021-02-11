// Importations // 
import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts'
import notificationAlert from './notification-alert'

// Utilisation de Vuex //
Vue.use(Vuex)

// Exportation des modules //
export default new Vuex.Store({
  state: {
    companyName: 'Groupomania'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts, notificationAlert
  }
})
