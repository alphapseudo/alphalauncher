const mockMods = [
  {
    name: '@CBA',
    path: 'C:/steam/common/ArmaIII/',
    isSteam: false,
    enabled: false
  },
  {
    name: '@ACE3',
    path: 'C:/steam/common/ArmaIII/!Workshop/',
    isSteam: true,
    enabled: false
  },
  {
    name: '@Dynasound2',
    path: 'C:/steam/common/ArmaIII/!Workshop/',
    isSteam: true,
    enabled: false
  },
  {
    name: '@ASRAI3',
    path: 'C:/steam/common/ArmaIII/!Workshop/',
    isSteam: true,
    enabled: false
  },
  {
    name: '@Blastcore',
    path: 'C:/steam/common/ArmaIII/!Workshop/',
    isSteam: true,
    enabled: false
  },
  {
    name: '@MCC',
    path: 'C:/steam/common/ArmaIII/!Workshop/',
    isSteam: true,
    enabled: false
  },
  {
    name: '@PlayerUnknownsBattleRoyale',
    path: 'C:/steam/common/ArmaIII/!Workshop/',
    isSteam: false,
    enabled: false
  }
];

const defaults = {
  available: mockMods
};

const state = defaults;

const mutations = {
  UPDATE_MODS(state, mods) {
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

export default {
  state,
  mutations
};
