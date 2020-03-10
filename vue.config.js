module.exports = {
  devServer: {
    port: 8081,
    // localhostでvueからexpressにAPIリクエストを送信する為の設定
    proxy: 'http://localhost:8080'
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  "transpileDependencies": [
    "vuetify"
  ]
}