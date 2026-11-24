import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
console.log("User:", process.env.DB_USER);
console.log("Host:", process.env.DB_HOST);
const pool=await mysql.createPool({
    host:process.env.DB_HOST ,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

export { pool };
 


