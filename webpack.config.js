const path = require('path');

module.exports = {
  entry: './client/App.js', // assumes your entry point is App.js in the client folder
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js' // assumes your bundle.js will  be in the public folder, must match with .gitignore file
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-2'] // if you aren't using 'babel-preset-env', then omit the 'env'
        }
      }
    ]
  }
};
