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
     };;  
     };
  
