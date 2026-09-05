const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("User already exists");
        }

        // Password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.redirect("/login");

    } catch (error) {
        console.log(error);
        res.status(500).send("Signup failed");
    }
};


// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Invalid email or password");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Invalid email or password");
        }

        // Create JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true
        });

        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.status(500).send("Login failed");
    }
};


// Logout
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};