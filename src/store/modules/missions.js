import _ from 'lodash';

const defaults = {
  available: []
};

const state = _.merge({}, defaults);

const mutations = {
  UPDATE_MISSIONS(state, missions) {
    const comparitor = (a, b) => `${a.name}.${a.level}` === `${b.name}.${b.level}`;
    const intersect = _.intersectionWith(state.available, missions, comparitor);
    const difference = _.differenceWith(missions, intersect, comparitor);
    state.available = _.concat(intersect, difference);
  },
  REORDER_MISSIONS(state, missions) {
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
  },
  RESET_MISSIONS(state) {
    state.available.forEach((mission) => {
      mission.enabled = false;
      mission.difficulty = 'recruit';
    });
  }
};

export default {
  state,
  mutations
};
