const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");


// =========================================================
// CREATE STAFF TOKEN
// =========================================================

const createStaffToken = (staff) => {

    return jwt.sign(
        {
            staffId: staff._id.toString(),
            name: staff.name,
            email: staff.email,
            role: "staff"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};


// =========================================================
// STAFF LOGIN
// =========================================================

const loginStaff = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required."
            });
        }


        // =================================================
        // NORMALIZE EMAIL
        // =================================================

        const normalizedEmail =
            email.trim().toLowerCase();


        // =================================================
        // FIND STAFF ACCOUNT
        // =================================================

        const staff =
            await Staff.findOne({
                email: normalizedEmail
            });


        if (!staff) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password."
            });
        }


        // =================================================
        // CHECK ACCOUNT STATUS
        // =================================================

        if (!staff.isActive) {

            return res.status(403).json({
                success: false,
                message:
                    "This staff account has been deactivated."
            });
        }


        // =================================================
        // COMPARE PASSWORD
        // =================================================

        const passwordMatch =
            await bcrypt.compare(
                password,
                staff.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password."
            });
        }


        // =================================================
        // CREATE JWT
        // =================================================

        const token =
            createStaffToken(staff);


        // =================================================
        // LOGIN SUCCESS
        // =================================================

        return res.status(200).json({

            success: true,

            message:
                "Staff login successful.",

            token,

            staff: {

                id: staff._id,

                name: staff.name,

                email: staff.email,

                role: staff.role
            }
        });


    } catch (error) {

        console.error(
            "Staff login error:",
            error
        );


        return res.status(500).json({
            success: false,
            message:
                "Server error during staff login."
        });
    }
};


// =========================================================
// GET CURRENT STAFF
// =========================================================

const getCurrentStaff = async (req, res) => {

    try {

        const staffId =
            req.staff.staffId;


        const staff =
            await Staff.findById(
                staffId
            ).select("-password");


        if (!staff) {

            return res.status(404).json({
                success: false,
                message:
                    "Staff account not found."
            });
        }


        if (!staff.isActive) {

            return res.status(403).json({
                success: false,
                message:
                    "This staff account has been deactivated."
            });
        }


        return res.status(200).json({

            success: true,

            staff: {

                id: staff._id,

                name: staff.name,

                email: staff.email,

                role: staff.role,

                isActive:
                    staff.isActive
            }
        });


    } catch (error) {

        console.error(
            "Get current staff error:",
            error
        );


        return res.status(500).json({
            success: false,
            message:
                "Unable to retrieve staff information."
        });
    }
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

    loginStaff,

    getCurrentStaff

};