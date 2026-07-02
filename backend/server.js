import express from 'express';
import {get_listing_by_id, get_listings,get_users} from './db.js';//executes db function 
const app=express();
const PORT= process.env.PORT || 8000;
app.get('/',(req,res)=>{
    res.send("<h1>hello</h1>");
});
app.get('/listings',async (req,res)=>{
    try {
        const listing_table=await get_listings();
        res.json(listing_table);
    } catch (error) {
        res.status(500).json({ message: "Error fetching listings", error: error.message }); //status code 500 means internal server error(database error)
    }
});
app.get('/users',async (req,res)=>{
    try {
        const user_table=await get_users();
        res.json(user_table);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message  });
    }
});
app.get('/listings/:id',async (req,res)=>{
    const listing_id=req.params.id;
    try{
    const single_listing=await get_listing_by_id(listing_id);
    res.json(single_listing);
    }
    catch(error){
        res.status(500).json({ message: "Error fetching listing by id", error: error.message });
    }

});
app.get('/users/:id',async (req,res)=>{
    const user_id=req.params.id;
    try {
        const single_user=await get_user_by_id(user_id);
        res.json(single_user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user by id", error: error.message });
    }
});
app.listen(PORT,()=>{
    console.log("server listening on port", PORT);
});
