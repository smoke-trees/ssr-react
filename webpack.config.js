const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const production = process.env.NODE_ENV === 'production'

const pages = ['index', 'about']

const generateEntryPoints = (entry) => {
  return entry.reduce((obj, item) => {
    return {
      ...obj,
      [item]: [path.resolve('src', 'components', 'entrypoints', `${item}.jsx`)]
    }
  }, {})
}

const generateHtml = (entry) => {
  return entry.map((i) => {
    return new HtmlWebpackPlugin({
      chunks: [i],
      filename: `../views/pages/${i}.ejs`,
      template: path.join('src', 'views', 'pages', 'template.ejs')
    })
  })
}

const config = [{
  entry: {
    ...generateEntryPoints(pages)
  },

  output: {
    path: production ? path.resolve(__dirname, 'dist', 'static', 'public') : path.resolve(__dirname, 'src', 'static', 'public'),
    filename: production ? 'js/[chunkhash].js' : 'js/[name].js',
    publicPath: '/public'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: [/node_modules/, /static/]
      }, {
        test: /\.ejs$/,
        loader: 'raw-loader'
      }, {
        test: /\.(css)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/public/css'
          }

        }, 'css-loader']
      }, {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[md5:hash:hex].[ext]',
            publicPath: '/public/img',
            outputPath: 'img'
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*']
  },

  optimization: {
    splitChunks: {
      automaticNameDelimiter: '.',
      cacheGroups: {
        react: {
          chunks: 'initial'
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    // create blog,
    new MiniCssExtractPlugin({
      filename: production ? 'css/[contentHash].css' : 'css/[id].css',
      chunkFilename: production ? 'css/[contentHash].css' : 'css/[id].css'
    }),
    // Ejs pages
    ...generateHtml(pages)
  ]
}]

module.exports = config
