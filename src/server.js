const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcrypt');
const session=require('express-session');

const session_secret="todolist";

const app=express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"*"
}))

app.use(session({
    secret:session_secret,
    cookie:{maxAge:1*60*60*1000}
}));

//connect with mongodb
const db=mongoose.createConnection("mongodb+srv://user:userpassword@meditation-community-ap.vgg6t.mongodb.net/todoApp?retryWrites=true&w=majority");
app.get('/',(req,res)=>{
    res.send("Welcome to mayur's todo app");
})
app.listen(process.env.PORT,()=>{
    console.log("listening @",process.env.PORT);
})