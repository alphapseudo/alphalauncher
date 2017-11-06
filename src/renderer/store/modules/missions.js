
const state = {
  available: []
};

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
