var QLDHP = require('../models/QLDHP.model');
const url = require('url');
const querystring = require('querystring')

var model = new QLDHP();
exports.getAll = async function(req,res){
    var query = url.parse(req.url,true).query;
    model.getAll(query.page,query.limit,query.search,query.orderby,query.hocky,function(err,data){
        if(!err){
            console.log(data.recordsets[0].length)
            const count = data.recordsets[1][0];
            console.log(count);
            sumpage = count.Filtered / query.limit;
            page = parseInt(query.page);
            limit = parseInt(query.limit)
            var totalpage;
            if(parseFloat(sumpage)){
                totalpage = Math.ceil(sumpage);
                console.log(totalpage);
            }
            const TKB_HocKy = { 
                records: data.recordsets[0],
                page: page,
                limit: limit,
                filtered: count.Filtered,
                totalItems: count.Total,
                totalPages: totalpage
            };
            res.send(TKB_HocKy);
        }else{
            res.send({result:null,error: err});
        }
    });
}
exports.update = async function(req,res){
    model.update(req.params.IDLopHocPhan,req.params.status,function(err,data){
        if(!err){
            res.send({result:data});
        }else{
            res.send({result:null,error: err});
        }
    })
    
}
exports.getDS = async function(req,res){
    var query = url.parse(req.url,true).query;
    model.getDS(query.search,query.hocky,function(err,data){
        if(!err){
            res.send({result:data});
        }else{
            res.send({result:null,error: err});
        }
    })
}