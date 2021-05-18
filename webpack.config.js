const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript').default;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const webpack = require('webpack');
const path = require('path')

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui.tsx', // The entry point for your UI code
    code: './src/code.ts', // The entry point for your plugin code
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    openPage: '/ui.html',
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: 9000,
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
       // Converts TypeScript code to JavaScript
      { 
        test: /\.tsx?$/, 
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: argv.PREVIEW_ENV === 'browser ' ? [ReactRefreshTypeScript()] : [],
              }),
            }
          }
        ].filter(Boolean),
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      { test: /\.css$/, loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      { test: /\.(png|jpg|gif|webp|svg|zip)$/, loader: [{ loader: 'url-loader' }] },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    argv.PREVIEW_ENV === 'browser' && new ReactRefreshPlugin(),
    argv.PREVIEW_ENV === 'browser' && new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/ui.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    argv.PREVIEW_ENV !== 'browser' && new HtmlWebpackInlineSourcePlugin(),
     new webpack.DefinePlugin({
      'process.env':  {
        PREVIEW_ENV: JSON.stringify(argv.PREVIEW_ENV)
      },
    }),
  ].filter(Boolean),
})