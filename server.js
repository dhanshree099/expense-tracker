const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/expensesDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", userSchema);

const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: String,
    time: String
});

const Expense = mongoose.model("Expense", expenseSchema);


// Home
app.get("/", (req, res) => {
    res.redirect("/signup");
});


// Signup Page
app.get("/signup", (req, res) => {
    res.render("signup");
});


// Signup Logic
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({
        username,
        password
    });

    await newUser.save();

    res.redirect("/login");
});


// Login Page
app.get("/login", (req, res) => {
    res.render("login");
});


// Login Logic
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        username,
        password
    });

    if (user) {
        res.redirect("/dashboard");
    } else {
        res.send("Invalid Login");
    }
});


// Dashboard
app.get("/dashboard", async (req, res) => {
    const expenses = await Expense.find();

    res.render("dashboard", {
        expenses
    });
});


// Add Page
app.get("/add", (req, res) => {
    res.render("add-expense");
});
// Add Expense
app.post("/add-expense", async (req, res) => {

    const { name, amount } = req.body;

    const newExpense = new Expense({
        name,
        amount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    });

    await newExpense.save();

    res.redirect("/dashboard");
});


// Edit Expense Page
app.get("/edit-expense/:id", async (req, res) => {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return res.send("Expense not found");
    }

    res.render("edit-expense", {
        expense
    });
});


// Update Expense
app.post("/edit-expense/:id", async (req, res) => {

    const { name, amount } = req.body;

    await Expense.findByIdAndUpdate(
        req.params.id,
        {
            name: name,
            amount: amount
        }
    );

    res.redirect("/dashboard");
});


// Delete Expense
app.post("/delete-expense/:id", async (req, res) => {

    await Expense.findByIdAndDelete(req.params.id);

    res.redirect("/dashboard");
});


// Logout
app.get("/logout", (req, res) => {
    res.redirect("/login");
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
