const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ========================================
// REGISTER
// ========================================

const register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phoneNumber,
            password
        } = req.body;

        // Check required fields
        if (
            !fullName ||
            !email ||
            !phoneNumber ||
            !password
        ) {
            return res.status(400).json({
                message: "Please complete all required fields."
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create user
        const user = await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Account created successfully.",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        });

    } catch (error) {
        console.error(
            "Registration Error:",
            error
        );

        res.status(500).json({
            message: "Server error during registration."
        });
    }
};

// ========================================
// LOGIN
// ========================================

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required."
            });
        }

        // Find user
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        });

    } catch (error) {
        console.error(
            "Login Error:",
            error
        );

        res.status(500).json({
            message: "Server error during login."
        });
    }
};

module.exports = {
    register,
    login
};