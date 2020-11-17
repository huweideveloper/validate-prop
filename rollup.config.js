const { resolve } = require("path");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const buble = require("@rollup/plugin-buble");
const { terser } = require("rollup-plugin-terser");
module.exports = {
    input: resolve(__dirname, './src/index.js'),
    output:{
        name: "Validate",
        file: resolve(__dirname, './index.js'),
        format: "umd",
    },
    plugins:[
        nodeResolve(),
        commonjs(),
        buble({
            transforms: { asyncAwait: false }
        }),
        terser()
    ]
}