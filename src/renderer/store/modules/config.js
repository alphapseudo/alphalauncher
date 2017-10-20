const defaults = {
  hostname: '',
  maxPlayers: 8,
  upnp: true,
  loopback: false,
  password: '',
  passwordAdmin: '',
  motd: [],
  motdInterval: 5,
  BattlEye: true,
  persistent: false,
  drawingInMap: true,
  forceRotorLibSimulation: 0,
  voteMissionPlayers: 1,
  voteThreshold: 0.33,
  disableVoN: false,
  vonCodec: 0,
  vonCodecQuality: 10,
  verifySignatures: 2,
  allowedFilePatching: 0,
  kickDuplicate: true,
  requiredBuild: { enabled: false, value: 0 },
  maxPing: { enabled: false, value: 200 },
  disconnectTimeout: { enabled: false, value: 5 },
  maxDesync: { enabled: false, value: 150 },
  maxPacketLoss: { enabled: false, value: 50 },
  headlessClients: [],
  localClient: [],
  admins: []
};

const state = Object.assign(defaults, {});

const mutations = {
  UPDATE_CONFIG(state, [path, value]) {
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