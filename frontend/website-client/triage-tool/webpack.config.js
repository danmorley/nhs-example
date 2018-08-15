const path = require('path');
const Dotenv = require('dotenv-webpack');

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader"]
  },
  {
    // Match woff2 in addition to patterns like .woff?v=1.1.1.
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 100000,
        name: './fonts/[name].[ext]'
      }
    }]
  }
]

const nodeConfig = {
  module: {
    rules: rules
  },
  plugins: [ new Dotenv() ],
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  mode: process.env.NODE_ENV || "development"
}

const webConfig = {
  module: {
    rules: rules
  },
  plugins: [ new Dotenv() ],
  entry: './src/dev.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'triage-tool.js'
  },
  mode: process.env.NODE_ENV || "development"
}

module.exports = [ nodeConfig, webConfig ]
