const path = require("path");
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "components": path.resolve(__dirname, "src/components"),"shared": path.resolve(__dirname, "src/components/shared"),
        "contexts": path.resolve(__dirname, "src/contexts"),
        "hooks": path.resolve(__dirname, "src/hooks"),
        "images": path.resolve(__dirname, "src/images"),
        "sw": path.resolve(__dirname, "src/service-worker"),
        "styles": path.resolve(__dirname, "src/styles")
      }
    }
  });
};