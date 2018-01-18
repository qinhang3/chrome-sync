var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
fs.copyFile('./src/assets/ext', './dist/assets/ext', (err) => {
  if (err) throw err;
});
fs.copyFile('./src/assets/icon.png', './dist/assets/icon.png', (err) => {
  if (err) throw err;
});
fs.copyFile('./src/assets/ext/bootstrap.min.js', './dist/assets/ext/bootstrap.min.js', (err) => {
  if (err) throw err;
});
fs.copyFile('./src/assets/ext/bootstrap.min.css', './dist/assets/ext/bootstrap.min.css', (err) => {
  if (err) throw err;
});
fs.copyFile('./src/assets/ext/jquery.min.js', './dist/assets/ext/jquery.min.js', (err) => {
  if (err) throw err;
});
fs.copyFile('./src/manifest.json', './dist/manifest.json', (err) => {
  if (err) throw err;
});
fs.copyFile('./src/background.js', './dist/background.js', (err) => {
  if (err) throw err;
});
fs.copyFile('./src/index.html', './dist/index.html', (err) => {
  if (err) throw err;
});

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
