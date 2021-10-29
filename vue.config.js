module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Alpha Launcher",
        appId: "com.github.alphapseudo.alphalauncher",
        linux: {
          target: ["deb", "tar.gz"]
        }
      },
      nodeIntegration: true
    }
  }
}
