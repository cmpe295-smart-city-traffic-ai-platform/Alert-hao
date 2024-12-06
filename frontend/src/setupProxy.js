const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/aws',
    createProxyMiddleware({
      target: '//htttp:aws.url.goes.here.com',//insert base url of iot service to test
      changeOrigin: true,
      pathRewrite: { '^/aws': '' }
    })
  );
};
