import { readdir } from 'fs';
import path from 'path';
import { promisify } from 'bluebird';
import System from './system';
import constants from '../constants';

const {
  MISSION_REGEX,
  MOD_REGEX
} = constants;

const readdirAsync = promisify(readdir);

class Application {
  constructor() {
    this.missionDirectory = 'MPMissions';
    this.workshopDirectory = '!Workshop';
    this.additionalDirectories = [];
  }

  async getMissions() {
    const base = await System.getAppPath();
    const absolute = path.normalize(path.join(base, this.missionDirectory));
    const files = await readdirAsync(absolute);

    const missions = files
      .filter(file => MISSION_REGEX.test(file))
      .map((mission) => {
        const [name, level] = mission.split('.');
        return {
          name,
          level,
          difficulty: 'recruit',
          enabled: false
        };
      });

    return missions;
  }

  async getWorkshopMods() {
    const base = await System.getAppPath();
    const absolute = path.normalize(path.join(base, this.workshopDirectory));

    try {
      const files = await readdirAsync(absolute);
      const mods = files
        .filter(file => MOD_REGEX.test(file))
        .map(mod => ({
          name: mod,
          path: path.join(absolute, mod),
          isSteam: true,
          enabled: false
        }));
      return mods;
    } catch (e) {
      return [];
    }
  }

  async getLocalMods() {
    const appRoot = await System.getAppPath();
    const directories = [appRoot].concat(this.additionalDirectories);

    const mods = directories.reduce(async (aggregate, directory) => {
      try {
        const files = await readdirAsync(directory);
        const mods = files
          .filter(file => MOD_REGEX.test(file))
          .map(mod => ({
            name: mod,
            path: mod,
            isSteam: false,
            enabled: false
          }));
        return aggregate.concat(mods);
      } catch (e) {
        return aggregate;
      }
    }, []);

    return mods;
  }

  async getMods() {
    const localMods = await this.getLocalMods();
    const steamMods = await this.getWorkshopMods();
    return steamMods.concat(localMods);
  }
}

export default new Application();
