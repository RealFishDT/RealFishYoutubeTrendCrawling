const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({extractComments: false})],
  },
  mode: 'production',
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new DtsBundleWebpack({
      name: 'ryc',
      main: 'dist/debug/src/main.d.ts',
      out: '../../prod/bundle.d.ts',
      outputAsModuleFolder: true,
    }),
  ],
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '../dist/prod'),
  },
};
