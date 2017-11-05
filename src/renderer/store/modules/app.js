import System from '../../lib/system';

const state = {
  appLocation: null,
  appExecutable: null,
  isRunning: false,
};

const mutations = {
  SET_APP_DIRECTORY(state, path) {
    state.appLocation = path;
  }
};

const actions = {
  INITIALIZE_LAUNCHER(context) {
    return System.getAppPath().then((path) => {
      context.commit('SET_APP_DIRECTORY', path);
    });
  },
  UPDATE_APP_DIRECTORY(context, path) {
    return System.setAppPath(path).then(() => {
      context.commit('SET_APP_DIRECTORY', path);
    });
  }
};

export default {
  state,
  mutations,
  actions
};
