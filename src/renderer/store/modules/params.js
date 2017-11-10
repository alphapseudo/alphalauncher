const defaults = {
  port: 2302,
  ranking: null,
  pid: null,
  netlog: false
};

const state = _.merge({}, defaults);

const mutations = {
  UPDATE_PARAMS(state, [path, value]) {
    const previous = _.get(state, path);
    if ($.isNumeric(previous) && value === '') {
      value = 0;
    }
    state = _.set(state, path, value);
  },
  RESET_PARAMS(state) {
    _.merge(state, defaults);
  }
};

export default {
  state,
  mutations
};
