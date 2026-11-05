import express from 'express';
import listingRoutes from './src/routes/listingroutes.js';
import userRoutes from './src/routes/userroutes.js';
const app=express();
const PORT= process.env.PORT || 8000;
app.use(express.json());
app.use("/listings",listingRoutes);
app.use("/users",userRoutes);
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});