/* eslint no-param-reassign:0, import/no-extraneous-dependencies:0 */
const path = require('path');
const webpack = require('webpack');

module.exports = (config) => {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'test/_helpers/*.js',
      'test/utils/*.js',
      'test/components/*.jsx',
    ],

    webpack: {
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, (result) => {
          if (/cheerio/.test(result.context)) {
            result.request = './package.json';
          }
        }),
      ],
      module: {
        noParse: [
          /node_modules\/sinon\//,
        ],
        loaders: [
          {
            test: /\.jsx?/,
            loader: 'babel-loader',
            include: [
              path.join(__dirname, 'src'),
              path.join(__dirname, 'test'),
            ],
            query: {
              presets: ['airbnb'],
            },
          },
          // react-svg loads svg files as react components
          {
            test: /\.svg$/,
            loader: 'babel!react-svg',
            include: [
              path.join(__dirname, 'src'),
            ],
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
        ],
      },
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon.js',
        },
        extensions: ['', '.js', '.jsx'],
      },
    },

    preprocessors: {
      'test/**/*': ['webpack'],
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Firefox'],

    singleRun: true,

    concurrency: Infinity,
  });
};
