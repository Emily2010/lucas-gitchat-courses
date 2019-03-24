module.exports={
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: "babel-loader",
                options: {
		            "plugins": [
		                "dynamic-import-webpack"
		            ]
		        }
            }
        ]
    }
}