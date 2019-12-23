import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import auth from './modules/auth'
import article from './modules/article'
import monitor from './modules/monitor'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    article,
    monitor
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
