const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');

module.exports = function(){
    this.getAllTKB = async function(page,limit,search,orderby,hocky,result){
        var pool = await conn;
        var checknull;
        var sqlString = "Filter_TKB_HocKy"
        console.log(search)
        if(search != undefined){
            search = search.toUpperCase();
        }
        if(limit == undefined || limit == null || limit =='' || !parseInt(limit)){
            limit =10;
        }
        if(page == undefined || page == null || page =='' || !parseInt(page) ){
            page =1;
        }
        if(hocky == undefined || hocky == null || hocky==''){
            hocky ='';
        }
        if(orderby == undefined || orderby == null || orderby==''){
            orderby ='MaMonHoc';
        }
        return await pool.request()
        .input('page',page)
        .input('size',limit)
        .input('search',search)
        .input('orderBy',orderby)
        .input('hocky',hocky)
        .execute(sqlString,function(err,data){
            try{
                if(data.recordset.length>0){
                    result(null,data);
                }else{
                    result(true,null);
                }
            }catch(error){
                console.log(error)
            }
        })
    }
}