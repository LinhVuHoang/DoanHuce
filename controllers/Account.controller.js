var account = require('../models/login.model');
var model = new account();
const url = require('url');
const querystring = require('querystring');

exports.getAll = async function(req,res){
    //Select * from student
    var query = url.parse(req.url,true).query;
    model.getAll(query.page,query.limit,query.search,function(err,data){
        if(!err){
            const count = data.recordsets[1][0];
            console.log(count);
            const tours = { 
                records: data.recordsets[0],
                page: query.page,
                limit: data.recordset.length,
                filtered: count.Filtered,
                totalrecords: count.Total,
            };
            res.send(tours);
        }else{
            res.send({result:null,error: err});
        }
    });
}
    exports.update = async function(req,res){
        model.update(req.params.Email,req.params.Role,function(err,data){
            if(!err){
                res.send({result:data});
            }else{
                
                res.send({result:null,error: err});
            }
        })
    }
    exports.create =async function(req,res){
        model.create(req.body,function(err,data){
            if(!err){
                res.send({result:data});
            }else{
                res.send({result:null,error: err});
            }
        })
    }
    exports.getAllcheck = async function(req,res){
    
        model.getAllcheck(function(err,data){
            if(!err){
                res.send({result:data});
            }else{
                res.send({result:null,error: err});
            }
        });
    }
    exports.UpdateAccount = async function(req,res){
        model.updateAccount(req.params.Email,req.params.Password,function(err,data){
            if(!err){
                res.send({result:data});
            }else{
                
                res.send({result:null,error: err});
            }
        })
    }