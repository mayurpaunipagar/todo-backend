import express from 'express';
const app=express();
app.get('/',(req,res)=>{
    res.send("hello world!");
})
app.listen(9999,()=>{
    console.log("listening @ 9999");
})