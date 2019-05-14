const path = require('path');

const name = 'POPSignature';

module.exports = {
  mode: 'production',
  entry: `./src/${name}.js`,
  output: {
    path: path.resolve(__dirname, `./build/com.lesterchan.PawExtensions.${name}`),
    filename: `${name}.js`,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
