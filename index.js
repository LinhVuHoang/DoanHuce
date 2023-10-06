var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors()) ;
const initAPIs = require("./routes/api");
app.use(express.json());
initAPIs(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(3000,function(){
    console.log("ứng dụng đang chạy tại địa chỉ http://localhost:3000");
});
//Express is a node js web application framework that provides broad features for building web and mobile applications.