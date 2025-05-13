const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    // General entries
    api: "./src/js/api.js",
    app: "./src/js/app.js",
    mappings: "./src/js/mappings.js",
    ui: "./src/js/ui.js",

    // Authentification
    auth: "./src/js/entries/auth.js",
    login: "./src/js/entries/login.js",
    signup: "./src/js/entries/signup.js",
    confirmation: "./src/js/entries/confirmation.js",
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin(), // by default index.html
    new HtmlWebpackPlugin({
      filename: "confirmation.html",
      template: "src/confirmation.html",
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "src/login.html",
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
      filename: "404.html",
      template: "src/404.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/css",
          to: "css",
        },
      ],
    }),
  ],
  optimization: {
    usedExports: true,
  },
};
