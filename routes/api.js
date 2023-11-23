const express = require("express");
const router = express.Router();
var TKB_HocKyController = require('../controllers/TKB_HocKy.controller');
var TKB_DS_SinhVienController = require('../controllers/TKB_DS_SinhVien.controller');
var TKB_LichThiController = require('../controllers/TKB_LichThi.controller');
var TKB_dot = require('../controllers/TKB_dot.controller');
var DS_DangKyMonHoc = require('../controllers/SV_DS_DangKyMonHoc.controller')
var DS_LHP_SiSo = require('../controllers/DS_LHP_SiSo.controller')
var DSSV_LHP_SiSo = require('../controllers/DSSV_LHP_SiSo.controller')
var KetQuaHocTap=require('../controllers/KetQuaHocTap.controller')
var Nganh = require('../controllers/Nganh.controller')
var TKB_GiangDayGV = require('../controllers/TKB_GiangDayGV.controller')
var Phonghoc = require('../controllers/PH_LichSu.controller')
var QLDHP = require('../controllers/QLDHP.Controller')
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");

 /**
  * Init all APIs on your application
  * @param {*} app from express
  */
 let initAPIs = (app) => {
   router.post("/login", AuthController.login);
   router.post("/refresh-token", AuthController.refreshToken);
   router.use(AuthMiddleWare.isAuth);
   router.get('/TKB_HocKy/',TKB_HocKyController.getAllTKB);
   router.get('/TKB_GiangDay/',TKB_GiangDayGV.getAll);
   router.get('/KetQuaHocTap/',KetQuaHocTap.getAll);
   router.get('/LichSuPH/',Phonghoc.getAll);
   router.get('/TKB_LichThi/',TKB_LichThiController.getAllLichThi);
   router.get('/SV_DangKyMonHoc/',DS_DangKyMonHoc.getAll);
   router.get('/TKB_Dot/',TKB_dot.getAll);
   router.get('/QLDHP/',QLDHP.getAll);
   router.put('/QLDHP/:IDLopHocPhan',QLDHP.update);
   router.get('/Nganh',Nganh.getAll);
   router.get('/DS_LHP_SiSo',DS_LHP_SiSo.getAll);
   router.get('/DSSV_LHP_SiSo/:MaMonHoc/:MaLopHoc/:TenDot',DSSV_LHP_SiSo.getAll)
   router.get('/TKB_DS_Sinhvien/:MaLopHocPhan/:MaLopHoc/:TenDot',TKB_DS_SinhVienController.getAll)
   return app.use("/api/v1", router);
 }

 module.exports = initAPIs;