import * as monitorApi from '../../api/monitor'

const state = {
  monitorData: null
};

const actions = {
  fetchMonitorData({commit}) {
    monitorApi.fetchMonitorData(data => {
      commit('saveMonitorData', data.data);
    },)
  },

  addDBMS({commit}, {ip, db_port}) {
    monitorApi.addDBMS(data => {
      console.log(data)
    }, ip, db_port)
  },

  deleteDBMS({commit}, {ip}) {
    monitorApi.deleteDBMS(data => {
      console.log(data)
    }, ip)
  },
};

const mutations = {
  'saveMonitorData'(state, monitorData) {
    state.monitorData = monitorData
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
