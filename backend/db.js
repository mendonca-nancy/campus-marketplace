import mysql from 'mysql2/promise';

const pool=await mysql.createPool({
    host:'localhost',
    user:'root',
    password:'968656',
    database:'campus_marketplace'

});


async function get_listings(){
    try{
    const [listings_table]= await pool.query("SELECT * FROM listings");
    console.log(listings_table);
    return listings_table;
} catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
}
}
async function get_users(){
    try{
        const [users_table]= await pool.query("SELECT * FROM USERs");
        console.log(users_table);
        return users_table;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
async function get_listing_by_id(id){
    try{
        const [listing]=await pool.query("select * from listings where listing_id=?",[id]);
        return listing;
    }
    catch (error) {
        console.error("Error fetching listing by id:", error);
        throw error;
    }
}
async function get_user_by_id(id){
    try{
        const [user]=await pool.query("select * from users where user_id=?",[id]);
        return user;
    }
    catch (error) {
        console.error("Error fetching user by id:", error);
        throw error;
    }
}
export {
    get_listings,
    get_users,
    get_listing_by_id
};
