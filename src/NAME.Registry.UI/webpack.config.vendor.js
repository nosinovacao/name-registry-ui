const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: [ '.js' ] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                // { test: require.resolve('arrive'), loader: 'imports-loader?this=>window' }
            ]
        },
        entry: {
            vendor: [
                '@angular/animations',
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                // pollyfils for IE11 compat
                'core-js/es6/parse-float',
                'core-js/es6/symbol',
                'core-js/es6/object',
                'core-js/es6/function',
                'core-js/es6/parse-int',
                'core-js/es6/number',
                'core-js/es6/math',
                'core-js/es6/string',
                'core-js/es6/date',
                'core-js/es6/array',
                'core-js/es6/regexp',
                'core-js/es6/map',
                'core-js/es6/set',
                //
                'bootstrap',
                'bootstrap/dist/css/bootstrap.css',
                'bootstrap/dist/js/bootstrap.js',
                'bootstrap-material-design/dist/css/bootstrap-material-design.css',
                'bootstrap-material-design/dist/css/ripples.css',
                'spinkit/css/spinners/3-wave.css',
                'es6-shim',
                'es6-promise',
                'event-source-polyfill',
                'jquery',
                'zone.js',
                'ng2-bs3-modal/ng2-bs3-modal',
                'angular2-prettyjson',
                'ngx-clipboard',
            ]
        },
        output: {
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery', 'window.$': 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/14898
            new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
            ]
        },
        entry: {
            vendor: [
                'arrive'
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    return [clientBundleConfig];
}
