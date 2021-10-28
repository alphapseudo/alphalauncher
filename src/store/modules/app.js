const state = {
  appLocation: null
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
