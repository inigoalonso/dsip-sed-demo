import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import project from './project'
import diagram from './diagram'
import mug from './mug'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    project,
    diagram,
    mug,
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
})