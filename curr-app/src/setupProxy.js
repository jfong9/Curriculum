const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/api/v1/schools', {target:'http://localhost:5000'}))
    app.use(createProxyMiddleware('/api/v1/students', {target:'http://localhost:5000'}))
    app.use(createProxyMiddleware('/api/v1/users', {target:'http://localhost:4000' }))
}