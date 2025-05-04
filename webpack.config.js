const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    api: "./src/js/api.js",
    app: "./src/js/app.js",
    auth: "./src/js/auth.js",
    login: "./src/js/login.js",
    mappings: "./src/js/mappings.js",
    ui: "./src/js/ui.js",
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "[name].bundle.js",
  },
};
