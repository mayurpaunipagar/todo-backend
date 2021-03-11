const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

const session_secret = "todolist";

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "*"
}))

app.use(session({
    secret: session_secret,
    cookie: { maxAge: 1 * 60 * 60 * 1000 }
}));

//connect with mongodb
const db = mongoose.createConnection("mongodb+srv://user:userpassword@meditation-community-ap.vgg6t.mongodb.net/todoApp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//schemas
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
})

const todoSchema = new mongoose.Schema({
    task: String,
    done: Boolean,
    createdAt: Date,
    userId: mongoose.Schema.Types.ObjectId
})
//models
const userModel = db.model("user", userSchema);
const todoModel = db.model("todo", todoSchema);

//backend apis
const isNullOrUndefined = (val) => val === null || val === undefined;
const SALT = 5;

app.post('/signup', async (req, res) => {
    const { userName, password } = req.body;
    const existingUser = await userModel.findOne({ userName });
    if (isNullOrUndefined(existingUser)) {
        //allow sign up
        const hashedPwd = bcrypt.hashSync(password, SALT);
        const newUser = new userModel({ userName, password: hashedPwd });
        await newUser.save();
        req.session.userId = newUser._id;
        res.status(201).send({ success: "Signed up" });
    }else{
        res.status(400).send({
            err:`Username ${userName} already exists. Please choose another.`
        });
    }
});
app.get('/', (req, res) => {
    res.send("Welcome to mayur's todo app");
})
app.listen(process.env.PORT, () => {
    console.log("listening @", process.env.PORT);
})