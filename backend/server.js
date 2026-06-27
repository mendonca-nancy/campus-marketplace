import express from 'express';
const app=express();
const PORT= 8000;
app.get('/',()=>{
    res.send(<h1>hello</h1>);
});
app.get('/listing',()={

    res.send();
})
app.listen(PORT,()=>{
    console.log("server listing on ");
});
