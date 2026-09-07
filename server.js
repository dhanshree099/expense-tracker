const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: "expense-secret-key",
        resave: false,
        saveUninitialized: false
    })
);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));




const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);




const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: String,
    time: String,

    userId: mongoose.Schema.Types.ObjectId
});

const Expense = mongoose.model("Expense", expenseSchema);


function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    }

    res.redirect("/login");
}



app.get("/", (req, res) => {
    res.redirect("/signup");
});



app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {

        const { username, password } = req.body;

        const existingUser = await User.findOne({
            username
        });

        if (existingUser) {
            return res.send("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.redirect("/login");

    } catch (err) {
        console.log(err);
        res.send("Signup Error");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({
            username
        });

        if (!user) {
            return res.send("Invalid Login");
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.send("Invalid Login");
        }

        req.session.userId = user._id;

        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.send("Login Error");
    }
});


app.get("/dashboard", isLoggedIn, async (req, res) => {

    try {

        const search = req.query.search || "";

        const expenses = await Expense.find({
            userId: req.session.userId,
            name: {
                $regex: search,
                $options: "i"
            }
        }).sort({
            _id: -1
        });

        const totalExpense = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );

        res.render("dashboard", {
            expenses,
            totalExpense,
            search
        });

    } catch (err) {
        console.log(err);
        res.send("Dashboard Error");
    }
});


app.get("/add", isLoggedIn, (req, res) => {
    res.render("add-expense");
});



app.post("/add-expense", isLoggedIn, async (req, res) => {

    try {

        const { name, amount } = req.body;

        const newExpense = new Expense({
            name,
            amount,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: req.session.userId
        });

        await newExpense.save();

        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.send("Error Adding Expense");
    }
});

app.get("/edit-expense/:id", isLoggedIn, async (req, res) => {

    try {

        const expense = await Expense.findOne({
            _id: req.params.id,
            userId: req.session.userId
        });

        if (!expense) {
            return res.send("Expense Not Found");
        }

        res.render("edit-expense", {
            expense
        });

    } catch (err) {
        console.log(err);
        res.send("Edit Error");
    }
});


app.post("/edit-expense/:id", isLoggedIn, async (req, res) => {

    try {

        const { name, amount } = req.body;

        await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.session.userId
            },
            {
                name,
                amount
            }
        );

        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.send("Update Error");
    }
});


app.post("/delete-expense/:id", isLoggedIn, async (req, res) => {

    try {

        await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.session.userId
        });

        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.send("Delete Error");
    }
});


app.get("/summary", isLoggedIn, async (req, res) => {

    try {

        const expenses = await Expense.find({
            userId: req.session.userId
        });

        const totalExpense = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );

        res.render("summary", {
            expenses,
            totalExpense
        });

    } catch (err) {
        console.log(err);
        res.send("Summary Error");
    }
});



app.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.redirect("/login");
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});
