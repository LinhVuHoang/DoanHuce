const { response } = require('express');
const {conn,sql} = require('../connect');
const { lowerCase, localeLowerCase } = require('lower-case');
const { SequelizeScopeError } = require('sequelize');
const moment = require('moment-timezone');
module.exports=function(){
    this.getAll = async function(page,limit,search,orderby,hocky,result){
        var pool = await conn;
        var sqlString = "Filter_TKB_NopThiGV"
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
    this.update =async function(IDLopHocPhan,status,result){
        var pool= await conn;
        const currentTime = moment();
        const vietnamTime = currentTime.tz('Asia/Ho_Chi_Minh').format();
        console.log(vietnamTime)
        if(status==1){
        var sqlString = "UPDATE DT_KhoaDiem SET IsDaNopBanGiay=@IsDaNopBanGiay, NgayNopBanGiay=DATEADD(HOUR, 7, @NgayNopBanGiay) where IDLopHocPhan=@IDLopHocPhan"
        return await pool.request()
        .input('IsDaNopBanGiay',sql.Int,status)
        .input('NgayNopBanGiay',sql.DateTime,vietnamTime)
        .input('IDLopHocPhan',sql.NVarChar,IDLopHocPhan)
        .query(sqlString,function(err,data){
            if(err){
                result(true,null);
            }else{
                result(null,IDLopHocPhan);
            }
        })
        }else{
            var sqlString = "UPDATE DT_KhoaDiem SET IsDaNopBanGiay=@IsDaNopBanGiay where IDLopHocPhan=@IDLopHocPhan"
            return await pool.request()
        .input('IsDaNopBanGiay',sql.Int,status)
        .input('IDLopHocPhan',sql.NVarChar,IDLopHocPhan)
        .query(sqlString,function(err,data){
            if(err){
                result(true,null);
            }else{
                result(null,IDLopHocPhan);
            }
        })
        }
        
    }
    this.getDS = async function(search,hocky,result){
        var pool = await conn
        console.log(search)
        console.log(hocky)
        var sqlString = "select * from View_QuanLyHP where (MaMonHoc like '%' +@search+'%'  or TenMonHoc like '%' +@search+'%') and TenDot=@TenDot and IsDaNopBanGiay Is NUll"
        return await pool.request()
        .input('search',sql.NVarChar,search)
        .input('TenDot',sql.NVarChar,hocky)
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