const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');
module.exports = function(){
    this.getAll = async function(MaMonHoc,MaLopHoc,TenDot,result){
        console.log(MaMonHoc)
        console.log(MaLopHoc)
        console.log(TenDot)
        var pool = await conn
        var sqlString = "select  IDLopHocPhan,NgayDangKy,IDSinhVien,a.MaSinhVien,a.HoDem,a.Ten,a.NgaySinh,a.GioiTinh,MaLopHoc,TenLopHoc,TrangThaiDangKy,LopDuKien,MaLopHocPhan,a.IDLopHoc,MaHocPhan,MaMonHoc,TenMonHoc,SoTinChi,TenDot,Email,SoDienThoai from DS_SV_DangKyMonHoc as a inner Join DT_SinhVien as b on  a.MaSinhVien = b.MaSinhVien where MaMonHoc=@MaMonHoc and LopDuKien=@MaLopHoc and TenDot=@TenDot and (IDTrangThaiDangKy != 6) and DaDongHocPhi=1  order by a.Ten,a.HoDem"
        return await pool.request()
        .input('MaMonHoc',sql.NVarChar,MaMonHoc)
        .input('MaLopHoc',sql.NVarChar,MaLopHoc)
        .input('TenDot',sql.NVarChar,TenDot)
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