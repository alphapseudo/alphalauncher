import System from '../../lib/system';

const state = {
  appLocation: null,
  appExecutable: null,
  isRunning: false,
  version: APP_VERSION
};

const mutations = {
  SET_APP_DIRECTORY(state, path) {
    state.appLocation = path;
  }
};

const actions = {
  // TODO These errors will prevent the app from loading. aka a showstopper
  // Load the app with defaults and toast issues
  async INITIALIZE_LAUNCHER(context) {
    const path = await System.getAppPath();
    context.commit('SET_APP_DIRECTORY', path);

    await context.dispatch('REFRESH_MISSIONS');
    await context.dispatch('REFRESH_MODS');
  },
  async UPDATE_APP_DIRECTORY(context, path) {
    const result = await System.setAppPath(path);
    context.commit('SET_APP_DIRECTORY', result);
  }
};

export default {
  state,
  mutations,
  actions
};
