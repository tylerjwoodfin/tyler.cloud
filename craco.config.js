const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new CopyWebpackPlugin({
          patterns: [
            { from: path.resolve(__dirname, "rundino"), to: "rundino" },
            { from: path.resolve(__dirname, "../backend/tpn"), to: "tpn" }, // requires running from `~/git/tyler.cloud`
            {
              from: path.resolve(__dirname, "../backend/rundino"),
              to: "rundino",
            },
            {
              from: path.resolve(__dirname, "../backend/php/feedback.php"),
              to: "feedback.php",
            },
          ],
        }),
      ],
    },
  },
};
