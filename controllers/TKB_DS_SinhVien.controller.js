var Sinhvien = require('../models/TKB_DS_SinhVien.model');
const url = require('url');
const querystring = require('querystring');
var model= new Sinhvien();
exports.getAll = async function(req,res){
    
    model.getAll(req.params.MaLopHocPhan,req.params.MaLopHoc,req.params.TenDot,function(err,data){
        if(!err){
            res.send({result:data});
        }else{
            res.send({result:null,error: err});
        }
    });
}