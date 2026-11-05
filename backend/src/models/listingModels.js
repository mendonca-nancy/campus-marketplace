async function get_all_listings(){
    try{
        const listings=await pool.query("select * from listings");
        return listings;
    }   
    catch (error) {
        console.error("Error fetching all listings:", error);
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

async function create_listing(title,description,price,category,seller_id){
    await pool.query("insert into listings(title,description,price,category,seller_id) values(?,?,?,?,?);",[title,description,price,category,seller_id]);
}


async function update_listing(listing_id,title,description,price,category){
    const updates = [];
    const values = [];
    if(title!==undefined){
        updates.push("title=?");
        values.push(title);
    }
    if(description!==undefined){
        updates.push("description=?");
        values.push(description);
    }
    if(price!==undefined){
        updates.push("price=?");
        values.push(price);
    }
    if(category!==undefined){
        updates.push("category=?");
        values.push(category);
    }
    values.push(listing_id);
    if(updates.length === 0) {
        throw new Error("No fields to update");
    }
    const sql=`update listings set ${updates.join(',')} where listing_id=?;`;
    const [result]=await pool.query(sql,values);
    return result.affectedRows > 0; // Returns true if a row was updated, false otherwise
}

async function delete_listing(listing_id){
    const [result] = await pool.query("delete from listings where listing_id=?",[listing_id]);
    return result.affectedRows > 0; // Returns true if a row was deleted, false otherwise
}

export { get_listing_by_id, get_all_listings, create_listing, update_listing, delete_listing };