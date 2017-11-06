const constants = {
  APP_ID: 107410,
  FOLDER_NAME: 'Arma 3',
  STEAM_BASE: '\\Software\\Valve\\Steam',
  EXEC_NAME: process.arch === 'x64' ? 'arma3server_x64.exe' : 'arma3server.exe',
  MOD_REGEX: /^@[A-Z0-9]+/i,
  MISSION_REGEX: /\.pbo$/
};

export default constants;
