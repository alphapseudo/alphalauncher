import Vue from 'vue';
import Vuex from 'vuex';
import Storage from 'electron-json-storage';
import Crypto from 'crypto';
import { promisifyAll } from 'bluebird';

import Template from '../lib/template';
import Application from '../lib/application';
import Profile from '../lib/profile';
import System from '../lib/system';

import modules from './modules';

Vue.use(Vuex);

promisifyAll(Storage);

function hashObject(state) {
  const hash = Crypto.createHash('sha1');
  return hash.update(JSON.stringify(state)).digest('hex');
}

export default new Vuex.Store({
  state: {
    profile: 'Default',
    profiles: [],
    saved: null
  },
  modules,
  mutations: {
    MERGE_STATE(current, incoming) {
      current = _.merge(current, incoming);
    },
    CACHE_CONFIG(state, config) {
      state.saved = hashObject(config);
    },
    UPDATE_PROFILES(state, profiles) {
      state.profiles = profiles;
    }
  },
  getters: {
    snapshot: (state) => {
      const store = _.merge({}, state);
      delete store.saved;
      delete store.app.isRunning;
      store.mods.available = store.mods.available.filter(mod => mod.enabled);
      store.missions.available = store.missions.available.filter(mission => mission.enabled);
      return store;
    }
  },
  actions: {
    async INITIALIZE_LAUNCHER(context) {
      const profiles = await Profile.loadProfiles();
      context.commit('UPDATE_PROFILES', profiles);

      const active = await Profile.getActiveProfile();
      await context.dispatch('LOAD_PROFILE', active);
    },
    async LOAD_PROFILE(context, name) {
      const store = await Profile.loadProfile(name);
      context.commit('MERGE_STATE', store);
      await context.dispatch('REFRESH_MISSIONS');
      await context.dispatch('REFRESH_MODS');
      context.commit('CACHE_CONFIG', context.getters.snapshot);
    },
    async SAVE_PROFILE({ getters: { snapshot }, ...context }) {
      await Profile.saveProfileStore(snapshot.profile, snapshot);
      context.commit('CACHE_CONFIG', snapshot);
    },
    async CHECK_FOR_CHANGES({ state: { saved }, getters }) {
      const { snapshot } = getters;
      const hashed = hashObject(snapshot);
      return saved !== hashed;
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
    },
    async WRITE_ERROR({ state: store }, error) {
      const { app: { appLocation: path } } = store;
      System.writeErrorLog(path, error);
    },
    async LAUNCH_SERVER({ state: store }) {
      await Template.saveTemplates(store);
      const { app: { appLocation: path } } = store;
      const params = Profile.getParams(store);
      return System.launchServer(path, params);
    }
  },
  strict: process.env.NODE_ENV !== 'production',
});
