"use strict";
const { resolve } = require("path");
module.exports = {
  // babel-polyfill enables async-await in our client js
  entry: ["./node_modules/@babel/polyfill", "./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  mode: "development",
  context: __dirname,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, "./client"),
        loader: "babel-loader",
        query: {
          // presets: ["react"]
          presets: [
            "./node_modules/@babel/preset-env",
            "./node_modules/@babel/preset-react"
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
