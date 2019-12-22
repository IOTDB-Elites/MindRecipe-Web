import * as articleApi from '../../api/article'

const state = {
  currentPage: 1,
  total: 0,
  category: 'science',
  articleList: [],
};

const actions = {
  fetchArticleList({commit}) {
    articleApi.fetchArticleList(data => {
      commit('saveTotal', data.data.total);
      commit('saveArticleList', data.data.articles)
    }, state.category, (state.currentPage - 1) * 10 + 1, state.currentPage * 10 + 1)
  },
};

const mutations = {
  'saveCurrentPage'(state, currentPage) {
    state.currentPage = currentPage
  },
  'saveTotal'(state, total) {
    state.total = total
  },
  'saveArticleList'(state, articleList) {
    state.articleList = articleList
  },
  'saveCategory'(state, category) {
    state.category = category
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
