var TKB_hocky = require('../models/TKB_HocKy.model')
var model = new TKB_hocky();
const url = require('url');
const querystring = require('querystring');

exports.getAllTKB = async function(req,res){
    var query = url.parse(req.url,true).query;
    model.getAllTKB(query.page,query.limit,query.search,query.orderby,query.orderdir,query.hocky,function(err,data){
        if(!err){
            console.log("ok")
            console.log(data.recordsets[0].length)
            console.log("OK1")
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