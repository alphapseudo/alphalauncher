import { mkdirp } from 'mkdirp';
import Storage from 'electron-json-storage';
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
    const path = `${base}/AlphaLauncher/${profile}`;
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
}

export default Profile;
