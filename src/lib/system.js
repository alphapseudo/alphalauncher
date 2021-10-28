import Registry from 'winreg';
import Path from 'path';
import { mkdirp } from 'mkdirp';
import ChildProcess from 'child_process';
import { promisifyAll, promisify } from 'bluebird';
import { access, constants as permissions, writeFile } from 'fs';
import Constants from '../constants';

const checkFile = promisify(access);
const writeToFile = promisify(writeFile);

const {
  APP_ID,
  STEAM_BASE
} = Constants;

class System {
  static getRegistry(path) {
    return promisifyAll(new Registry({ hive: Registry.HKCU, key: path }));
  }

  static getExeName() {
    return (process.arch === 'x64')
      ? 'arma3server_x64.exe'
      : 'arma3server.exe';
  }

  static async getSteamBase() {
    const reg = System.getRegistry(STEAM_BASE);
    const path = await reg.getAsync('SteamPath').then(item => item.value);
    return path;
  }

  static async getSteamAppPath() {
    try {
      const steamPath = await System.getSteamBase();
      const reg = System.getRegistry(`${STEAM_BASE}\\Apps\\${APP_ID}`);
      const isInstalled = await reg.getAsync('Installed').then(item => parseInt(item.value, 16));
      const folderName = await reg.getAsync('Name').then(item => item.value);
      return (isInstalled && folderName)
        ? Path.normalize(`${steamPath}/steamapps/common/${folderName}`)
        : null;
    } catch (e) {
      return null;
    }
  }

  static async validatePath(path) {
    const executable = Path.normalize(`${path}/${System.getExeName()}`);

    try {
      await checkFile(executable, permissions.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async writeErrorLog(base, error) {
    const launcherBase = Path.join(base, 'AlphaLauncher');
    await mkdirp(launcherBase);
    return writeToFile(Path.join(launcherBase, 'launch-debug.log'), error.message, 'utf8');
  }

  static launchServer(path, params) {
    return ChildProcess.spawn(`${System.getExeName()}`, params, {
      cwd: path,
      detached: true
    });
  }
}

export default System;
