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

async function create_user(user_name,password,contact_no){
    await pool.query("insert into users(user_name,password,contact_no) values(?,?,?);",[user_name,password,contact_no]);
}

async function update_user(user_id,user_name,password,contact_no){
    const updates = [];
    const values = [];
    if(user_name!==undefined){
        updates.push("user_name=?");
        values.push(user_name);
    }
    if(password!==undefined){
        updates.push("password=?");
        values.push(password);
    }
    if(contact_no!==undefined){
        updates.push("contact_no=?");
        values.push(contact_no);
    }
    values.push(user_id);
    if(updates.length === 0) {
        throw new Error("No fields to update");
    }
    const sql=`update users set ${updates.join(',')} where user_id=?;`;
    const [result] = await pool.query(sql,values);
    return result.affectedRows > 0; // Returns true if a row was updated, false otherwise
}

export { get_user_by_id, create_user, update_user };