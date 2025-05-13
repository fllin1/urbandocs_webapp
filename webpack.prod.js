const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
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
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public/js"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin(), // by default index.html
    new HtmlWebpackPlugin({
      filename: "../confirmation.html",
      template: "src/confirmation.html",
    }),
    new HtmlWebpackPlugin({
      filename: "../login.html",
      template: "src/login.html",
    }),
    new HtmlWebpackPlugin({
      filename: "../signup.html",
      template: "src/signup.html",
    }),
    new HtmlWebpackPlugin({
      filename: "../terms.html",
      template: "src/terms.html",
    }),
    new HtmlWebpackPlugin({
      filename: "../404.html",
      template: "src/404.html",
    }),
  ],
  optimization: {
    usedExports: true,
  },
};
