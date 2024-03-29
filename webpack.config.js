const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === "development"
        ? "http://localhost:8085/"
        : "https://micro-search.vercel.app/", // Production
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 8085,
    historyApiFallback: true,
  },
  output: {
    publicPath: "auto",
    chunkFilename: "[id].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "search",
      filename: "remoteEntry.js",
      remotes: {
        host: "host@https://micro-host-self.vercel.app/remoteEntry.js",
        grid: "grid@https://micro-grid.vercel.app/remoteEntry.js",
      },
      exposes: {
        "./Search": "./src/components/Search",
      },
      shared: {
        ...deps,
        react: {
          requiredVersion: deps.react,
          singleton: true,
          eager: true,
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true,
          eager: true,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
