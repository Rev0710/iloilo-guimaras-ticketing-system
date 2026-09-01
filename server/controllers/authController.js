const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ========================================
// CREATE TOKEN
// ========================================

const createToken = (user) => {
    return jwt.sign(
        {
            userId: user._id.toString(),
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};


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

        if (
            typeof fullName !== "string" ||
            typeof email !== "string" ||
            typeof phoneNumber !== "string" ||
            typeof password !== "string" ||
            !fullName.trim() ||
            !email.trim() ||
            !phoneNumber.trim() ||
            !password
        ) {
            return res.status(400).json({
                message:
                    "Please complete all required fields."
            });
        }

        // Password length validation
        if (password.length < 8) {
            return res.status(400).json({
                message:
                    "Password must contain at least 8 characters."
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        // Check existing email
        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });

        if (existingUser) {
            return res.status(409).json({
                message:
                    "Email is already registered."
            });
        }

        // Hash password
        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        // Create user
        const user = await User.create({
            fullName:
                fullName.trim(),

            email:
                normalizedEmail,

            phoneNumber:
                phoneNumber.trim(),

            password:
                hashedPassword
        });

        return res.status(201).json({
            message:
                "Account created successfully.",

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

        return res.status(500).json({
            message:
                "Server error during registration."
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

        // ========================================
        // BASIC VALIDATION
        // ========================================

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message:
                    "Email and password are required."
            });
        }

        // ========================================
        // NORMALIZE EMAIL
        // ========================================

        const normalizedEmail =
            email.trim().toLowerCase();

        // ========================================
        // FIND USER
        // ========================================

        const user =
            await User.findOne({
                email: normalizedEmail
            });

        // ========================================
        // USER NOT FOUND
        // ========================================

        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid email or password."
            });
        }

        // ========================================
        // PASSWORD VALIDATION
        // ========================================

        if (
            typeof user.password !== "string" ||
            !user.password
        ) {
            return res.status(401).json({
                message:
                    "Invalid email or password."
            });
        }

        // ========================================
        // MAKE SURE PASSWORD IS A BCRYPT HASH
        // ========================================

        const isBcryptHash =
            /^\$2[aby]\$\d{2}\$/.test(
                user.password
            );

        if (!isBcryptHash) {
            console.error(
                `Login rejected: password for ${normalizedEmail} is not stored as a bcrypt hash.`
            );

            return res.status(401).json({
                message:
                    "Invalid email or password."
            });
        }

        // ========================================
        // COMPARE PASSWORD
        // ========================================

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        // ========================================
        // REJECT WRONG PASSWORD
        // ========================================

        if (!passwordMatch) {
            return res.status(401).json({
                message:
                    "Invalid email or password."
            });
        }

        // ========================================
        // CREATE JWT
        // ========================================

        const token =
            createToken(user);

        // ========================================
        // LOGIN SUCCESS
        // ========================================

        return res.status(200).json({
            message:
                "Login successful.",

            token,

            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber:
                    user.phoneNumber
            }
        });

    } catch (error) {

        console.error(
            "Login Error:",
            error
        );

        return res.status(500).json({
            message:
                "Server error during login."
        });
    }
};


// ========================================
// GET CURRENT USER
// ========================================

const getMe = async (req, res) => {
    try {

        const userId =
            req.user.userId;

        const user =
            await User.findById(userId)
                .select("-password");

        if (!user) {
            return res.status(404).json({
                message:
                    "User account not found."
            });
        }

        return res.status(200).json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber:
                    user.phoneNumber
            }
        });

    } catch (error) {

        console.error(
            "Get Current User Error:",
            error
        );

        return res.status(500).json({
            message:
                "Server error while getting user information."
        });
    }
};


// ========================================
// UPDATE PROFILE
// ========================================

const updateProfile = async (req, res) => {
    try {

        const userId =
            req.user.userId;

        const {
            fullName,
            email,
            phoneNumber
        } = req.body;

        // Validation
        if (
            typeof fullName !== "string" ||
            typeof email !== "string" ||
            typeof phoneNumber !== "string" ||
            !fullName.trim() ||
            !email.trim() ||
            !phoneNumber.trim()
        ) {
            return res.status(400).json({
                message:
                    "Full name, email and phone number are required."
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        // Check duplicate email
        const existingUser =
            await User.findOne({
                email: normalizedEmail,

                _id: {
                    $ne: userId
                }
            });

        if (existingUser) {
            return res.status(409).json({
                message:
                    "That email address is already being used by another account."
            });
        }

        // Update MongoDB
        const user =
            await User.findByIdAndUpdate(
                userId,
                {
                    fullName:
                        fullName.trim(),

                    email:
                        normalizedEmail,

                    phoneNumber:
                        phoneNumber.trim()
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            );

        if (!user) {
            return res.status(404).json({
                message:
                    "User account not found."
            });
        }

        // Generate a new token because email
        // may have changed.
        const token =
            createToken(user);

        return res.status(200).json({
            message:
                "Profile updated successfully.",

            token,

            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber:
                    user.phoneNumber
            }
        });

    } catch (error) {

        console.error(
            "Update Profile Error:",
            error
        );

        return res.status(500).json({
            message:
                "Server error while updating profile."
        });
    }
};


// ========================================
// CHANGE PASSWORD
// ========================================

const changePassword = async (req, res) => {
    try {

        const userId =
            req.user.userId;

        const {
            currentPassword,
            newPassword
        } = req.body;

        // Validation
        if (
            typeof currentPassword !== "string" ||
            typeof newPassword !== "string" ||
            !currentPassword ||
            !newPassword
        ) {
            return res.status(400).json({
                message:
                    "Current password and new password are required."
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                message:
                    "New password must contain at least 8 characters."
            });
        }

        // Find user
        const user =
            await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message:
                    "User account not found."
            });
        }

        // Make sure stored password is bcrypt
        const isBcryptHash =
            typeof user.password === "string" &&
            /^\$2[aby]\$\d{2}\$/.test(
                user.password
            );

        if (!isBcryptHash) {
            return res.status(401).json({
                message:
                    "Password verification failed."
            });
        }

        // Verify OLD password
        const currentPasswordMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!currentPasswordMatch) {
            return res.status(401).json({
                message:
                    "Current password is incorrect."
            });
        }

        // Prevent same password
        const samePassword =
            await bcrypt.compare(
                newPassword,
                user.password
            );

        if (samePassword) {
            return res.status(400).json({
                message:
                    "Your new password must be different from your current password."
            });
        }

        // Hash NEW password
        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        // SAVE NEW PASSWORD TO MONGODB
        user.password =
            hashedPassword;

        await user.save();

        // Create fresh token
        const token =
            createToken(user);

        return res.status(200).json({
            message:
                "Password updated successfully.",

            token
        });

    } catch (error) {

        console.error(
            "Change Password Error:",
            error
        );

        return res.status(500).json({
            message:
                "Server error during password change."
        });
    }
};


// ========================================
// EXPORT
// ========================================

module.exports = {
    register,
    login,
    getMe,
    updateProfile,
    changePassword
};