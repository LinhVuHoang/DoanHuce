const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');
module.exports = function(){
    this.getAll = async function(MaLopHocPhan,result){
        console.log(MaLopHocPhan)
        var pool = await conn
        var sqlString = "select MaSinhVien,HoDem,Ten,TenLopHoc,NgaySinh2 from View_TKB_LichHocSinhVien where MaLopHocPhan =@MaLopHocPhan GROUP by HoDem,Ten,MaSinhVien,TenLopHoc,NgaySinh2"
        return await pool.request()
        .input('MaLopHocPhan',sql.NVarChar,MaLopHocPhan)
        .query(sqlString,function(err,data){
            if(data.recordset.length>0){
            result(null,data);
            }else{
                result(true,null);
            }
        })
    }
}