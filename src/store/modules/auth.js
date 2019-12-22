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
        localStorage.setItem('token', data.data.uid);
        commit('saveUser', data.data);
        onSuccess('success sign up !')
      }
    }, name, region)
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
