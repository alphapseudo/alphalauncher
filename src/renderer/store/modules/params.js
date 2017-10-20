const state = {
  port: 2302
};

const mutations = {
  UPDATE_PARAMS(state, [path, value]) {
    const previous = _.get(state, path);
    if (!isNaN(previous) && value === '') {
      value = 0;
    }
    state = _.set(state, path, value);
  }
};

export default {
  state,
  mutations
};
