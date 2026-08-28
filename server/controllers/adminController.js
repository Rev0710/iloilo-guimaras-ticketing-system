const bcrypt = require("bcryptjs");
const Staff = require("../models/Staff");


// =========================================================
// CREATE STAFF ACCOUNT
// =========================================================
// Admin creates a staff account that can be used to log in
// to the Staff Dashboard and Scanner.
// =========================================================

const createStaff = async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;


        // =====================================================
        // VALIDATION
        // =====================================================

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email, and password are required."
            });
        }


        // =====================================================
        // NORMALIZE EMAIL
        // =====================================================

        const normalizedEmail =
            email.trim().toLowerCase();


        // =====================================================
        // PASSWORD LENGTH
        // =====================================================

        if (password.length < 6) {

            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters."
            });
        }


        // =====================================================
        // CHECK EXISTING STAFF
        // =====================================================

        const existingStaff =
            await Staff.findOne({
                email: normalizedEmail
            });


        if (existingStaff) {

            return res.status(409).json({
                success: false,
                message:
                    "A staff account with this email already exists."
            });
        }


        // =====================================================
        // CREATE STAFF
        // =====================================================
        // The Staff model already hashes the password using
        // its pre-save middleware.
        // =====================================================

        const staff =
            await Staff.create({

                name:
                    name.trim(),

                email:
                    normalizedEmail,

                password:
                    password,

                role:
                    "staff",

                isActive:
                    true
            });


        // =====================================================
        // RESPONSE
        // =====================================================

        return res.status(201).json({

            success: true,

            message:
                "Staff account created successfully.",

            staff: {

                id:
                    staff._id,

                name:
                    staff.name,

                email:
                    staff.email,

                role:
                    staff.role,

                isActive:
                    staff.isActive
            }
        });


    } catch (error) {

        console.error(
            "Create staff error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to create staff account."
        });
    }
};



// =========================================================
// GET ALL STAFF
// =========================================================
// Admin can see all staff accounts.
// =========================================================

const getAllStaff = async (req, res) => {

    try {

        const staff =
            await Staff.find()
                .select("-password")
                .sort({
                    createdAt: -1
                });


        return res.status(200).json({

            success: true,

            staff

        });


    } catch (error) {

        console.error(
            "Get all staff error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve staff accounts."
        });
    }
};



// =========================================================
// GET STAFF BY ID
// =========================================================

const getStaffById = async (req, res) => {

    try {

        const staff =
            await Staff.findById(
                req.params.id
            ).select("-password");


        if (!staff) {

            return res.status(404).json({

                success: false,

                message:
                    "Staff account not found."
            });
        }


        return res.status(200).json({

            success: true,

            staff

        });


    } catch (error) {

        console.error(
            "Get staff error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve staff account."
        });
    }
};



// =========================================================
// UPDATE STAFF
// =========================================================
// Admin can update staff name, email, password and status.
// =========================================================

const updateStaff = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            isActive
        } = req.body;


        const staff =
            await Staff.findById(
                req.params.id
            );


        if (!staff) {

            return res.status(404).json({

                success: false,

                message:
                    "Staff account not found."
            });
        }


        // =====================================================
        // UPDATE NAME
        // =====================================================

        if (name !== undefined) {

            if (!name.trim()) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Staff name cannot be empty."
                });
            }

            staff.name =
                name.trim();
        }


        // =====================================================
        // UPDATE EMAIL
        // =====================================================

        if (email !== undefined) {

            const normalizedEmail =
                email.trim().toLowerCase();


            if (!normalizedEmail) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Staff email cannot be empty."
                });
            }


            const emailExists =
                await Staff.findOne({

                    email:
                        normalizedEmail,

                    _id: {
                        $ne:
                            staff._id
                    }

                });


            if (emailExists) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Another staff account is already using this email."
                });
            }


            staff.email =
                normalizedEmail;
        }


        // =====================================================
        // UPDATE PASSWORD
        // =====================================================

        if (password !== undefined) {

            if (password.length < 6) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must be at least 6 characters."
                });
            }


            // Staff model pre-save middleware will hash it.
            staff.password =
                password;
        }


        // =====================================================
        // UPDATE ACTIVE STATUS
        // =====================================================

        if (isActive !== undefined) {

            staff.isActive =
                Boolean(isActive);
        }


        await staff.save();


        return res.status(200).json({

            success: true,

            message:
                "Staff account updated successfully.",

            staff: {

                id:
                    staff._id,

                name:
                    staff.name,

                email:
                    staff.email,

                role:
                    staff.role,

                isActive:
                    staff.isActive
            }
        });


    } catch (error) {

        console.error(
            "Update staff error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to update staff account."
        });
    }
};



// =========================================================
// DEACTIVATE STAFF
// =========================================================
// Instead of deleting the account, we deactivate it.
// This keeps the staff record in the database.
// =========================================================

const deactivateStaff = async (req, res) => {

    try {

        const staff =
            await Staff.findById(
                req.params.id
            );


        if (!staff) {

            return res.status(404).json({

                success: false,

                message:
                    "Staff account not found."
            });
        }


        staff.isActive =
            false;


        await staff.save();


        return res.status(200).json({

            success: true,

            message:
                "Staff account deactivated successfully.",

            staff: {

                id:
                    staff._id,

                name:
                    staff.name,

                email:
                    staff.email,

                role:
                    staff.role,

                isActive:
                    staff.isActive
            }
        });


    } catch (error) {

        console.error(
            "Deactivate staff error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to deactivate staff account."
        });
    }
};



// =========================================================
// ACTIVATE STAFF
// =========================================================

const activateStaff = async (req, res) => {

    try {

        const staff =
            await Staff.findById(
                req.params.id
            );


        if (!staff) {

            return res.status(404).json({

                success: false,

                message:
                    "Staff account not found."
            });
        }


        staff.isActive =
            true;


        await staff.save();


        return res.status(200).json({

            success: true,

            message:
                "Staff account activated successfully.",

            staff: {

                id:
                    staff._id,

                name:
                    staff.name,

                email:
                    staff.email,

                role:
                    staff.role,

                isActive:
                    staff.isActive
            }
        });


    } catch (error) {

        console.error(
            "Activate staff error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to activate staff account."
        });
    }
};



// =========================================================
// DELETE STAFF
// =========================================================
// Permanent deletion.
// Normally, deactivation is safer, but this endpoint is
// available for admin management.
// =========================================================

const deleteStaff = async (req, res) => {

    try {

        const staff =
            await Staff.findByIdAndDelete(
                req.params.id
            );


        if (!staff) {

            return res.status(404).json({

                success: false,

                message:
                    "Staff account not found."
            });
        }


        return res.status(200).json({

            success: true,

            message:
                "Staff account deleted successfully."
        });


    } catch (error) {

        console.error(
            "Delete staff error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to delete staff account."
        });
    }
};



// =========================================================
// EXPORT
// =========================================================

module.exports = {

    createStaff,

    getAllStaff,

    getStaffById,

    updateStaff,

    deactivateStaff,

    activateStaff,

    deleteStaff

};