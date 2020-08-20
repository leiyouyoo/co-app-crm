const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const package = require('./package.json');

/**
 * webpack打包配置
 */
module.exports = {
    optimization: {
        runtimeChunk: false,
        namedModules: true,
        namedChunks: true,
        chunkIds:"named",
        moduleIds:"named"
    },
  
    plugins: [new webpack.DefinePlugin({
        "process.env.APP_VERSION": JSON.stringify(package.version),
        "process.env.APP_RELEASEDATE": JSON.stringify(new Date())
  }),new WebpackAssetsManifest() ]
};
