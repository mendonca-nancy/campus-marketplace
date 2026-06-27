import mysql from 'mysql2/promise';
try{
    const pool=await mysql.createPool({
        host:'localhost',
        user:'root',
        password:'968656',
        database:'campus_marketplace'
    
    });
    const listing_table= await pool.query("SELECT * FROM listing");
    console.log(listing_table[0]);
    const user_table=await pool.query("SELECT * FROM USER");
    console.log(user_table[0]);
}
catch{
    console.log("error");
}
function get_listings(){
    return listing_table[0];
}
function get_users(){
    return user_table[0];
}


































0