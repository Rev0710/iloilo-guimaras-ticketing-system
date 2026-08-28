import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const StaffLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please enter your email address and password.");
            return;
        }

        try {
            setLoading(true);

            // FIXED: Staff login endpoint
            const response = await api.post("/staff-auth/login", {
                email: email.trim(),
                password,
            });

            const data = response.data;

            /*
             * Store staff authentication information
             */
            if (data.token) {
                if (rememberMe) {
                    localStorage.setItem("staffToken", data.token);
                } else {
                    sessionStorage.setItem("staffToken", data.token);
                }
            }

            if (data.staff) {
                localStorage.setItem(
                    "staff",
                    JSON.stringify(data.staff)
                );
            }

            /*
             * Go to Staff Scanner after successful login
             */
            navigate("/staff/scanner");

        } catch (err) {
            console.error("Staff login error:", err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError(
                    "Unable to sign in. Please check your connection and try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                * {
                    box-sizing: border-box;
                }

                html,
                body,
                #root {
                    margin: 0;
                    width: 100%;
                    min-height: 100%;
                }

                body {
                    font-family: Arial, Helvetica, sans-serif;
                    background: #f5f7fb;
                    color: #111111;
                }

                /* =========================================
                   STAFF LOGIN PAGE
                ========================================= */

                .staff-login-page {
                    min-height: 100vh;
                    width: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #f7f9fc 0%,
                            #eef2f7 100%
                        );

                    padding: 30px 20px;
                }

                /* =========================================
                   MAIN LOGIN CARD
                ========================================= */

                .staff-login-wrapper {
                    position: relative;

                    width: 100%;
                    max-width: 470px;

                    background: #ffffff;

                    border-radius: 14px;

                    padding: 38px 42px 42px;

                    box-shadow:
                        0 15px 45px rgba(0, 0, 0, 0.08);

                    border: 1px solid #e8e8e8;
                }

                /* =========================================
                   BACK BUTTON
                ========================================= */

                .staff-back-button {
                    width: 36px;
                    height: 36px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border: none;
                    background: transparent;

                    color: #333333;

                    font-size: 26px;
                    font-weight: 300;

                    cursor: pointer;

                    margin-bottom: 12px;

                    transition:
                        color 0.2s ease,
                        transform 0.2s ease;
                }

                .staff-back-button:hover {
                    color: #ff7417;
                    transform: translateX(-3px);
                }

                /* =========================================
                   LOGO
                ========================================= */

                .staff-logo-container {
                    width: 100%;
                    height: 95px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background: #fff8f3;

                    border: 1px solid #ffe0cf;

                    border-radius: 8px;

                    margin-bottom: 28px;
                }

                .staff-logo-container img {
                    width: 82px;
                    height: 82px;

                    object-fit: contain;

                    display: block;

                    transition: transform 0.2s ease;
                }

                .staff-logo-container img:hover {
                    transform: scale(1.04);
                }

                /* =========================================
                   HEADER
                ========================================= */

                .staff-login-header {
                    text-align: center;

                    margin-bottom: 28px;
                }

                .staff-login-header h1 {
                    margin: 0 0 8px;

                    font-size: 30px;
                    font-weight: 500;

                    line-height: 1.2;

                    color: #111111;
                }

                .staff-login-header p {
                    margin: 0;

                    font-size: 13px;
                    font-weight: 400;

                    color: #777777;

                    line-height: 1.5;
                }

                /* =========================================
                   FORM
                ========================================= */

                .staff-form-card {
                    width: 100%;
                    max-width: 355px;

                    margin: 0 auto;
                }

                .staff-form {
                    width: 100%;
                }

                /* =========================================
                   INPUT FIELDS
                ========================================= */

                .staff-field {
                    margin-bottom: 19px;
                }

                .staff-field label {
                    display: block;

                    margin-bottom: 8px;

                    color: #222222;

                    font-size: 13px;
                    font-weight: 600;
                }

                .staff-input-wrapper {
                    position: relative;

                    width: 100%;
                }

                .staff-input {
                    width: 100%;
                    height: 43px;

                    padding: 0 13px;

                    border: 1px solid #d6d6d6;

                    border-radius: 6px;

                    outline: none;

                    background: #ffffff;

                    color: #222222;

                    font-size: 13px;

                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .staff-input:hover {
                    border-color: #bdbdbd;
                }

                .staff-input:focus {
                    border-color: #ff7417;

                    background: #ffffff;

                    box-shadow:
                        0 0 0 3px rgba(255, 116, 23, 0.10);
                }

                .staff-input::placeholder {
                    color: #999999;
                }

                .staff-input.password-input {
                    padding-right: 55px;
                }

                /* =========================================
                   SHOW PASSWORD
                ========================================= */

                .show-password-button {
                    position: absolute;

                    top: 50%;
                    right: 10px;

                    transform: translateY(-50%);

                    border: none;

                    background: transparent;

                    color: #777777;

                    font-size: 11px;
                    font-weight: 600;

                    cursor: pointer;

                    padding: 5px 7px;

                    border-radius: 4px;

                    transition:
                        color 0.2s ease,
                        background 0.2s ease;
                }

                .show-password-button:hover {
                    color: #ff7417;

                    background: #fff5ef;
                }

                /* =========================================
                   OPTIONS
                ========================================= */

                .staff-options {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    margin: 2px 0 20px;
                }

                .remember-container {
                    display: flex;
                    align-items: center;

                    gap: 7px;

                    color: #666666;

                    font-size: 11px;

                    cursor: pointer;
                }

                .remember-container input {
                    width: 14px;
                    height: 14px;

                    margin: 0;

                    accent-color: #ff7417;

                    cursor: pointer;
                }

                .staff-role-text {
                    color: #888888;

                    font-size: 11px;
                }

                /* =========================================
                   ERROR
                ========================================= */

                .staff-error {
                    width: 100%;

                    padding: 10px 12px;

                    margin-bottom: 17px;

                    border: 1px solid #f1b8b8;

                    border-radius: 6px;

                    background: #fff5f5;

                    color: #c62828;

                    font-size: 12px;

                    line-height: 1.4;

                    text-align: left;
                }

                /* =========================================
                   SIGN IN BUTTON
                ========================================= */

                .staff-signin-button {
                    width: 100%;
                    height: 43px;

                    border: none;

                    border-radius: 6px;

                    background: #ff7417;

                    color: #ffffff;

                    font-size: 13px;
                    font-weight: 600;

                    cursor: pointer;

                    box-shadow:
                        0 7px 18px rgba(255, 116, 23, 0.20);

                    transition:
                        background 0.2s ease,
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .staff-signin-button:hover:not(:disabled) {
                    background: #f5660b;

                    transform: translateY(-1px);

                    box-shadow:
                        0 10px 23px rgba(255, 116, 23, 0.28);
                }

                .staff-signin-button:active:not(:disabled) {
                    transform: translateY(0);
                }

                .staff-signin-button:disabled {
                    opacity: 0.7;

                    cursor: not-allowed;
                }

                /* =========================================
                   DIVIDER
                ========================================= */

                .staff-divider {
                    display: flex;
                    align-items: center;

                    width: 100%;

                    margin: 25px 0 20px;

                    color: #999999;

                    font-size: 10px;
                }

                .staff-divider::before,
                .staff-divider::after {
                    content: "";

                    flex: 1;

                    height: 1px;

                    background: #e5e5e5;
                }

                .staff-divider span {
                    padding: 0 12px;
                }

                /* =========================================
                   STAFF INFORMATION
                ========================================= */

                .staff-info {
                    width: 100%;

                    padding: 13px 15px;

                    border: 1px solid #e7e7e7;

                    border-radius: 6px;

                    background: #fafafa;

                    text-align: center;

                    color: #777777;

                    font-size: 11px;

                    line-height: 1.5;
                }

                .staff-info strong {
                    color: #444444;

                    font-weight: 600;
                }

                /* =========================================
                   BACK TO HOME
                ========================================= */

                .back-home-button {
                    width: 100%;
                    height: 42px;

                    margin-top: 12px;

                    border: 1px solid #d5d5d5;

                    border-radius: 6px;

                    background: #ffffff;

                    color: #444444;

                    font-size: 12px;

                    cursor: pointer;

                    transition:
                        border-color 0.2s ease,
                        color 0.2s ease,
                        background 0.2s ease;
                }

                .back-home-button:hover {
                    border-color: #ff7417;

                    color: #ff7417;

                    background: #fffaf7;
                }

                /* =========================================
                   TABLET
                ========================================= */

                @media (max-width: 768px) {

                    .staff-login-page {
                        padding: 25px 18px;
                    }

                    .staff-login-wrapper {
                        max-width: 450px;

                        padding: 32px 30px 35px;
                    }

                    .staff-logo-container {
                        height: 90px;

                        margin-bottom: 25px;
                    }

                    .staff-logo-container img {
                        width: 76px;
                        height: 76px;
                    }

                    .staff-login-header h1 {
                        font-size: 28px;
                    }
                }

                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 480px) {

                    .staff-login-page {
                        min-height: 100vh;

                        padding: 20px 15px;
                    }

                    .staff-login-wrapper {
                        max-width: 100%;

                        padding: 28px 22px 30px;

                        border-radius: 12px;
                    }

                    .staff-back-button {
                        margin-bottom: 10px;
                    }

                    .staff-logo-container {
                        height: 82px;

                        margin-bottom: 24px;
                    }

                    .staff-logo-container img {
                        width: 70px;
                        height: 70px;
                    }

                    .staff-login-header {
                        margin-bottom: 24px;
                    }

                    .staff-login-header h1 {
                        font-size: 25px;
                    }

                    .staff-login-header p {
                        font-size: 12px;
                    }

                    .staff-form-card {
                        max-width: 100%;
                    }

                    .staff-input {
                        height: 42px;
                    }

                    .staff-signin-button {
                        height: 42px;
                    }
                }

                /* =========================================
                   VERY SMALL PHONES
                ========================================= */

                @media (max-width: 360px) {

                    .staff-login-page {
                        padding: 12px;
                    }

                    .staff-login-wrapper {
                        padding: 24px 18px 28px;
                    }

                    .staff-logo-container {
                        height: 75px;
                    }

                    .staff-logo-container img {
                        width: 62px;
                        height: 62px;
                    }

                    .staff-login-header h1 {
                        font-size: 23px;
                    }

                    .staff-login-header p {
                        font-size: 11px;
                    }

                    .staff-input,
                    .staff-signin-button,
                    .back-home-button {
                        height: 40px;
                    }
                }
            `}</style>

            <main className="staff-login-page">

                <div className="staff-login-wrapper">

                    {/* BACK BUTTON */}
                    <button
                        type="button"
                        className="staff-back-button"
                        onClick={() => navigate("/")}
                        aria-label="Back to home"
                    >
                        ←
                    </button>


                    {/* LOGO */}
                    <div className="staff-logo-container">

                        <img
                            src="/images/logo.png"
                            alt="GuimarasGo Logo"
                        />

                    </div>


                    {/* HEADER */}
                    <div className="staff-login-header">

                        <h1>
                            Welcome Back
                        </h1>

                        <p>
                            Sign in to your staff account to continue
                        </p>

                    </div>


                    {/* FORM */}
                    <div className="staff-form-card">

                        <form
                            className="staff-form"
                            onSubmit={handleSubmit}
                        >

                            {/* EMAIL */}
                            <div className="staff-field">

                                <label htmlFor="staff-email">
                                    Email Address
                                </label>

                                <input
                                    id="staff-email"
                                    type="email"
                                    className="staff-input"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                    required
                                />

                            </div>


                            {/* PASSWORD */}
                            <div className="staff-field">

                                <label htmlFor="staff-password">
                                    Password
                                </label>

                                <div className="staff-input-wrapper">

                                    <input
                                        id="staff-password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="staff-input password-input"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        autoComplete="current-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="show-password-button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>


                            {/* OPTIONS */}
                            <div className="staff-options">

                                <label className="remember-container">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>

                                <span className="staff-role-text">
                                    Authorized Staff
                                </span>

                            </div>


                            {/* ERROR */}
                            {error && (
                                <div className="staff-error">
                                    {error}
                                </div>
                            )}


                            {/* SIGN IN */}
                            <button
                                type="submit"
                                className="staff-signin-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Signing In..."
                                    : "Sign In"}
                            </button>


                            {/* DIVIDER */}
                            <div className="staff-divider">
                                <span>
                                    Staff Access
                                </span>
                            </div>


                            {/* INFORMATION */}
                            <div className="staff-info">

                                Staff accounts are provided by the
                                system administrator. If you do not
                                have staff credentials, please contact
                                your administrator.

                            </div>


                            {/* BACK HOME */}
                            <button
                                type="button"
                                className="back-home-button"
                                onClick={() =>
                                    navigate("/")
                                }
                            >
                                Back to Home
                            </button>

                        </form>

                    </div>

                </div>

            </main>
        </>
    );
};

export default StaffLogin;