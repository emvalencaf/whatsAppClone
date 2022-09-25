const path = require("path")

module.exports = {
    mode:"development",
    target:["web", "es5"],
    entry: {
        app: './public/src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'

    },
    output: {
        path: path.join(__dirname, "public/dist","js"),
        filename:"[name].bundle.js"
    },
    devtool: "source-map",
    resolve:{
        fallback:{
            'path': require.resolve('path-browserify'),
            'console': require.resolve('console-browserify'),
            'assert': false,
            'util': false
        },
        extensions:['.jsx','.js','.tsx','.ts']
    },
    module:{
        rules:[
            {
                exclude:/node_modules/,
                test: /\.js$/,
                use:{
                    loader: "babel-loader",
                    options:{
                        presets:["@babel/preset-env"],
                        plugins:[
                            ["@babel/plugin-transform-runtime"]
                        ]
                    }
                }
            }
        ]
    }
}