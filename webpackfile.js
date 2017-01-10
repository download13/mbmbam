module.exports = [
	{
		entry: './src/client.js',
		output: {
			path: './dist/public',
			filename: 'client.js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: [
							['babel-preset-es2015', {modules: false}]
						],
						plugins: [
							['transform-react-jsx', {pragma: 'h'}],
							'babel-plugin-transform-object-rest-spread'
						]
					}
				}
			]
		}
	},
	{
		entry: './src/sw.js',
		output: {
			path: './dist/public',
			filename: 'sw.js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: [
							['babel-preset-es2015', {modules: false}]
						]
					}
				}
			]
		}
	}
];
