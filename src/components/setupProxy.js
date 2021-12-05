const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        proxy("/historics/",{
            target:'https://v2.api.forex',
            changeOrigin:true
        }

        )
    )
}