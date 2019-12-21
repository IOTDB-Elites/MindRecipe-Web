import * as authApi from '../../api/auth'

const state = {
  user: null,
};

const actions = {
  signIn({dispatch}, {name, onSuccess, onError}) {
    authApi.signIn(data => {
      if (data.result === false) {
        onError(data.message)
      } else {
        localStorage.setItem('token', data.result);
        dispatch('fetchUser', {onSuccess})
      }
    }, name)
  },

  fetchUser({commit, state}, {onSuccess, onError}) {
    let token = localStorage.getItem('token');
    authApi.currentUser(data => {
      commit('saveUser', data);
      if (data !== null && data !== undefined) {
        if (onSuccess) {
          onSuccess(state.user.username)
        }
      } else {
        onError('Your session is outdated, please sign in again.')
      }
    }, token)
  },

  refreshUser({dispatch}, {onSuccess, onError}) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      dispatch('fetchUser', {onSuccess, onError})
    }
  },

  editUserInfo({state}, {userInfo, onSuccess, onError}) {
    userInfo.token = localStorage.getItem('token');
    authApi.editUserInfo((data => {
      if (data.result === true) {
        if (onSuccess) {
          onSuccess('Successfully updated!')
        }
      } else {
        onError(data.message)
      }
    }), userInfo)
  },

  signOut({commit}, {onSuccess}) {
    const username = state.user.username;
    localStorage.setItem('token', null);
    commit('saveUser', null);
    if (onSuccess) {
      onSuccess(username)
    }
  },
};

const mutations = {
  'saveUser'(state, user) {
    state.user = user
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
