const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const staffSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            default: "staff",
            enum: ["staff"],
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


// =========================================================
// HASH PASSWORD BEFORE SAVING
// =========================================================

staffSchema.pre("save", async function () {

    // If password was not changed,
    // do not hash it again.
    if (!this.isModified("password")) {
        return;
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    this.password = await bcrypt.hash(
        this.password,
        salt
    );
});


// =========================================================
// COMPARE ENTERED PASSWORD WITH HASHED PASSWORD
// =========================================================

staffSchema.methods.comparePassword = async function (
    enteredPassword
) {

    return bcrypt.compare(
        enteredPassword,
        this.password
    );
};


// =========================================================
// EXPORT MODEL
// =========================================================

module.exports = mongoose.model(
    "Staff",
    staffSchema
);