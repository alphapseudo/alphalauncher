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
  async INITIALIZE_LAUNCHER(context) {
    const path = await System.getAppPath();
    context.commit('SET_APP_DIRECTORY', path);

    await context.dispatch('REFRESH_MISSIONS');
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
