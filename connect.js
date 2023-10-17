var sql = require('mssql/msnodesqlv8');// for window
//var sql = require('mssql');
//các thông tin kết nối csdl
var config={
    user:"sa",
    password:"12",
    server:"YUZ",
    database:"EDU_NUCE",
    options: {
        trustedConnection: true,
        enableArithAbort: true, 
        trustServerCertificate: true,
        instanceName: "MSSQLSERVER01"
      },
   driver: "msnodesqlv8",// for window
};
const conn = new sql.ConnectionPool(config).connect().then(pool=>{
    console.log("connect successful")
    return pool});
//xuất ra dưới dạng module gồm 2 thuộc tính là conn và sql
module.exports ={
    conn: conn,
    sql: sql
}