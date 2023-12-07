var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const initAPIs = require("./routes/api");
app.use((req, res, next) => {
    // Cho phép tất cả các origin
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Credentials', true);
  
    // Xử lý Preflight request
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
// app.options('*', cors());
app.use(express.json());
app.use(bodyParser.json());
initAPIs(app);

app.listen(3000,function(){
    console.log("ứng dụng đang chạy tại địa chỉ http://localhost:3000");
});
//Express is a node js web application framework that provides broad features for building web and mobile applications.