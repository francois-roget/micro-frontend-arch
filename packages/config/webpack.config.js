const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appPackageJson = require(resolveApp('package.json'));

module.exports = {
	entry: { main: resolveApp('src/index.tsx') },
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				use: [{ loader: require.resolve('ts-loader') }],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					{ loader: require.resolve('style-loader') },
					{ loader: require.resolve('css-loader') },
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '../',
							// hmr: process.env.NODE_ENV === 'development',
							esModule: false,
						},
					},
					// Translates CSS into CommonJS
					{ loader: require.resolve('css-loader') },
					// Compiles Sass to CSS
					{ loader: require.resolve('sass-loader') },
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', 'scss'],
	},
	output: {
		filename: '[name].[contenthash].js',
		path: resolveApp('dist'),
	},
	externals: {
		react: 'React',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new AssetsPlugin({
			filename: 'manifest.json',
			useCompilerPath: true,
			integrity: true,
			prettyPrint: true,
			includeManifest: true,
			removeFullPathAutoPrefix: true,
			metadata: {
				componentName: appPackageJson.ifsMfeModuleName,
			},
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],
};
