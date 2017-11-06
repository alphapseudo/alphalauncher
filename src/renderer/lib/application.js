import { readdir } from 'fs';
import path from 'path';
import { promisify } from 'bluebird';
import System from './system';
import constants from '../constants';

const {
  MISSION_REGEX
} = constants;

const readdirAsync = promisify(readdir);

class Application {
  constructor() {
    this.missionDir = 'MPMissions';
  }

  async getMissions() {
    const base = await System.getAppPath();
    const absolute = path.normalize(path.join(base, this.missionDir));
    const files = await readdirAsync(absolute);

    const missions = files.filter(file => MISSION_REGEX.test(file))
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
}

export default new Application();
