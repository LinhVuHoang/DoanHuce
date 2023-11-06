var Nganh = require('../models/Nganh.model');
const url = require('url');
const querystring = require('querystring');
var model= new Nganh();
exports.getAll = async function(req,res){
    
    model.getAll(function(err,data){
        if(!err){
            res.send({result:data});
        }else{
            res.send({result:null,error: err});
        }
    });
}