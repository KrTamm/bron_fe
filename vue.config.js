module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8095',
                changeOrigin: true
            }
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
}
