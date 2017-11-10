import Vue from 'vue';
import Vuex from 'vuex';
import Storage from 'electron-json-storage';
import { promisifyAll } from 'bluebird';

import Template from '../lib/template';
import Application from '../lib/application';
import Profile from '../lib/profile';
import System from '../lib/system';
import modules from './modules';

Vue.use(Vuex);

promisifyAll(Storage);

export default new Vuex.Store({
  state: {
    profile: 'Default'
  },
  modules,
  mutations: {
    MERGE_STATE(current, incoming) {
      current = _.merge(current, incoming);
    }
  },
  actions: {
    async INITIALIZE_LAUNCHER(context) {
      const profile = await Profile.getActiveProfile();
      await context.dispatch('LOAD_PROFILE', profile);
    },
    async LOAD_PROFILE(context, name) {
      const store = await Profile.loadProfile(name);
      context.commit('MERGE_STATE', store);
      await context.dispatch('REFRESH_MISSIONS');
      await context.dispatch('REFRESH_MODS');
    },
    async SAVE_PROFILE({ state }) {
      const store = _.merge({}, state);
      const currentProfile = store.profile;
      delete store.profile;
      await Profile.saveProfileStore(currentProfile, store);
    },
    async GENERATE_CONFIG({ state: store }) {
      await Template.saveTemplates(store);
    },
    async RESET_STORE(context) {
      context.commit('RESET_CONFIG');
      context.commit('RESET_PARAMS');
      context.commit('RESET_DIFFICULTY');
      context.commit('RESET_MISSIONS');
      context.commit('RESET_MODS');
    },
    async REFRESH_MISSIONS(context) {
      const { state: { app: { appLocation } } } = context;
      const missions = await Application.getMissions(appLocation);
      context.commit('UPDATE_MISSIONS', missions);
    },
    async REFRESH_MODS(context) {
      const {
        state: {
          app: { appLocation },
          mods: { directories }
        }
      } = context;
      const mods = await Application.getMods(appLocation, directories);
      context.commit('UPDATE_MODS', mods);
    },
    async VALIDATE_PATH({ state: { app } }) {
      const validPath = await System.validatePath(app.appLocation);
      return validPath;
    },
    async UPDATE_APP_DIRECTORY(context, path) {
      const isValid = await System.validatePath(path);
      if (!isValid) return false;

      context.commit('SET_APP_PATH', path);
      context.dispatch('REFRESH_MISSIONS');
      context.dispatch('REFRESH_MODS');
      return true;
    }
  },
  strict: process.env.NODE_ENV !== 'production',
});
