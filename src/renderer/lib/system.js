import Registry from 'winreg';
import Path from 'path';
import { promisifyAll, promisify } from 'bluebird';
import { access, constants as permissions } from 'fs';
// import { exec } from 'child_process';
import constants from '../constants';

const checkFile = promisify(access);

const {
  APP_ID,
  FOLDER_NAME,
  STEAM_BASE,
  EXEC_NAME
} = constants;

/**
 * Collection of system helpers for identifying common paths
 * automatically through discovery
 */
class System {
  constructor() {
    this.steamPath = null;
    this.appPath = null;
    this.executable = null;
  }

  /**
   * Obtain a new HKEY_CURRENT_USER registry object (Windows)
   * @param {String} path Key path
   */
  static getRegistry(path) {
    return promisifyAll(new Registry({ hive: Registry.HKCU, key: path }));
  }

  /**
   * Determine if a Steam path can be determined automatically
   * and return
   * @throws Error when Steam path cannot be resolved
   * @returns {String} Steam path
   */
  async getSteamPath() {
    if (!this.steamPath) {
      const reg = System.getRegistry(STEAM_BASE);
      this.steamPath = await reg.getAsync('SteamPath')
        .then(item => item.value);
    }

    return this.steamPath;
  }

  /**
   * Check if application is installed on Steam and return location.
   * @throws Error when application is not installed
   * @returns {String} Application base path
   */
  async getAppPath() {
    const steamPath = await this.getSteamPath();

    if (!this.appPath) {
      const reg = System.getRegistry(`${STEAM_BASE}\\Apps\\${APP_ID}`);
      const isInstalled = await reg.getAsync('Installed')
        .then(item => parseInt(item.value, 16));
      if (!isInstalled) throw new Error('Steam application is not currently installed');
      this.appPath = `${steamPath}/steamapps/common/${FOLDER_NAME}`;
    }

    return Path.normalize(this.appPath);
  }

  /**
   * Attempt to resolve and retrieve the dedicated server executable
   * automatically.
   * @returns {String|Boolean} The path identifying the server executable
   */
  async getExecutable() {
    if (!this.executable) {
      try {
        const base = await this.getAppPath();
        const executable = Path.normalize(`${base}/${EXEC_NAME}`);
        await checkFile(executable, permissions.F_OK);
        this.executable = executable;
      } catch (e) {
        this.executable = false;
      }
    }

    // exec(`"${this.executable}"`, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    //   console.log(`stderr: ${stderr}`);
    // });

    return this.executable;
  }
}

export default new System();
