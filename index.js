require("dotenv").config();
const express=require('express');
const cors = require('cors');
const session = require('express-session');
const flash=require('connect-flash');
const db=require('./models/index');
const app=express();
const messageRouter=require('./routes/message');
const path = require('path');
const mongoose = require('mongoose');
app.use(session({
    secret: 'flashSession',
    resave: false,
    saveUninitialized: true,
  }))
app.use(cors())
app.use(flash());
app.use((req,res,next)=>{
    app.locals.success = req.flash('success');
    app.locals.error = req.flash('error');
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(messageRouter);

//Connecting to MongoDB
db.connectDb();
app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is running at port ${process.env.PORT||3000}`);
})