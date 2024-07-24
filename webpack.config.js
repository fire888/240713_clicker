//const exec = require('child_process').execSync
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')



module.exports = (env, { mode }) => {
    return {
        entry: './src/index.ts',
        // mode: 'development',
        devtool: 'source-map',
        resolve: {
            plugins: [
                new TsconfigPathsPlugin({
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                }),
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        output: {
            filename: "./dist/index.js",
            path: path.resolve(__dirname, 'dist'),
            assetModuleFilename: '[path][name][ext]',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './templates/index.html'
            }),
            // new MiniCssExtractPlugin({
            //     filename: './dist/main_' + hashCommit + '.css',
            // }),
            new webpack.DefinePlugin({
                // __MODE__: JSON.stringify(mode),
                // __HASH_COMMIT__: JSON.stringify(hashCommit),
                // __GIT_CURRENT_BRANCH__: JSON.stringify('' + currentBranch),
                // __APP_PARAMS__: JSON.stringify(__APP_PARAMS__),
            }),
            new webpack.ProvidePlugin({
                // 'cannon': 'cannon',
                // 'babylonjs-loaders': 'babylonjs-loaders',
            }),
            // new CopyPlugin({
            //     patterns: [
            //         {from: './src/assets/icon.png', to: 'icon.png'},
            //     ],
            // }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../',
                            },
                        },
                        'css-loader',
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp|env|bin|glb|gltf|ogg|mp3|wav|avi|mp4|ktx2|json)$/i,
                    type: 'asset/resource',
                },
            ],
        },
    }
}
