import * as monitorApi from '../../api/monitor'

const state = {
  monitorData: null
};

const actions = {
  fetchMonitorData({commit}) {
    monitorApi.fetchMonitorData(data => {
      commit('saveMonitorData', data.data);
    },)
  }
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
