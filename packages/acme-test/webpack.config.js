const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.jsx",
  target: "browserslist",
  output: {
    filename: "index.js",
    path: resolve("dist"),
  },
  plugins: [
    process.env.ANALYZE ? new BundleAnalyzerPlugin() : () => {},
    new webpack.DefinePlugin({
      staticStore: JSON.stringify("static-folder"),
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { corejs: 3, modules: false, useBuiltIns: "entry" },
              ],
              "@babel/react",
              [
                "@emotion/babel-preset-css-prop",
                { labelFormat: "[filename]--[local]" },
              ],
            ],
            plugins: [
              "@babel/transform-react-constant-elements",
              "transform-react-remove-prop-types",
            ],
          },
        },
      },
    ],
  },
};
