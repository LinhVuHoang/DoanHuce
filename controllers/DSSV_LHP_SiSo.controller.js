var DSSV_LHP_SiSo = require('../models/DSSV_LHP_SiSo.model');
const url = require('url');
const querystring = require('querystring');
var model= new DSSV_LHP_SiSo();
exports.getAll = async function(req,res){
    
    model.getAll(req.params.MaMonHoc,req.params.MaLopHoc,req.params.TenDot,function(err,data){
        if(!err){
            res.send({result:data});
        }else{
            res.send({result:null,error: err});
        }
    });
}