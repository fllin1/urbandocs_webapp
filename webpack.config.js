const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "inline-source-map",
    entry: {
      // General entries
      api: "./src/js/api.js",
      app: "./src/js/app.js",
      mappings: "./src/js/mappings.js",
      typewriter: "./src/js/typewriter.js",
      ui: "./src/js/ui.js",

      // Authentification
      auth: "./src/js/entries/auth.js",
      confirmation: "./src/js/entries/confirmation.js",
      forgottenPassword: "./src/js/entries/forgotten-password.js",
      login: "./src/js/entries/login.js",
      signup: "./src/js/entries/signup.js",
      updatePassword: "./src/js/entries/update-password.js",
    },
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "public"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "404.html",
        template: "src/404.html",
      }),
      new HtmlWebpackPlugin({
        filename: "confirmation.html",
        template: "src/confirmation.html",
      }),
      new HtmlWebpackPlugin({
        filename: "forgotten-password.html",
        template: "src/forgotten-password.html",
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html",
      }),
      new HtmlWebpackPlugin({
        filename: "login.html",
        template: "src/login.html",
      }),
      new HtmlWebpackPlugin({
        filename: "profile.html",
        template: "src/profile.html",
      }),
      new HtmlWebpackPlugin({
        filename: "signup.html",
        template: "src/signup.html",
      }),
      new HtmlWebpackPlugin({
        filename: "terms.html",
        template: "src/terms.html",
      }),
      new HtmlWebpackPlugin({
        filename: "update-password.html",
        template: "src/update-password.html",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "src/css",
            to: "css",
          },
          {
            from: "src/assets",
            to: "assets",
          },
        ],
      }),
    ],
    optimization: {
      usedExports: true,
    },
  };
};
