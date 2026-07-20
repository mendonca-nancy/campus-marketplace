import express from 'express';
import {
    get_listing_by_id,
    get_user_by_id,
    get_all_listings,
    create_user,
    create_listing,
    update_user,
    update_listing,
    delete_listing} from './db.js';//executes db function 
const app=express();
const PORT= process.env.PORT || 8000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("<h1>hello</h1>");
});
app.get('/listings/:id',async (req,res)=>{
    const listing_id=parseInt(req.params.id);
    try{
    const single_listing=await get_listing_by_id(listing_id);
    if(single_listing.length===0){
        return res.status(404).json({ message: "Listing not found" });
    }
    res.json(single_listing);
    }
    catch(error){
        res.status(500).json({ message: "Error fetching listing by id", error: error.message });
    }

});
app.get('/users/:id',async (req,res)=>{
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
});
app.get('/listings',async (req,res)=>{
    try{
        const [listings]=await get_all_listings();
        res.json(listings);
    }
    catch(error){
        res.status(500).json({ message: "Error fetching listings", error: error.message });
    }
});

app.post('/listings',async (req,res)=>{
    const {listing_title,listing_description,listing_price,listing_category,seller_id}=req.body;
    if(!listing_title){
        return res.status(400).json({message:"listing_title is required"});
    }
    if(!listing_price){
        return res.status(400).json({message:"listing_price is required"});
    }
    if(!listing_category){
        return res.status(400).json({message:"listing_category is required"});
    }
    if(!seller_id){
        return res.status(400).json({message:"seller_id is required"});
    }
    try{
        await create_listing(listing_title,listing_description,listing_price,listing_category,seller_id);
        res.status(201).json({ message: "Listing created successfully" });
    }   
    catch(error){
        res.status(500).json({message:"error adding listing",error:error.message});
    }
});

app.post('/users',async (req,res)=>{
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
        await create_user(user_name,password,contact_no);
        res.status(201).json({ message: "User created successfully" });
    }
    catch(error){
        res.status(500).json({message:"error adding user",error:error.message});
    }
});
app.put('/users/:id',async (req,res)=>{
    const user_id=parseInt(req.params.id);
    if (!req.body) {
    return res.status(400).json({ message: "Request body is required" });
    }
    const {user_name,password,contact_no}=req.body;
    if(!user_name && !password && !contact_no){
        return res.status(400).json({message:"atleast one field is required to update"});
    }
    try{

        if(await update_user(user_id,user_name,password,contact_no)){
            res.status(200).json({message:"user updated successfully"});
        }
        else{
            res.status(404).json({message:"User id doesn't exist!"});
        }
    }
    catch(error){
        return res.status(500).json({message:"error updating user",error:error.message});
    }
});

app.put('/listings/:id',async (req,res)=>{
    if (!req.body) {
    return res.status(400).json({ message: "Request body is required" });
    }
    const listing_id=parseInt(req.params.id);
    const {listing_title,listing_description,listing_price,listing_category}=req.body;
    if(!listing_title && !listing_description && !listing_price && !listing_category){
        return res.status(400).json({message:"atleast one field is required to update"});
    }
    try{
        if(await update_listing(listing_id,listing_title,listing_description,listing_price,listing_category)){
            res.status(200).json({message:"listing updated successfully"});
        }
        else{
            res.status(404).json({message:"Listing id doesn't exist!"});
        }
    }
    
    catch(error){
        return res.status(500).json({message:"error updating listing",error:error.message});
    }
});

app.delete('/listings/:id',async (req,res)=>{
    const listing_id=parseInt(req.params.id);
    try{
        if(await delete_listing(listing_id)){
            res.status(200).json({message:"listing deleted successfully"});
        } else {
            res.status(404).json({message:"listing not found"});
        }
    }
    catch(error){
        return res.status(500).json({message:"error deleting listing",error:error.message});
    }
}); 



app.listen(PORT,()=>{
    console.log("server listening on port", PORT);
});
//routes for get and post should be same,consistency in naming is important
//sql delete the row even when is invalid, so we need to check if the row was actually deleted by checking affectedRows
//while updating user or listing ,we don't get error if the id is invalid, so we need to check if the row was actually updated by checking affectedRows
//sql injection,dynamic update
