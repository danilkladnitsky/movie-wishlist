const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.bundle.js",
    publicPath: "",
  },
  devServer: {
    port: 80,
    watchContentBase: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      automaticNameDelimiter: "_",
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`
      new HtmlMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
};
