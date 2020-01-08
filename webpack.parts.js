const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

exports.purifyCSS = ({paths}) => ({
    plugins: [new PurifyCSSPlugin({paths})]
})

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()]
    }
})


exports.extractCSS = ({include, exclude, use = []}) => {
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].css"
    })

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: [
                        MiniCssExtractPlugin.loader
                    ].concat(use)
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader
                    ].concat(["css-loader", "less-loader"])
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader
                    ].concat(["css-loader", "sass-loader"])
                }
            ]
        },
        plugins: [plugin]
    }
}

exports.devServer = ({host, port} = {}) => ({
    devServer: {
        stats: 'errors-only',
        host,
        port,
        open: true,
        overlay: true
    }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});