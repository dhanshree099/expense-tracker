const Expense = require("../models/Expense");

// Show all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user.id
        }).sort({ date: -1 });

        res.render("expenses", {
            expenses
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading expenses");
    }
};


// Add expense
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        const expense = new Expense({
            title,
            amount,
            category,
            date,
            user: req.user.id
        });

        await expense.save();

        res.redirect("/expenses");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding expense");
    }
};


// Show edit page
exports.editExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!expense) {
            return res.send("Expense not found");
        }

        res.render("edit-expense", {
            expense
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
};


// Update expense
exports.updateExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                title,
                amount,
                category,
                date
            }
        );

        res.redirect("/expenses");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating expense");
    }
};


// Delete expense
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        res.redirect("/expenses");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting expense");
    }
};