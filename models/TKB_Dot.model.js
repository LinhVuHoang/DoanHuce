const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');
module.exports = function(){
    this.getAll = async function(result){
        var pool = await conn
        var sqlString = "select TenDot FROM DM_Dot ORDER BY SUBSTRING(TenDot, 4, 9) DESC,SoThuTu DESC;"
        return await pool.request()
        .query(sqlString,function(err,data){
            if(data.recordset.length>0){
            result(null,data);
            }else{
                result(true,null);
            }
        })
    }
}