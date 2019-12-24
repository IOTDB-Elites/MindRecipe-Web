import * as authApi from '../../api/auth'

const state = {
  user: null,
  readList: [],
  agreedList: [],
  sharedList: []
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

  editUserInfo({commit}, {userInfo, onSuccess, onError}) {
    authApi.editUserInfo((data => {
      if (data.success) {
        if (onSuccess) {
          onSuccess('Successfully updated!')
        }
        commit('saveUser', userInfo);
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
  },

  fetchReadList({commit}) {
    if (state.user !== null) {
      authApi.fetchReadList(data => {
        commit('saveReadList', data.data.read);
        commit('saveAgreedList', data.data.agree);
        commit('saveSharedList', data.data.share)
      }, state.user.uid, state.user.region)
    } else {
      commit('saveReadList', []);
      commit('saveAgreedList', []);
      commit('saveSharedList', [])
    }
  }
};

const mutations = {
  'saveUser'(state, user) {
    state.user = user
  },
  'saveReadList'(state, readList) {
    state.readList = readList
  },
  'saveAgreedList'(state, agreedList) {
    state.agreedList = agreedList
  },
  'saveSharedList'(state, sharedList) {
    state.sharedList = sharedList
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
