const mockMissions = [
  {
    name: '[SP%2fMP]Dynamic%20War%20System%201%2e70',
    level: 'Takistan',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Dynamic%20Universal%20War%20System%20-%20Rebirth',
    level: 'Esseker',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission1',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission2',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission3',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission4',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission5',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission6',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission7',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission8',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  },
  {
    name: 'Tanoa_Experimental_Mission9',
    level: 'Tanoa',
    difficulty: 'recruit',
    enabled: false
  }
];

const defaults = {
  available: mockMissions
};

const state = defaults;

const mutations = {
  UPDATE_MISSIONS(state, missions) {
    state.available = missions;
  },
  TOGGLE_MISSION(state, index) {
    state.available[index].enabled = !state.available[index].enabled;
  },
  TOGGLE_ALL_MISSIONS(state, value) {
    state.available.forEach((mission) => { mission.enabled = value; });
  },
  INVERT_MISSIONS(state) {
    state.available.forEach((mission) => { mission.enabled = !mission.enabled; });
  },
  CHANGE_DIFFICULTY(state, { index, value }) {
    state.available[index].difficulty = value;
  },
  CHANGE_ALL_DIFFICULTY(state, value) {
    state.available.forEach((mission) => { mission.difficulty = value; });
  }
};

export default {
  state,
  mutations
};
