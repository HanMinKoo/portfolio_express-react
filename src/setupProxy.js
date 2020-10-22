const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api/customers', {
          target: 'http://localhost:8004',
          changeOrigin: true
      })
  );
  app.use(
    createProxyMiddleware('/api/home', {
        target: 'http://localhost:8004',
        changeOrigin: true
    })
  );
  
};
