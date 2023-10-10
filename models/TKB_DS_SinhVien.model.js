const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');
module.exports = function(){
    this.getAll = async function(MaLopHocPhan,result){
        console.log(MaLopHocPhan)
        var pool = await conn
        var sqlString = "select a.MaSinhVien,a.MaLopHocPhan,a.HoDem,a.Ten,a.NgaySinh2,a.IDLopHocDanhNghia,a.TenMonHoc,b.TenLop from View_TKB_LichHocSinhVien as a INNER JOIN DM_LopHoc as b on a.IDLopHocDanhNghia=b.Id  where MaLopHocPhan =@MaLopHocPhan GROUP by HoDem,a.MaLopHocPhan,Ten,MaSinhVien,NgaySinh2,TenMonHoc,IDLopHocDanhNghia,b.TenLop order by Ten"
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