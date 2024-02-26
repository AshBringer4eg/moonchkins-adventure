import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: './src/js/app.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: ['/node_modules/', '/deprecated/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sprouts',
      template: './src/index.template.html',
      filename: './index.html',
    }), // Generates default index.html
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets/**/*.*',
          to: './dist/[path][name][ext]',
          context: './src/',
        },
        {
          from: 'third_party/**/*.*',
          to: './dist/[path][name][ext]',
          context: './',
        },
      ],
    }),
  ],
  output: {
    filename: './dist/app.js',
    path: path.resolve(__dirname, './'),
  },
};