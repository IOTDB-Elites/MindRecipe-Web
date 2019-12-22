import * as authApi from '../../api/auth'

const state = {
  user: null,
};

const actions = {
  signIn({commit}, {name, region, onSuccess, onError}) {
    authApi.signIn(data => {
      if (!data.success) {
        onError('Please check your region or user name')
      } else {
        commit('saveUser', data.data);
        onSuccess('success sign up !')
      }
    }, name, region)
  },

  editUserInfo({state}, {userInfo, onSuccess, onError}) {
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
    const username = state.user.name;
    commit('saveUser', null);
    if (onSuccess) {
      onSuccess(username)
    }
  },

  refreshUser({}, {onSuccess, onError}) {
    if (state.user === null) {
      onError('Please sign in')
    } else {
      if (onSuccess) {
        onSuccess(state.user.name)
      }
    }
  }
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
