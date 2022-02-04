const fs = require("fs");

module.exports = {
  certs(name) {
    const dir = __dirname + "/../../../../ssl/certs/";

    const files = fs.readdirSync(dir);
    var certs = [];

    files
      .map((fileName) => ({
        name: fileName,
        time: fs.statSync(`${dir}/${fileName}`).mtime.getTime(),
      }))
      .sort((a, b) => a.time - b.time)
      .map((file) => {
        if (file.name.startsWith(name)) certs.push(file.name);
      });
    return certs[0];
  },
  keys(name) {
    const dir = __dirname + "/../../../../ssl/keys/";

    const files = fs.readdirSync(dir);
    var keys = [];

    files
      .map((fileName) => ({
        name: fileName,
        time: fs.statSync(`${dir}/${fileName}`).mtime.getTime(),
      }))
      .sort((a, b) => a.time - b.time)
      .map((file) => {
        if (file.name.startsWith(name.split("_")[4] + "_" + name.split("_")[5]))
          keys.push(file.name);
      });
    return keys[0];
  },
};
