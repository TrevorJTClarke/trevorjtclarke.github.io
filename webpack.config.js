const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

const folder = 'build'
const extractSass = new ExtractTextPlugin({
    filename: '[contenthash].css' //[name].
})

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'all.js',
    path: path.resolve(__dirname, folder),
    publicPath: '/'
  },
  devServer: {
    contentBase: './' + folder,
    historyApiFallback: true,
    port: 9000
  },
  module: {
    rules: [
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader?importLoaders=1&minimize=1'
        }, {
          loader: 'sass-loader'
        }],
        // use style-loader in development
        fallback: 'style-loader'
      })
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: ['es2015']
      }
    },
    {
      test: /\.ejs$/,
      loaders: ['raw-loader'],
    }]
  },
  plugins: [
    // new CleanWebpackPlugin([folder]),
    new HtmlWebpackPlugin({
      title: 'Trevor Clarke - Software Developer',
      template: './html/index.ejs',
      filename: 'index.html'
    }),
    extractSass
  ]
};
