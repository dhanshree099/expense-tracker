
const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// Dashboard
router.get("/dashboard", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.session.user._id });

  res.render("dashboard", {
    user: req.session.user,
    expenses
  });
});

// Add Expense
router.post("/add", auth, async (req, res) => {
  const { title, amount, category } = req.body;

  await Expense.create({
    userId: req.session.user._id,
    title,
    amount,
    category
  });

  res.redirect("/expenses/dashboard");
});

// Delete Expense
router.get("/delete/:id", auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.redirect("/expenses/dashboard");
});

module.exports = router;