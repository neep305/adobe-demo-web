const path = require('path');

module.exports = {
  mode: 'production',
  entry: './public/javascripts/adobe-alloy.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    // library: {
    //   name: 'AdobeAlloy',
    //   type: 'var'
    // }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!@adobe)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}; 