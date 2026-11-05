import bcrypt from "bcrypt";
import { get_user_by_id, create_user, update_user } from "../config/db.js";
const getUserById=async (req,res)=>{
    const user_id=parseInt(req.params.id);
    try {
        const single_user=await get_user_by_id(user_id);
        if(single_user.length===0){
            return res.status(404).json({ message: "User not found" });
        }
        res.json(single_user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user by id", error: error.message });
    }
}

const createUser=async (req,res)=>{
    console.log("inside user");
    const {user_name,password,contact_no}=req.body;
    if(!user_name){//cleaner code instead of !req.body.user_name
        return res.status(400).json({message:"user_name is required"});
    }
    if(!password){
        return res.status(400).json({message:"password is required"});
    }
    if((!contact_no) ){
        return res.status(400).json({message:"contact no is required"});
    }
    
    if(Math.abs(contact_no).toString().length!==10){
        return res.status(400).json({message:"contact no should be a 10 digit number"});
    }
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await create_user(user_name,hashedPassword,contact_no);
        res.status(201).json({ message: "User created successfully" });
    }
    catch(error){
        res.status(500).json({message:"error adding user",error:error.message});
    }
}

const updateUser=async (req,res)=>{
    const user_id=parseInt(req.params.id);
    if (!req.body) {
    return res.status(400).json({ message: "Request body is required" });
    }
    const {user_name,password,contact_no}=req.body;
    if(!user_name && !password && !contact_no){
        return res.status(400).json({message:"atleast one field is required to update"});
    }
    if(Math.abs(contact_no).toString().length!==10 && contact_no){  
        return res.status(400).json({message:"contact no should be a 10 digit number"});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        if(await update_user(user_id,user_name,hashedPassword,contact_no)){
            res.status(200).json({message:"user updated successfully"});
        }
        else{
            res.status(404).json({message:"User id doesn't exist!"});
        }
    }
    catch(error){
        return res.status(500).json({message:"error updating user",error:error.message});
    }
}

export { getUserById, createUser, updateUser };