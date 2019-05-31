var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js/,
				loader: 'babel-loader',
				include: __dirname + '/src'
			},
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract("css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]")
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("styles.css")
	]
}
