import { mkdirp } from 'mkdirp';
import Storage from 'electron-json-storage';
import Path from 'path';
import { promisifyAll } from 'bluebird';
import System from './system';

promisifyAll(Storage);

const DEFAULT_PROFILES = {
  active: 'Default',
  storage: {}
};

let profiles = {};

class Profile {
  static async getActiveProfile() {
    const { active } = profiles;
    return active;
  }

  static async getProfilePath(base, profile) {
    const path = Path.normalize(`${base}/AlphaLauncher/${profile}`);
    await mkdirp(Path.join(path, 'Users', profile));
    return path;
  }

  static async loadProfiles() {
    profiles = await Storage.getAsync('profiles') || DEFAULT_PROFILES;
    const { storage: available } = profiles;
    return Object.keys(available).sort();
  }

  static async loadProfile(name = 'Default') {
    const store = await Storage.getAsync(`profile_${name}`);
    let appPath = _.get(store, 'app.appLocation', null);

    if (!appPath) {
      appPath = await System.getSteamAppPath();
      _.set(store, 'app.appLocation', appPath);
    }

    return store;
  }

  static async saveProfileStore(name, store) {
    await Storage.setAsync(`profile_${name}`, store);
    return true;
  }

  static formatParams(params) {
    return Object.keys(params).reduce((reduced, param) => {
      const value = params[param];
      if (value) {
        const formatted = _.isBoolean(value) ? `-${param}` : `-${param}=${value}`;
        reduced.push(formatted);
      }
      return reduced;
    }, []);
  }

  static formatConfig(profile) {
    const base = Path.join('AlphaLauncher', profile);
    const serverCfg = Path.join(base, `${profile}.cfg`);
    return [
      `-config=${serverCfg}`,
      `-profiles=${base}`,
      `-name=${profile}`
    ];
  }

  static formatMods(mods) {
    const enabled = mods.filter(mod => mod.enabled);
    if (enabled.length > 0) {
      const formatted = enabled.reduce((reduced, mod) => {
        const path = Path.join(mod.path, mod.name);
        reduced.push(path);
        return reduced;
      }, []).join(';');
      return [`-mod=${formatted}`];
    }

    return [];
  }

  static getParams(store) {
    const { params, profile, mods } = store;
    const serverParams = Profile.formatParams(params);
    const configParams = Profile.formatConfig(profile);
    const modParams = Profile.formatMods(mods.available);

    return _.concat(serverParams, configParams, modParams);
  }
}

export default Profile;
