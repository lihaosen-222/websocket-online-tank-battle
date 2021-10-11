const { server, app, express } = require('./socket');

// 允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/', express.static('./static'))


const expressPort = 8001
server.listen(expressPort)

if (process.env.NODE_ENV == 'development') {
  console.log(`express启动: http://localhost:${expressPort}/`);
}
if (process.env.NODE_ENV == 'production') {
  console.log(`express启动: http://81.68.226.188:${expressPort}/`);
}
