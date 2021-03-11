const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.send("Welcome to mayur's todo app");
})
app.listen(9999,()=>{
    console.log("listening @ 9999");
})