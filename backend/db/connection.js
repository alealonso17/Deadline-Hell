import mysql from "mysql2/promise";
try {
  const connection = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    ssl: {
      rejectUnauthorized: true
    }

  });
  
  console.log("Conection with mysql ok ✔️"); 
  

}catch{
  console.log("Conection with mysql NULL");  
}

export default connection;

