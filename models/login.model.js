const e = require('express');
const { response, request } = require('express');
const crypto = require('crypto');
//const { Request } = require('mssql');
const {conn,sql} = require('../connect');
const debug = console.log.bind(console);
module.exports = function(){
    this.getdata = async function(newData){ 
        const hashedPassword = crypto.createHash('md5').update(newData.Password).digest('hex');
        console.log(hashedPassword)
        var sqlString = `Select TOP 1 * from DM_NhanSuHeThongQLTD where Email='${newData.Username}' and Password = '${hashedPassword}'`;
        console.log(sqlString)
       var pool =await conn;
    const result = (await pool.request().query(sqlString)).recordset[0]
    console.log(result)
    return result;
     }; 
     this.getAll = async function(page,limit,search,result){
        //Select * from student
        var pool = await conn;
        var sqlString = "Filter_Account_QLDT";
        if(limit == undefined || limit == null || limit =='' || !parseInt(limit)){
            limit =10;
        }
        if(page == undefined || page == null || page =='' || !parseInt(page) ){
            page =1;
        }
        return await pool.request()
        .input('page',page).input('size',limit).input('search',search)
        .execute(sqlString,function(err,data){
            if(data.recordset.length >0){
                result(null,data);
            }else{
                result(true,null);
            }
        });      
    }
     this.getAllcheck = async function(result){
            var pool = await conn
            var sqlString = "select Email,HoDem,Ten,SoCMND,SoDienThoai from View_NhanSuHeThong"
            return await pool.request()
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
        this.create = async function(newData,result){
            var pool = await conn;
            const hashedPassword = crypto.createHash('md5').update(newData.Password).digest('hex');
            console.log(hashedPassword)
            var sqlString = "INSERT INTO DM_NhanSuHeThongQLTD (Email,Password,Hodem,Ten,SoCMND,SoDienThoai,Role) VALUES(@Email,@Password,@HoDem,@Ten,@SoCMND,@SoDienThoai,3)";
            return  pool.request()
            .input('Email',sql.NVarChar,newData.Email)
            .input('Password',sql.NVarChar,hashedPassword)
            .input('HoDem',sql.NVarChar,newData.HoDem)
            .input('Ten',sql.NVarChar,newData.Ten)
            .input('SoCMND',sql.NVarChar,newData.SoCMND)
            .input('SoDienThoai',sql.NVarChar,newData.SoDienThoai)
            .query(sqlString,function(err,data){
                if(err){
                    result(true,null);
                }else{
                    result(null,newData);
                }
            });
        }
        this.update = async function(Email,Role,result){
            var pool = await conn;
            var sqlString = "UPDATE DM_NhanSuHeThongQLTD SET Role = @Role WHERE Email= @Email";
            return  pool.request()
            .input('Role',sql.Int,Role)
            .input('Email',sql.NVarChar,Email)
            .query(sqlString,function(err,data){
                if(err){
                    result(true,null);
                }else{
                    result(null,data);
                }
            });
        }
     };
  
