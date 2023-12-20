//các thông tin kết nối csdl
const os = require('os');
if (os.platform() === 'win32') {
  // Hệ điều hành đang chạy là Windows
  console.log('Hệ điều hành là Windows.');
  var sql = require('mssql/msnodesqlv8');// for window
  var config={
    user:"sa",
    password:"12",
    server:"YUZ",
    database:"EDU_NUCE",
    options: {
        trustedConnection: false,
         enableArithAbort: true, 
         trustServerCertificate: true
      },
   driver: "msnodesqlv8",// for window
};
} else if (os.platform() === 'darwin') {
  // Hệ điều hành đang chạy là macOS (Darwin)
  console.log('Hệ điều hành là macOS.');
  var sql = require('mssql');
  var config={
    user:"sa",
    password:"Docker@123",
    server:"localhost",
    database:"EDU_NUCE",
    options: {
        trustedConnection: false,
         enableArithAbort: true, 
         trustServerCertificate: true,
      },
    };
} else {
  console.log('Hệ điều hành không được hỗ trợ hoặc không thể xác định.');
}
const conn = new sql.ConnectionPool(config).connect().then(pool=>{
    console.log("connect successful")
    return pool});
//xuất ra dưới dạng module gồm 2 thuộc tính là conn và sql
module.exports ={
    conn: conn,
    sql: sql
}