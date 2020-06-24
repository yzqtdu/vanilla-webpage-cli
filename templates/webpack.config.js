const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = env => {
  let isTS
  try {
    isTS = require('typescript')
  } catch(err) {
    isTS = false
  }
  const babelOptions = isTS ? {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-typescript']
  } : {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime']
  }
  return {
    entry: isTS ? ['./src/main.ts'] : ['./src/main.js'],
    output: {
      filename: 'js/[name]-[contenthash:5].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.m?(js|ts)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: babelOptions
          }
        },
        {
          test: /\.(png|jpg|jpeg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,  // 这里是为了解决node js无法识别esmodule的问题
                outputPath: './images',
                name: '[name]-[contenthash:7].[ext]',
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            'html-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                outputPath: './css',
                name: '[name]-[contenthash:5].[ext]',
              }
            },
            "extract-loader",
            'css-loader'
          ]
        }
      ]
    },
    mode: env && env.production ? 'production' : 'development',  // 开发模式
    devtool: env && env.production ? undefined : 'source-map', // 开发用
    plugins: [
      // 如果需要定义全局变量，请用下面这个插件
      // new webpack.DefinePlugin({
      //   PRODUCTION: JSON.stringify(true),
      //   VERSION: JSON.stringify('5fa3b9'),
      //   BROWSER_SUPPORTS_HTML5: true,
      //   TWO: '1+1',
      //   'typeof window': JSON.stringify('object'),
      //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      // }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    // optimization: {
    //     moduleIds: 'hashed',
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //       cacheGroups: {
    //         vendor: {
    //           test: /[\\/]node_modules[\\/]/,
    //           name: 'vendors',
    //           chunks: 'all'
    //         }
    //       },
    //       chunks: 'all'
    //     }
    // },
    devServer: {
      contentBase: './',
      port: 8000,
      open: false,
      proxy: {
        // '/login':  {
        //   target: 'http://api.xxx.com',
        //   changeOrigin: true
        // },
      }
    }
  }
};