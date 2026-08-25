import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check password confirmation
        if (
            formData.password !==
            formData.confirmPassword
        ) {
            alert("Passwords do not match.");
            return;
        }

        // Check terms
        if (!formData.agreeTerms) {
            alert(
                "Please agree to the Terms of Service and Privacy Policy."
            );
            return;
        }

        try {
            setLoading(true);

            /*
             * BACKEND CONNECTION
             * Keep this endpoint connected to your server.
             */
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        fullName:
                            formData.fullName,

                        email:
                            formData.email,

                        phoneNumber:
                            formData.phoneNumber,

                        password:
                            formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Registration failed."
                );

                return;
            }

            alert(
                "Account created successfully! You can now sign in."
            );

            // Clear form
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                agreeTerms: false,
            });

            // Navigate to Login
            navigate("/login");

        } catch (error) {
            console.error(
                "Registration Error:",
                error
            );

            alert(
                "Unable to connect to the server. Please make sure the backend is running."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`

                /* =========================================
                   RESET
                ========================================= */

                * {
                    box-sizing: border-box;
                }

                html,
                body,
                #root {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    min-height: 100%;
                }

                body {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    background: #f7f7f7;

                    color: #111;
                }


                /* =========================================
                   PAGE
                ========================================= */

                .register-page {
                    width: 100%;

                    min-height: 100vh;
                    min-height: 100dvh;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    padding: 30px;

                    background:
                        linear-gradient(
                            135deg,
                            #fffaf7 0%,
                            #f7f7f7 50%,
                            #f8fff5 100%
                        );
                }


                /* =========================================
                   MAIN CONTAINER
                ========================================= */

                .register-container {
                    position: relative;

                    width: 100%;

                    max-width: 1100px;

                    background: #ffffff;

                    border: 1px solid #dedede;

                    border-radius: 10px;

                    overflow: hidden;

                    box-shadow:
                        0 15px 45px
                        rgba(0, 0, 0, 0.08);

                    display: flex;

                    flex-direction: column;

                    align-items: center;
                }


                /* =========================================
                   BACK BUTTON
                ========================================= */

                .register-back-button {
                    position: absolute;

                    top: 20px;
                    left: 20px;

                    width: 38px;
                    height: 38px;

                    border: 1px solid #e4e4e4;

                    border-radius: 50%;

                    background: #ffffff;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    font-size: 20px;

                    color: #444;

                    cursor: pointer;

                    z-index: 10;

                    transition:
                        0.2s ease;
                }

                .register-back-button:hover {
                    color: #ff7818;

                    border-color: #ff7818;

                    transform:
                        translateX(-2px);
                }


                /* =========================================
                   LOGO HEADER
                ========================================= */

                .register-logo-header {
                    width:
                        calc(100% - 70px);

                    min-height: 78px;

                    margin-top: 80px;

                    padding: 10px 20px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #fff4ed,
                            #fff9f5
                        );

                    border:
                        1px solid #f5dfd3;

                    border-radius: 8px;
                }


                /* =========================================
                   LOGO IMAGE
                ========================================= */

                .register-logo-image {
                    width: 58px;

                    height: 58px;

                    object-fit: contain;

                    display: block;
                }


                /* =========================================
                   CONTENT
                ========================================= */

                .register-content {
                    width: 100%;

                    display: flex;

                    flex-direction: column;

                    align-items: center;

                    padding:
                        30px
                        20px
                        45px;
                }


                /* =========================================
                   HEADING
                ========================================= */

                .register-heading {
                    width: 100%;

                    max-width: 440px;

                    text-align: center;

                    margin-bottom: 24px;
                }

                .register-heading h1 {
                    margin: 0;

                    font-size: 28px;

                    line-height: 1.2;

                    font-weight: 600;

                    color: #111;
                }

                .register-heading p {
                    margin:
                        9px 0 0;

                    font-size: 13px;

                    line-height: 1.5;

                    color: #777;
                }


                /* =========================================
                   FORM
                ========================================= */

                .register-form {
                    width: 100%;

                    max-width: 430px;

                    padding: 26px;

                    background: #ffffff;

                    border:
                        1px solid #dedede;

                    border-radius: 8px;

                    box-shadow:
                        0 8px 25px
                        rgba(0, 0, 0, 0.04);
                }


                /* =========================================
                   FORM GROUP
                ========================================= */

                .register-form-group {
                    width: 100%;

                    margin-bottom: 16px;
                }

                .register-form-group label {
                    display: block;

                    margin-bottom: 7px;

                    font-size: 12px;

                    font-weight: 600;

                    color: #333;
                }

                .register-form-group input {
                    width: 100%;

                    height: 43px;

                    padding:
                        9px 12px;

                    border:
                        1px solid #d5d5d5;

                    border-radius: 5px;

                    outline: none;

                    background: #ffffff;

                    font-size: 12px;

                    color: #222;

                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .register-form-group input::placeholder {
                    color: #aaa;
                }

                .register-form-group input:focus {
                    border-color:
                        #ff7818;

                    box-shadow:
                        0 0 0 3px
                        rgba(
                            255,
                            120,
                            24,
                            0.10
                        );
                }


                /* =========================================
                   TERMS
                ========================================= */

                .register-terms {
                    width: 100%;

                    display: flex;

                    align-items: flex-start;

                    gap: 9px;

                    margin:
                        4px 0 20px;

                    font-size: 11px;

                    line-height: 1.5;

                    color: #777;

                    cursor: pointer;
                }

                .register-terms input {
                    width: 15px;
                    height: 15px;

                    margin:
                        1px 0 0;

                    flex-shrink: 0;

                    accent-color:
                        #ff7818;

                    cursor: pointer;
                }

                .register-terms a {
                    color:
                        #ff7818;

                    text-decoration: none;

                    font-weight: 500;
                }

                .register-terms a:hover {
                    text-decoration: underline;
                }


                /* =========================================
                   CREATE ACCOUNT BUTTON
                ========================================= */

                .register-primary-button {
                    width: 100%;

                    height: 44px;

                    border: none;

                    border-radius: 5px;

                    background:
                        linear-gradient(
                            135deg,
                            #ff7818,
                            #ff941f
                        );

                    color: #ffffff;

                    font-size: 13px;

                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        0.2s ease;
                }

                .register-primary-button:hover {
                    background:
                        linear-gradient(
                            135deg,
                            #f46e0c,
                            #ff8614
                        );

                    transform:
                        translateY(-1px);

                    box-shadow:
                        0 6px 15px
                        rgba(
                            255,
                            120,
                            24,
                            0.20
                        );
                }

                .register-primary-button:active {
                    transform:
                        translateY(0);
                }

                .register-primary-button:disabled {
                    opacity: 0.65;

                    cursor:
                        not-allowed;

                    transform: none;

                    box-shadow: none;
                }


                /* =========================================
                   DIVIDER
                ========================================= */

                .register-divider {
                    width: 100%;

                    max-width: 430px;

                    display: flex;

                    align-items: center;

                    gap: 12px;

                    margin:
                        20px 0 14px;

                    color: #999;

                    font-size: 10px;
                }

                .register-divider::before,
                .register-divider::after {
                    content: "";

                    flex: 1;

                    height: 1px;

                    background:
                        #e5e5e5;
                }

                .register-divider span {
                    white-space: nowrap;
                }


                /* =========================================
                   SOCIAL LOGIN
                ========================================= */

                .register-social-login {
                    width: 100%;

                    max-width: 430px;

                    display: flex;

                    gap: 10px;
                }

                .register-social-button {
                    flex: 1;

                    min-height: 43px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 9px;

                    border:
                        1px solid #dcdcdc;

                    border-radius: 5px;

                    background: #ffffff;

                    color: #333;

                    font-size: 11px;

                    font-weight: 500;

                    cursor: pointer;

                    transition:
                        0.2s ease;
                }

                .register-social-button:hover {
                    background: #fafafa;

                    border-color:
                        #ff7818;

                    transform:
                        translateY(-1px);

                    box-shadow:
                        0 4px 12px
                        rgba(
                            0,
                            0,
                            0,
                            0.06
                        );
                }

                .register-social-icon {
                    width: 19px;

                    height: 19px;

                    flex-shrink: 0;
                }

                .register-apple-icon {
                    color: #111;

                    font-size: 19px;
                }


                /* =========================================
                   LOGIN SECTION
                ========================================= */

                .register-login-section {
                    text-align: center;

                    margin-top: 25px;
                }

                .register-login-text {
                    margin: 0 0 7px;

                    font-size: 11px;

                    color: #777;
                }

                .register-login-link {
                    color:
                        #ff7818;

                    font-size: 12px;

                    font-weight: 600;

                    text-decoration: none;
                }

                .register-login-link:hover {
                    text-decoration: underline;
                }


                /* =========================================
                   FOOTER
                ========================================= */

                .register-footer {
                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 28px;

                    margin-top: 30px;

                    font-size: 9px;

                    color: #aaa;
                }

                .register-footer span {
                    cursor: pointer;

                    transition:
                        color 0.2s ease;
                }

                .register-footer span:hover {
                    color:
                        #ff7818;
                }


                /* =========================================
                   TABLET
                ========================================= */

                @media (max-width: 768px) {

                    .register-page {
                        padding: 20px;
                    }

                    .register-container {
                        border-radius: 8px;
                    }

                    .register-logo-header {
                        width:
                            calc(100% - 40px);

                        margin-top: 25px;
                    }

                    .register-content {
                        padding:
                            28px
                            18px
                            35px;
                    }

                    .register-form {
                        max-width: 500px;
                    }

                    .register-divider,
                    .register-social-login {
                        max-width: 500px;
                    }
                }


                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 480px) {

                    .register-page {
                        padding: 0;

                        align-items:
                            stretch;
                    }

                    .register-container {
                        width: 100%;

                        min-height: 100vh;
                        min-height: 100dvh;

                        border: none;

                        border-radius: 0;

                        box-shadow: none;
                    }

                    .register-back-button {
                        top: 14px;

                        left: 12px;

                        width: 35px;

                        height: 35px;

                        font-size: 19px;
                    }

                    .register-logo-header {
                        width:
                            calc(100% - 30px);

                        min-height: 70px;

                        margin-top: 55px;
                    }

                    .register-logo-image {
                        width: 52px;

                        height: 52px;
                    }

                    .register-content {
                        padding:
                            28px
                            15px
                            30px;
                    }

                    .register-heading {
                        margin-bottom: 20px;
                    }

                    .register-heading h1 {
                        font-size: 24px;
                    }

                    .register-heading p {
                        font-size: 11px;
                    }

                    .register-form {
                        max-width: 100%;

                        padding: 20px;
                    }

                    .register-form-group {
                        margin-bottom: 15px;
                    }

                    .register-form-group label {
                        font-size: 11px;
                    }

                    .register-form-group input {
                        height: 42px;

                        font-size: 12px;
                    }

                    .register-terms {
                        font-size: 10px;
                    }

                    .register-primary-button {
                        height: 43px;
                    }

                    .register-social-login {
                        max-width: 100%;

                        flex-direction: column;

                        gap: 8px;
                    }

                    .register-social-button {
                        width: 100%;

                        min-height: 42px;

                        font-size: 11px;
                    }

                    .register-footer {
                        gap: 18px;

                        margin-top: 25px;
                    }
                }


                /* =========================================
                   VERY SMALL PHONES
                ========================================= */

                @media (max-width: 360px) {

                    .register-content {
                        padding-left: 12px;
                        padding-right: 12px;
                    }

                    .register-form {
                        padding: 17px;
                    }

                    .register-footer {
                        gap: 13px;

                        font-size: 8px;
                    }
                }

            `}</style>


            <main className="register-page">

                <div className="register-container">

                    {/* BACK BUTTON */}

                    <button
                        type="button"
                        className="register-back-button"
                        onClick={() => navigate("/Login")}
                        aria-label="Go back"
                    >
                        ←
                    </button>


                    {/* LOGO */}

                    <div className="register-logo-header">

                        <img
                            src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=5YAYdBsPCPsQ7kNvwFjUQYD&_nc_oc=AdopjluXYgdM2PJ8fX0nZpqhgigmZIdAXn-EqtGpshgBSbu7e-3fcxU80OS6Uw2EUG4&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7b2a8&oh=03_Q7cD6AFe_qZAOzICc2LJwC4u6B7mGN18VWGAWNhvIK8bMYGWLg&oe=6AB47416"
                            alt="GuimarasGo Logo"
                            className="register-logo-image"
                        />

                    </div>


                    {/* CONTENT */}

                    <div className="register-content">

                        {/* HEADING */}

                        <div className="register-heading">

                            <h1>
                                Create Account
                            </h1>

                            <p>
                                Create your account to reserve
                                your ferry trip.
                            </p>

                        </div>


                        {/* REGISTRATION FORM */}

                        <form
                            className="register-form"
                            onSubmit={handleSubmit}
                        >

                            {/* FULL NAME */}

                            <div className="register-form-group">

                                <label htmlFor="fullName">
                                    Full Name
                                </label>

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="register-form-group">

                                <label htmlFor="registerEmail">
                                    Email Address
                                </label>

                                <input
                                    id="registerEmail"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />

                            </div>


                            {/* PHONE NUMBER */}

                            <div className="register-form-group">

                                <label htmlFor="phoneNumber">
                                    Phone Number
                                </label>

                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="09XXXXXXXXX"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    autoComplete="tel"
                                    required
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="register-form-group">

                                <label htmlFor="registerPassword">
                                    Password
                                </label>

                                <input
                                    id="registerPassword"
                                    name="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />

                            </div>


                            {/* CONFIRM PASSWORD */}

                            <div className="register-form-group">

                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />

                            </div>


                            {/* TERMS */}

                            <label className="register-terms">

                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={
                                        formData.agreeTerms
                                    }
                                    onChange={handleChange}
                                />

                                <span>
                                    I agree to the{" "}
                                    <a
                                        href="#terms"
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#privacy"
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    >
                                        Privacy Policy
                                    </a>.
                                </span>

                            </label>


                            {/* CREATE ACCOUNT */}

                            <button
                                type="submit"
                                className="register-primary-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                        </form>


                        {/* DIVIDER */}

                        <div className="register-divider">

                            <span>
                                Or continue with
                            </span>

                        </div>


                        {/* SOCIAL REGISTRATION */}

                        <div className="register-social-login">

                            <button
                                type="button"
                                className="register-social-button"
                                onClick={() =>
                                    alert(
                                        "Google registration will be added later."
                                    )
                                }
                            >
                                <FcGoogle
                                    className="register-social-icon"
                                />

                                <span>
                                    Continue with Google
                                </span>

                            </button>


                            <button
                                type="button"
                                className="register-social-button"
                                onClick={() =>
                                    alert(
                                        "Apple registration will be added later."
                                    )
                                }
                            >
                                <FaApple
                                    className="register-social-icon register-apple-icon"
                                />

                                <span>
                                    Continue with Apple
                                </span>

                            </button>

                        </div>


                        {/* LOGIN */}

                        <div className="register-login-section">

                            <p className="register-login-text">
                                Already have an account?
                            </p>

                            <Link
                                to="/login"
                                className="register-login-link"
                            >
                                Sign In
                            </Link>

                        </div>


                        {/* FOOTER */}

                        <div className="register-footer">

                            <span>
                                Privacy Policy
                            </span>

                            <span>
                                Terms of Service
                            </span>

                            <span>
                                Help Center
                            </span>

                        </div>

                    </div>

                </div>

            </main>
        </>
    );
};

export default Register;