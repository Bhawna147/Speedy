require("dotenv").config({ path: "./.env" });
const express = require("express");
const cookieparser = require("cookie-parser");
var router = require("express").Router();
const mongoose = require("mongoose");
const User = require("./models/Users");
const app = express();
const cors = require("cors");
// const morgan = require("morgan");
// const loginRoute=require("./routes/login");
// const signupRoute=require("./routes/signup");

app.use(cors({
    origin: "http://localhost:3000",  //no slash(birju comment);
    credentials: true
}));
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}, (err) => {
    if (!err)
        console.log("connected");
    else
        console.log(err);
});

app.post("/login", (req, response) => {
    console.log(req.body.data);
    User.find({ username: req.body.data.username }, (err, res) => {
        if (err)
            console.log(err);
        else {
            console.log(res.length,"a");
            if (res.length == 0)
                {
                    response.send(false);
                }
            else {
                response.cookie("email", req.body.data.email, {
                    sameSite: "lax",
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 100 * 1000)
                }).cookie("auth", true, {
                    sameSite: "lax",
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 100 * 1000)
                }).send(true);
            }
        }
    })
})

app.post("/signup", (req, response) => {

    // console.log(req.body.data);

    User.find({ username: req.body.username }, (err, res) => {
        if (err)
            console.log(err);
        else {
            console.log(res.length, "RES");
            if (res.length != 0)
                response.send(false);
            const newUser = new User({ username: req.body.data.username, email: req.body.data.email, password: req.body.data.password })
            newUser.save();
            response.cookie("email", req.body.data.email, {
                sameSite: "lax",
                httpOnly: true,
                expires: new Date(new Date().getTime() + 100 * 1000)
            }).cookie("auth", true, {
                sameSite: "lax",
                httpOnly: true,
                expires: new Date(new Date().getTime() + 100 * 1000)
            }).send(true);


        }
    });
})

app.get("/logout", (req, res) => {
    res.clearCookie("email");
    res.clearCookie("auth");
    console.log("birju");
    res.send(true);
})

app.get("/isAuth", (req, res) => {
    console.log(req.cookies,"a");
    if (req.cookies !== undefined && req.cookies.auth === 'true') {
        res.send(true);
    }
    else {
        res.send(false);
    }
})


app.listen(process.env.PORT, (req, res) => {
    console.log("port running on " + process.env.PORT);
})