import { readdir } from 'fs';
import Path from 'path';
import { promisify } from 'bluebird';
import constants from '../constants';

const {
  MISSION_REGEX,
  MOD_REGEX
} = constants;

const readdirAsync = promisify(readdir);

class Application {
  static async getMissions(appRoot) {
    try {
      const path = Path.join(appRoot, 'MPMissions');

      const files = await readdirAsync(path);
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
    } catch (e) {
      return [];
    }
  }

  static async getMods(appRoot, directories) {
    const mods = await directories.reduce(async (aggregate, path) => {
      try {
        aggregate = await aggregate;

        const resolved = Path.isAbsolute(path) ? path : Path.join(appRoot, path);

        const files = await readdirAsync(resolved);
        const mods = files.filter(file => MOD_REGEX.test(file))
          .map(mod => ({
            name: mod,
            path: resolved,
            isSteam: path === '!Workshop',
            enabled: false
          }));
        return aggregate.concat(mods);
      } catch (e) {
        return aggregate;
      }
    }, []);

    return mods;
  }
}

export default Application;
