const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');
module.exports = function(){
    this.getAll = async function(MaLopHocPhan,MaLopHoc,result){
        console.log(MaLopHocPhan)
        console.log(MaLopHoc)
        var pool = await conn
        var sqlString = "SELECT a.IDSinhVien,a.MaLopHoc, a.IDLopHocPhan, a.MaSinhVien, a.MaLopHocPhan, a.HoDem, a.Ten, c.Email, c.SoDienThoai, a.NgaySinh2, a.IDLopHocDanhNghia, a.TenMonHoc, b.TenLop,d.SiSo FROM View_TKB_LichHocSinhVien as a INNER JOIN DM_LopHoc as b on a.IDLopHocDanhNghia = b.Id INNER JOIN DT_SinhVien as c on a.MaSinhVien = c.MaSinhVien INNER JOIN View_SiSo as d on a.IDLopHocPhan = d.IDLopHocPhan WHERE a.MaLopHocPhan = @MaLopHocPhan AND MaLopHoc = @MaLopHoc GROUP by a.HoDem, a.MaLopHocPhan,a.MaLopHoc, a.Ten, a.MaSinhVien, a.NgaySinh2, a.TenMonHoc, IDLopHocDanhNghia, b.TenLop, c.Email, c.SoDienThoai, a.IDSinhVien, a.IDLopHocPhan,d.SiSo ORDER BY Ten;"
        return await pool.request()
        .input('MaLopHocPhan',sql.NVarChar,MaLopHocPhan)
        .input('MaLopHoc',sql.NVarChar,MaLopHoc)
        .query(sqlString,function(err,data){
            if(data.recordset.length>0){
            result(null,data);
            }else{
                result(true,null);
            }
        })
    }
}