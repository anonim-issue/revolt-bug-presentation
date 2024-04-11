const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const fs = require("fs");

let views = fs.readdirSync(path.resolve(__dirname, "src/views/"));
function generateTemplates () {
    const pages = [];
    views.forEach((name) => {
        pages.push(new HtmlWebpackPlugin({
            template: `./src/views/${name}/index.html`,
            filename: `${name}.html`,
            chunks: [`${name}`],
        }));
        if (fs.existsSync(path.resolve(__dirname, `src/views/${name}/index.en.html`))) {
            pages.push(new HtmlWebpackPlugin({
                template: `./src/views/${name}/index.en.html`,
                filename: `${name}.html`,
                chunks: [`${name}`],
            }));
        }
    });
    return pages;
}
function generateEntry () {
    const entry = new Object();
    views.forEach((name) => {
        entry[name] = `./src/views/${name}/index.ts`;
    });
    return entry;
}

module.exports = (_env, argv) => {
    const devMode = argv.mode === "development";
    return {
        entry: generateEntry(),
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            publicPath: "/",
            clean: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: devMode ? "[name].css" : "css/[name].[contenthash:8].css",
                chunkFilename: devMode ? "[id].css" : "css/[id].[contenthash:8].css",
            }),
        ].concat(generateTemplates()),
        resolve: {
            extensions: ['.ts'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
                {
                    test: /\.(svg|png|json)(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name][hash][ext]'
                    }
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][hash][ext]'
                    }
                }
            ]
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src/"),
                "@icons": path.resolve(__dirname, "src/assets/icons/"),
            },
        },
        optimization: {
            splitChunks: { chunks: "all" },
        },
    };
};
