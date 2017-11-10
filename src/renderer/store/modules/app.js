const state = {
  appLocation: null,
  isRunning: false,
  version: APP_VERSION
};

const mutations = {
  SET_APP_PATH(state, path) {
    state.appLocation = path;
  }
};

export default {
  state,
  mutations
};
