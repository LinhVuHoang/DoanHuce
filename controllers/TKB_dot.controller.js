var Dot = require('../models/TKB_Dot.model');
const url = require('url');
const querystring = require('querystring');
var model= new Dot();
exports.getAll = async function(req,res){
    
    model.getAll(function(err,data){
        if(!err){
            res.send({result:data});
        }else{
            res.send({result:null,error: err});
        }
    });
}