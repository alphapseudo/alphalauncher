const state = {
  appLocation: null,
  appExecutable: null
};

const mutations = {
  UPDATE_APP_DIRECTORY(state, path) {
    state.appLocation = path;
  }
};

export default {
  state,
  mutations
};
