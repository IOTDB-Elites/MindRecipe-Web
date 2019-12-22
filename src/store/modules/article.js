import * as articleApi from '../../api/article'

const state = {
  currentPage: 1,
  total: 0,
  category: 'science',
  articleList: [],
  popularDailyList: [],
  popularWeeklyList: [],
  popularMonthlyList: [],
  article: null,
  feedback: null
};

const actions = {
  fetchArticleList({commit}) {
    articleApi.fetchArticleList(data => {
      commit('saveTotal', data.data.total);
      commit('saveArticleList', data.data.articles)
    }, state.category, (state.currentPage - 1) * 10 + 1, state.currentPage * 10 + 1)
  },

  fetchPopularList({commit}) {
    articleApi.fetchPopularList(data => {
      commit('savePopularDailyList', data.data[0].articles);
      commit('savePopularWeeklyList', data.data[1].articles);
      commit('savePopularMonthlyList', data.data[2].articles)
    })
  },

  fetchArticle({commit}, aid) {
    articleApi.fetchArticle(data => {
      commit('saveArticle', data.data);
    }, aid)
  },

  fetchFeedback({commit}, aid) {
    articleApi.fetchFeedback(data => {
      commit('saveFeedback', data.data);
    }, aid)
  }
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
  'savePopularDailyList'(state, popularDailyList) {
    state.popularDailyList = popularDailyList
  },
  'savePopularWeeklyList'(state, popularWeeklyList) {
    state.popularWeeklyList = popularWeeklyList
  },
  'savePopularMonthlyList'(state, popularMonthlyList) {
    state.popularMonthlyList = popularMonthlyList
  },
  'saveCategory'(state, category) {
    state.category = category
  },
  'saveArticle'(state, article) {
    state.article = article
  },
  'saveFeedback'(state, feedback) {
    state.feedback = feedback
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
