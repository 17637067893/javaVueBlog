const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("util", resolve("util"))
      .set("public", resolve("public"))
      .set("views", resolve("views"));
  },
  devServer: {
    proxy: {
      '/javaservice': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
            '/javaservice': '/'
        }
      }
    }
  }
}