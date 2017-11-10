const defaults = {
  current: 'recruit',
  aiPreset: 3,
  skill: 0.5,
  precision: 0.5,
  reducedDamage: false,
  groupIndicators: 1,
  friendlyTags: 1,
  enemyTags: 0,
  detectedMines: 0,
  commands: 1,
  waypoints: 2,
  tacticalPing: true,
  weaponInfo: 1,
  stanceIndicator: 1,
  staminaBar: true,
  weaponCrosshair: true,
  visionAid: true,
  thirdPersonView: true,
  cameraShake: true,
  scoreTable: true,
  deathMessages: true,
  vonID: true,
  mapContent: true,
  autoReport: true,
  multipleSaves: true
};

const state = _.merge({}, defaults);

const mutations = {
  UPDATE_DIFFICULTY(state, [path, value]) {
    const previous = _.get(state, path);
    if ($.isNumeric(previous) && value === '') {
      value = 0;
    }
    state = _.set(state, path, value);
  },
  RESET_DIFFICULTY(state) {
    _.merge(state, defaults);
  }
};

export default {
  state,
  mutations
};
