const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    // General entries
    api: "./src/api.js",
    app: "./src/app.js",
    mappings: "./src/mappings.js",
    ui: "./src/ui.js",

    // Authentification
    auth: "./src/entries/auth.js",
    login: "./src/entries/login.js",
    signup: "./src/entries/signup.js",
    confirmation: "./src/entries/confirmation.js",
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "[name].bundle.js",
  },
  // Adding a resolution rule to facilitate imports
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@auth": path.resolve(__dirname, "src/auth/"),
      "@entries": path.resolve(__dirname, "src/entries/"),
    },
  },
};
