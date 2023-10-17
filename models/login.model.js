const e = require('express');
const { response, request } = require('express');
//const { Request } = require('mssql');
const {conn,sql} = require('../connect');
const debug = console.log.bind(console);
module.exports = function(){
    this.getdata = async function(newData){ 
        var sqlString = `Select TOP 1 TaiKhoan,MatKhau,IsSuDung,TieuDe from DM_TaiKhoanEmail where TaiKhoan='${newData.Username}' and MatKhau = '${newData.Password}'`;
        console.log(sqlString)
       var pool =await conn;
    const result = (await pool.request().query(sqlString)).recordset[0]
    console.log(result)
    return result;
     };;  
     };
  
