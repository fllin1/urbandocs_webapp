const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (argv) => {
  const isProd = argv.mode === "production";

  const commonChunks = ["header", "ui", "uiComponents", "footer"];

  const config = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "inline-source-map",
    entry: {
      // Core modules - Enhanced architecture
      app: "./src/js/app.js",
      mappings: "./src/js/mappings.js",
      pluSummary: "./src/js/plu-summary.js",
      typewriter: "./src/js/typewriter.js",
      ui: "./src/js/ui.js",

      // Enhanced services and state management
      apiService: "./src/js/services/api-service.js",
      stateManager: "./src/js/state/state-manager.js",

      // Enhanced utilities
      performance: "./src/js/utils/performance.js",
      security: "./src/js/utils/security.js",

      // Enhanced UI components
      uiComponents: "./src/js/components/ui-components.js",

      // Authentication entries
      confirmation: "./src/js/entries/confirmation.js",
      forgottenPassword: "./src/js/entries/forgotten-password.js",
      login: "./src/js/entries/login.js",
      profile: "./src/js/entries/profile.js",
      signup: "./src/js/entries/signup.js",
      updatePassword: "./src/js/entries/update-password.js",
      accountDeletionStatus: "./src/js/entries/account-deletion-status.js",

      // Components
      footer: "./src/js/components/footer.js",
      header: "./src/js/entries/header.js",

      // Page-specific entries for header authentication
      about: "./src/js/entries/about.js",
      contact: "./src/js/entries/contact.js",
      documentation: "./src/js/entries/documentation.js",
      donation: "./src/js/entries/donation.js",
    },
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "public"),
      clean: true,
    },
    plugins: [
      // TODO : Auth pages
      new HtmlWebpackPlugin({
        filename: "auth/confirmation.html",
        template: "src/auth/confirmation.html",
        chunks: [...commonChunks, "confirmation", "security"],
      }),
      new HtmlWebpackPlugin({
        filename: "auth/forgotten-password.html",
        template: "src/auth/forgotten-password.html",
        chunks: [...commonChunks, "forgottenPassword", "security"],
      }),
      new HtmlWebpackPlugin({
        filename: "auth/login.html",
        template: "src/auth/login.html",
        chunks: [...commonChunks, "login", "security"],
      }),
      new HtmlWebpackPlugin({
        filename: "auth/signup.html",
        template: "src/auth/signup.html",
        chunks: [...commonChunks, "signup", "security"],
      }),
      new HtmlWebpackPlugin({
        filename: "auth/update-password.html",
        template: "src/auth/update-password.html",
        chunks: [...commonChunks, "updatePassword", "security"],
      }),
      // TODO : Docs pages
      new HtmlWebpackPlugin({
        filename: "docs/documentation.html",
        template: "src/docs/documentation.html",
        chunks: [...commonChunks, "documentation"],
      }),
      // TODO : Info pages
      new HtmlWebpackPlugin({
        filename: "info/about.html",
        template: "src/info/about.html",
        chunks: [...commonChunks, "about"],
      }),
      new HtmlWebpackPlugin({
        filename: "info/contact.html",
        template: "src/info/contact.html",
        chunks: [...commonChunks, "contact", "security"],
      }),
      new HtmlWebpackPlugin({
        filename: "info/donation.html",
        template: "src/info/donation.html",
        chunks: [...commonChunks, "donation", "security"],
      }),
      new HtmlWebpackPlugin({
        filename: "info/donation-success.html",
        template: "src/info/donation-success.html",
        chunks: [...commonChunks],
      }),
      // TODO : Policies pages
      new HtmlWebpackPlugin({
        filename: "policies/privacy.html",
        template: "src/policies/privacy.html",
        chunks: [...commonChunks],
      }),
      new HtmlWebpackPlugin({
        filename: "policies/cookies.html",
        template: "src/policies/cookies.html",
        chunks: [...commonChunks],
      }),
      new HtmlWebpackPlugin({
        filename: "policies/legal-notice.html",
        template: "src/policies/legal-notice.html",
        chunks: [...commonChunks],
      }),
      new HtmlWebpackPlugin({
        filename: "policies/politiques-de-ventes.html",
        template: "src/policies/politiques-de-ventes.html",
        chunks: [...commonChunks],
      }),
      new HtmlWebpackPlugin({
        filename: "policies/terms.html",
        template: "src/policies/terms.html",
        chunks: [...commonChunks],
      }),
      // TODO : User pages
      new HtmlWebpackPlugin({
        filename: "user/profile.html",
        template: "src/user/profile.html",
        chunks: [...commonChunks, "profile", "security"],
      }),
      new HtmlWebpackPlugin({
        filename: "user/account-deletion-status.html",
        template: "src/user/account-deletion-status.html",
        chunks: ["ui", "accountDeletionStatus", "security"],
      }),
      // TODO : Main pages
      new HtmlWebpackPlugin({
        filename: "404.html",
        template: "src/404.html",
        chunks: [...commonChunks],
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html",
        chunks: [
          ...commonChunks,
          "app",
          "mappings",
          "typewriter",
          "apiService",
          "stateManager",
          "performance",
        ],
      }),
      new HtmlWebpackPlugin({
        filename: "plu-summary.html",
        template: "src/plu-summary.html",
        chunks: [
          ...commonChunks,
          "pluSummary",
          "apiService",
          "stateManager",
          "performance",
          "security",
        ],
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
        chunks: "all",
        cacheGroups: {
          // Enhanced vendor splitting
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          // Common utilities
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            enforce: true,
          },
          // Enhanced services
          services: {
            test: /[\\/]src[\\/]js[\\/](services|state)[\\/]/,
            name: "services",
            chunks: "all",
            minSize: 0,
          },
          // Enhanced utilities
          utils: {
            test: /[\\/]src[\\/]js[\\/]utils[\\/]/,
            name: "utils",
            chunks: "all",
            minSize: 0,
          },
          // Enhanced components
          components: {
            test: /[\\/]src[\\/]js[\\/]components[\\/]/,
            name: "components",
            chunks: "all",
            minSize: 0,
          },
        },
      },
    },
    // Enhanced module resolution
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@js": path.resolve(__dirname, "src/js"),
        "@css": path.resolve(__dirname, "src/css"),
        "@components": path.resolve(__dirname, "src/js/components"),
        "@services": path.resolve(__dirname, "src/js/services"),
        "@utils": path.resolve(__dirname, "src/js/utils"),
        "@state": path.resolve(__dirname, "src/js/state"),
      },
    },
    // Enhanced performance optimizations
    performance: {
      hints: isProd ? "warning" : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };

  return config;
};
