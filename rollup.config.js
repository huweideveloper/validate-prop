const { resolve, format } = require("path");
const buble = require("@rollup/plugin-buble");
const { terser } = require("rollup-plugin-terser");
module.exports = {
    input: resolve(__dirname, './src/index.js'),
    output:{
        name: "get-safe-value",
        file: resolve(__dirname, './index.js'),
        format: "umd",
    },
    plugins:[
        buble({
            transforms: { asyncAwait: false }
        }),
        terser()
    ]
}