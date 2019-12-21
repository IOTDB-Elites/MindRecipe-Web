const state = {
  currentPage: 1,
  totalCount: null
};

const actions = {};

const mutations = {
  'saveCurrentPage'(state, currentPage) {
    state.currentPage = currentPage
  },
  'saveTotalCount'(state, totalCount) {
    state.totalCount = totalCount
  },
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
