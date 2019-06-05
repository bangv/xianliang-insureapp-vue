
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin')
const SentryPlugin = require('webpack-sentry-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const version = '2.x'
const env = process.env.NODE_ENV
const baseUrl = process.env.BASE_URL

function resolve(dir) {
    return path.join(__dirname, dir)
}
// 测试及生产环境插件
const besidesDevelopEnvPlguins = [
    // gzip
    new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, //匹配文件名
        threshold: 10240,//对超过10k的数据压缩
        deleteOriginalAssets: false //不删除源文件
    }),
    // 错误监控
    new SentryPlugin({
        // Sentry options are required
        // baseSentryURL: 'https://sentry.mycorp.com/api/0', // 如果是内网使用需要加
        // include: './dist' + env.ROOT + 'static/js',
        // exclude: /\vendor.*$/,
        organization: 'allen-auyeung',
        project: 'insure-koa',
        apiKey: '88337fe6abb843369f15a74f92af7887b38373f2f4c44a6cae26cca5c4cfc4c1',
        // Release version name/hash is required
        release: version,
        deleteAfterCompile: env === 'test' ? false : true,
        suppressErrors: true,
        filenameTransform: function (filename) {
            return baseUrl + filename
        }
    })
]
// 生产环境插件
const productionEnvPlguins = [
    new TerserPlugin({
        terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
        },
    })

]

module.exports = {
    publicPath: baseUrl,
    outputDir: `../server${baseUrl}www/${baseUrl}`,
    runtimeCompiler: false,
    productionSourceMap: env === 'test' ? true : false,
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_PROXY_URL,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        sourceMap: false,
        modules: false,
        loaderOptions: {
            sass: {
                data: `$baseUrl: "${baseUrl}";`,
                // import: [path.resolve(__dirname, './src/assets/css')]
            },

        }
    },
    configureWebpack: (config) => {
        let plugins = []
        if (env !== 'development') {
            plugins = besidesDevelopEnvPlguins
        }
        if (env === 'production') {
            plugins = productionEnvPlguins
        }
        config.plugins = [...config.plugins, ...plugins];
    },
    chainWebpack: (config) => {
        // 移除预加载
        config.plugins.delete('prefetch')
        // 生成 build 报告
        if (env === 'test') {
            config.plugin('webpack-bundle-analyzer')
                .use(BundleAnalyzerPlugin)
        }
        config.resolve.alias.set('@', resolve('src'))
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))
    }
}