const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');
module.exports = function(){
    this.getAll = async function(MaPhong,NgayBatDau,NgayKetThuc,result){
        var pool = await conn
        console.log(MaPhong)
        console.log(NgayBatDau)
        console.log(NgayKetThuc)
        var sqlString = "select * from View_PhongSuDung where MaPhong=@MaPhong and (NgayBatDau >= @NgayBatDau and NgayKetThuc <=@NgayKetThuc) Order by NgayBatDau,TuTiet"
        return await pool.request()
        .input('MaPhong',sql.NVarChar,MaPhong)
        .input('NgayBatDau',sql.NVarChar,NgayBatDau)
        .input('NgayKetThuc',sql.NVarChar,NgayKetThuc)
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