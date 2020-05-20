const webpack = require('webpack')

const webpackConfig = require('./webpack.config')
const babelServerConfig = require('./.babelrc.server.json')

webpackConfig[0].mode = 'development'

console.log('\x1b[38;2;31;240;255mMade By SmokeTrees with \x1b[38;2;250;33;33m%s\x1b[0m\n\n', '❤')
console.log('\x1b[38;2;31;240;255mAuthors:\x1b[0m')
console.log('\x1b[38;2;31;240;255mAnshuman Chhapolia \thttps://github.com/achhapolia10 \x1b[0m\n\n')

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }

  console.log('\x1b[38;2;213;235;21mCompiled by Webpack\n')

  info.children.forEach((child, i) => {
    console.log('Output Path: ', child.outputPath)
    console.log('\x1b[38;2;21;194;90mAsset \t \t \t \t \t \t ChunkName \t \t \t \t Size\x1b[0m\n')
    child.assets.forEach((asset, j) => {
      const ac = asset.name.length > 20 ? '\t \t \t ' : '\t \t \t \t \t'
      const chn = (asset.chunkNames[0] || '').length > 13 ? '\t \t \t ' : '\t \t \t \t \t '
      console.log('\x1b[38;2;21;194;90m%s %s \x1b[0m%s%s%fkb', asset.name, ac, asset.chunkNames[0] || '', chn, (asset.size / 1024).toFixed(2))
    })
  })

  console.log()

  console.log('\x1b[38;2;255;200;0mStarting the developemnt server\x1b[0m')

  console.log()

  require('@babel/register')(babelServerConfig)

  require('./src/server')
})
