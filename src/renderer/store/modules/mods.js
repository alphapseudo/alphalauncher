import Application from '../../lib/application';

const state = {
  available: []
};

const mutations = {
  UPDATE_MODS(state, mods) {
    const comparitor = (a, b) => `${a.path}:${a.name}` === `${b.path}:${b.name}`;
    const intersect = _.intersectionWith(state.available, mods, comparitor);
    const difference = _.differenceWith(mods, intersect, comparitor);
    state.available = _.concat(intersect, difference);
  },
  REORDER_MODS(state, mods) {
    state.available = mods;
  },
  TOGGLE_MOD(state, index) {
    state.available[index].enabled = !state.available[index].enabled;
  },
  TOGGLE_ALL_MODS(state, value) {
    state.available.forEach((mod) => { mod.enabled = value; });
  },
  INVERT_MODS(state) {
    state.available.forEach((mod) => { mod.enabled = !mod.enabled; });
  }
};

const actions = {
  async REFRESH_MODS(context) {
    const mods = await Application.getMods();
    context.commit('UPDATE_MODS', mods);
  }
};

export default {
  state,
  mutations,
  actions
};
