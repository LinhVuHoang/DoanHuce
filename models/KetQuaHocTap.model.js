const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');
module.exports = function(){
    this.getAll = async function(MaSinhVien,result){
        var pool = await conn
        console.log(MaSinhVien)
        var sqlString = "select * from  DiemCacHocKySV where MaSinhVien=@MaSinhVien order by Id,MaHocPhan"
        return await pool.request()
        .input('MaSinhVien',sql.NVarChar,MaSinhVien)
        .query(sqlString,function(err,data){
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