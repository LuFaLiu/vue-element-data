import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menus'
import getters from './getters'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    language: Cookies.get('language') 
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  },
  modules: {
    menus
  },
  getters
})
export default store
