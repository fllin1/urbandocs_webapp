const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    // Points d'entrée généraux
    api: "./src/js/api.js",
    app: "./src/js/app.js",
    mappings: "./src/js/mappings.js",
    ui: "./src/js/ui.js",

    // Points d'entrée pour l'authentification
    auth: "./src/js/entries/auth.js",
    login: "./src/js/entries/login.js",
    signup: "./src/js/entries/signup.js",
    confirmation: "./src/js/entries/confirmation.js",
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "[name].bundle.js",
  },
  // Ajout d'une règle de résolution pour faciliter les imports
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@auth": path.resolve(__dirname, "src/js/auth/"),
      "@entries": path.resolve(__dirname, "src/js/entries/"),
    },
  },
};
