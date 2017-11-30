var webpack = require("webpack");

module.exports = {
  entry: {
    "i18n-react": "./src/i18react.ts",
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'i18react.umd.js',
    library: 'i18react',
    libraryTarget: "umd"
  },
  externals: {
    "react": "React"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts'],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devtool: "source-map",
};
