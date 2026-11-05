import { get_all_listings, get_listing_by_id, create_listing, update_listing, delete_listing } from "../config/db.js";
//get all listings
const getAllListing=async (req,res)=>{
    try{
        const [listings]=await get_all_listings();
        res.json(listings);
    }
    catch(error){
        res.status(500).json({ message: "Error fetching listings", error: error.message });
    }
}

//get listing by id, get user by id
const getListingById = async (req, res) => {
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

}

//create listing
const createListing=async (req,res)=>{
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
}

//update listing
const updateListing=async (req,res)=>{
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
}

//delete listing
const deleteListing=async (req,res)=>{
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
}
export {getAllListing,getListingById,createListing,updateListing,deleteListing};