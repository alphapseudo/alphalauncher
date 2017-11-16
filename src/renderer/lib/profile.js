import { mkdirp } from 'mkdirp';
import Storage from 'electron-json-storage';
import Path from 'path';
import { promisifyAll } from 'bluebird';
import System from './system';

promisifyAll(Storage);

class Profile {
  static async getActiveProfile() {
    const store = await Storage.getAsync('app');
    const active = store.active || 'Default';
    return active;
  }

  static async getProfilePath(base, profile) {
    const path = Path.normalize(`${base}/AlphaLauncher/${profile}`);
    await mkdirp(path);
    return path;
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
    }, []).join(' ');
  }

  static formatConfig(profile) {
    const profiles = Path.normalize(`AlphaLauncher/${profile}`);
    const serverCfg = Path.join(profiles, `${profile}.cfg`);
    return `"-config=${serverCfg}" "-profiles=${profiles}" -name=${profile}"`;
  }

  static formatMods(mods) {
    const enabled = mods.filter(mod => mod.enabled);
    if (enabled.length > 0) {
      const formatted = enabled.reduce((reduced, mod) => {
        const path = Path.join(mod.path, mod.name);
        reduced.push(path);
        return reduced;
      }, []).join(';');
      return `"-mod=${formatted}"`;
    }

    return '';
  }

  static getParams(store) {
    const { params, profile, mods } = store;
    const serverParams = Profile.formatParams(params);
    const configParams = Profile.formatConfig(profile);
    const modParams = Profile.formatMods(mods.available);
    return `${serverParams} ${configParams} ${modParams}`;
  }
}

export default Profile;
