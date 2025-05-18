const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (argv) => {
  const isProd = argv.mode === "production";

  const commonChunks = ["ui"];

  const config = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "inline-source-map",
    entry: {
      // General entries
      // api: "./src/js/api.js",
      app: "./src/js/app.js",
      mappings: "./src/js/mappings.js",
      pluSummary: "./src/js/plu-summary.js",
      typewriter: "./src/js/typewriter.js",
      // ui: "./src/js/ui.js",

      // Authentification
      // auth: "./src/js/entries/auth.js",
      confirmation: "./src/js/entries/confirmation.js",
      forgottenPassword: "./src/js/entries/forgotten-password.js",
      login: "./src/js/entries/login.js",
      profile: "./src/js/entries/profile.js",
      signup: "./src/js/entries/signup.js",
      updatePassword: "./src/js/entries/update-password.js",
    },
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "public"),
      clean: true,
    },
    plugins: [
      // Auth pages
      new HtmlWebpackPlugin({
        filename: "confirmation.html",
        template: "src/auth/confirmation.html",
        chunks: [...commonChunks, "confirmation"],
      }),
      new HtmlWebpackPlugin({
        filename: "forgotten-password.html",
        template: "src/auth/forgotten-password.html",
        chunks: [...commonChunks, "forgottenPassword"],
      }),
      new HtmlWebpackPlugin({
        filename: "login.html",
        template: "src/auth/login.html",
        chunks: [...commonChunks, "login"],
      }),
      new HtmlWebpackPlugin({
        filename: "signup.html",
        template: "src/auth/signup.html",
        chunks: [...commonChunks, "signup"],
      }),
      new HtmlWebpackPlugin({
        filename: "update-password.html",
        template: "src/auth/update-password.html",
        chunks: [...commonChunks, "updatePassword"],
      }),
      // Policy pages
      new HtmlWebpackPlugin({
        filename: "cookies.html",
        template: "src/policies/cookies.html",
        chunks: [...commonChunks],
      }),
      new HtmlWebpackPlugin({
        filename: "politiques-de-ventes.html",
        template: "src/policies/politiques-de-ventes.html",
        chunks: [...commonChunks],
      }),
      new HtmlWebpackPlugin({
        filename: "terms.html",
        template: "src/policies/terms.html",
        chunks: [...commonChunks],
      }),
      // Main pages
      new HtmlWebpackPlugin({
        filename: "404.html",
        template: "src/404.html",
        chunks: [...commonChunks],
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html",
        chunks: [...commonChunks, "app", "mappings", "typewriter"],
      }),
      new HtmlWebpackPlugin({
        filename: "plu-summary-template.html",
        template: "src/plu-summary-template.html",
        chunks: [...commonChunks, "pluSummary"],
      }),
      new HtmlWebpackPlugin({
        filename: "profile.html",
        template: "src/profile.html",
        chunks: [...commonChunks, "profile"],
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
      splitChunks: {
        chunks: "all", // Automatically find and split common chunks
      },
    },
  };

  return config;
};
