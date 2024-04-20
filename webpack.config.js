import path from 'path';

import Dotenv from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './static/js/index.js',
  output: {
    path: path.resolve('static', 'gen'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};

export default () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
