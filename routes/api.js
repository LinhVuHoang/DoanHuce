const express = require("express");
const router = express.Router();
var TKB_HocKyController = require('../controllers/TKB_HocKy.controller');
var TKB_DS_SinhVienController = require('../controllers/TKB_DS_SinhVien.controller');
var TKB_dot = require('../controllers/TKB_dot.controller')

 /**
  * Init all APIs on your application
  * @param {*} app from express
  */
 let initAPIs = (app) => {
    router.get('/TKB_HocKy/',TKB_HocKyController.getAllTKB);
    router.get('/TKB_Dot/',TKB_dot.getAll);
    router.get('/TKB_DS_Sinhvien/:MaLopHocPhan',TKB_DS_SinhVienController.getAll)
    return app.use("/api/v1", router);
 }

 module.exports = initAPIs;