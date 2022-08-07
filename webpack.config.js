const { resolve } = require('path')


const root = resolve(__dirname, '/src')


module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'chip8.bundle.js',
    path: resolve(__dirname, './public/js')
  },
  mode: 'none',
  resolve: {
    alias: {
      '~/constants': root + '/constants',
      '~/services': root + '/services'
    },
    extensions: ['', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}