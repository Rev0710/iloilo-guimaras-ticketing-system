import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    // Your logo URL
    const logoUrl =
        "https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=5YAYdBsPCPsQ7kNvwFjUQYD&_nc_oc=AdopjluXYgdM2PJ8fX0nZpqhgigmZIdAXn-EqtGpshgBSbu7e-3fcxU80OS6Uw2EUG4&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7b2a8&oh=03_Q7cD6AFe_qZAOzICc2LJwC4u6B7mGN18VWGAWNhvIK8bMYGWLg&oe=6AB47416";

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed.");
                return;
            }

            // Save JWT token
            if (rememberMe) {
                localStorage.setItem("token", data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            } else {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            alert("Login successful!");

            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);

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

                    background: #ffffff;
                    color: #111111;
                }

                button,
                input {
                    font-family: inherit;
                }


                /* =========================================
                   PAGE
                ========================================= */

                .auth-page {
                    width: 100%;
                    min-height: 100vh;
                    min-height: 100dvh;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 20px;

                    background: #ffffff;
                }


                /* =========================================
                   MAIN CONTAINER
                ========================================= */

                .auth-container {
                    position: relative;

                    width: 100%;
                    max-width: 1100px;

                    min-height: 700px;

                    background: #ffffff;

                    border: 1px solid #dedede;
                    border-radius: 5px;

                    overflow: hidden;

                    display: flex;
                    flex-direction: column;
                }


                /* =========================================
                   BACK BUTTON
                ========================================= */

                .back-button {
                    position: absolute;

                    top: 18px;
                    left: 18px;

                    width: 38px;
                    height: 38px;

                    border: none;
                    background: transparent;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    font-size: 23px;
                    font-weight: 400;

                    color: #333333;

                    cursor: pointer;

                    z-index: 10;

                    transition:
                        color 0.2s ease,
                        transform 0.2s ease;
                }

                .back-button:hover {
                    color: #ff7818;
                    transform: translateX(-2px);
                }


               /* =========================================
   LOGO HEADER
========================================= */

.auth-logo {
    width: calc(100% - 1px);

    height: 68px;

    margin: 50px auto 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(
        90deg,
        #fff7f2 0%,
        #fff2eb 50%,
        #fff7f2 100%
    );

    border: 1px solid #f3ddd2;

    border-radius: 3px;

    position: relative;

    overflow: hidden;
}

/* subtle decorative line */
.auth-logo::after {
    content: "";

    position: absolute;

    bottom: 0;
    left: 8%;

    width: 84%;
    height: 2px;

    background: linear-gradient(
        90deg,
        transparent,
        #ff7818,
        transparent
    );

    opacity: 0.35;
}


/* =========================================
   LOGO IMAGE
========================================= */

.logo-image {
    display: block;

    width: 52px;
    height: 52px;

    object-fit: contain;

    object-position: center;

    position: relative;

    z-index: 2;

    transition:
        transform 0.25s ease,
        filter 0.25s ease;
}

.auth-logo:hover .logo-image {
    transform: scale(1.05);
}


                /* =========================================
                   CONTENT
                ========================================= */

                .auth-content {
                    width: 100%;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    padding:
                        34px
                        20px
                        35px;
                }


                /* =========================================
                   HEADING
                ========================================= */

                .auth-heading {
                    width: 100%;
                    max-width: 400px;

                    text-align: center;

                    margin-bottom: 22px;
                }

                .auth-heading h1 {
                    margin: 0;

                    font-size: 26px;
                    line-height: 1.2;

                    font-weight: 500;

                    color: #111111;
                }

                .auth-heading p {
                    margin: 8px 0 0;

                    font-size: 11px;
                    line-height: 1.5;

                    color: #777777;
                }


                /* =========================================
                   LOGIN FORM
                ========================================= */

                .login-form {
                    width: 100%;
                    max-width: 370px;

                    padding: 24px;

                    background: #ffffff;

                    border: 1px solid #dddddd;

                    border-radius: 5px;
                }


                /* =========================================
                   FORM GROUP
                ========================================= */

                .form-group {
                    width: 100%;

                    margin-bottom: 17px;
                }

                .form-group label {
                    display: block;

                    margin-bottom: 7px;

                    font-size: 12px;
                    font-weight: 500;

                    color: #222222;
                }

                .form-group input {
                    width: 100%;
                    height: 40px;

                    padding: 8px 11px;

                    border: 1px solid #d4d4d4;

                    border-radius: 4px;

                    outline: none;

                    background: #ffffff;

                    font-size: 12px;

                    color: #222222;

                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .form-group input::placeholder {
                    color: #999999;
                }

                .form-group input:focus {
                    border-color: #ff7818;

                    box-shadow:
                        0 0 0 2px
                        rgba(255, 120, 24, 0.1);
                }


                /* =========================================
                   LOGIN OPTIONS
                ========================================= */

                .login-options {
                    width: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 10px;

                    margin-top: -2px;
                    margin-bottom: 18px;
                }

                .remember-option {
                    display: flex;
                    align-items: center;

                    gap: 6px;

                    font-size: 10px;

                    color: #777777;

                    cursor: pointer;
                }

                .remember-option input {
                    width: 13px;
                    height: 13px;

                    margin: 0;

                    accent-color: #ff7818;

                    cursor: pointer;
                }

                .forgot-password {
                    border: none;

                    padding: 0;

                    background: transparent;

                    color: #ff7818;

                    font-size: 10px;

                    cursor: pointer;

                    white-space: nowrap;
                }

                .forgot-password:hover {
                    text-decoration: underline;
                }


                /* =========================================
                   SIGN IN BUTTON
                ========================================= */

                .primary-button {
                    width: 100%;
                    height: 40px;

                    border: none;

                    border-radius: 4px;

                    background: #ff7818;

                    color: #ffffff;

                    font-size: 12px;
                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        background 0.2s ease,
                        transform 0.15s ease;
                }

                .primary-button:hover {
                    background: #f46e0c;
                }

                .primary-button:active {
                    transform: scale(0.99);
                }

                .primary-button:disabled {
                    opacity: 0.65;

                    cursor: not-allowed;
                }


                /* =========================================
                   DIVIDER
                ========================================= */

                .divider {
                    width: 100%;
                    max-width: 370px;

                    display: flex;
                    align-items: center;

                    gap: 12px;

                    margin:
                        18px 0
                        12px;

                    color: #999999;

                    font-size: 10px;
                }

                .divider::before,
                .divider::after {
                    content: "";

                    flex: 1;

                    height: 1px;

                    background: #e6e6e6;
                }

                .divider span {
                    white-space: nowrap;
                }


                /* =========================================
   SOCIAL LOGIN
========================================= */

.social-login {
    width: 100%;
    max-width: 370px;

    display: flex;

    gap: 12px;
}


/* =========================================
   SOCIAL BUTTON
========================================= */

.social-button {
    flex: 1;

    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 9px;

    border: 1px solid #d9d9d9;

    border-radius: 6px;

    background: #ffffff;

    color: #333333;

    font-size: 11px;

    font-weight: 500;

    cursor: pointer;

    position: relative;

    transition:
        background 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.15s ease;
}


/* icon */
.social-button strong {
    width: 20px;
    height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;

    font-weight: 700;
}


/* Google */
.google-button strong {
    color: #4285f4;

    font-family: Arial, sans-serif;
}


/* Apple */
.apple-button strong {
    color: #111111;

    font-size: 13px;
}


/* Hover */
.social-button:hover {
    background: #fafafa;

    border-color: #ff7818;

    box-shadow:
        0 3px 10px
        rgba(0, 0, 0, 0.06);

    transform: translateY(-1px);
}


/* Click */
.social-button:active {
    transform: translateY(0);
}

/* =========================================
   REGISTER SECTION
========================================= */

.account-section {
    width: 100%;
    max-width: 370px;

    margin-top: 26px;

    padding-top: 20px;

    border-top: 1px solid #eeeeee;

    text-align: center;
}

.account-text {
    margin: 0 0 9px;

    font-size: 10px;

    color: #777777;
}

.auth-link {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-width: 150px;

    height: 34px;

    padding: 0 18px;

    border: 1px solid #ff7818;

    border-radius: 5px;

    background: #ffffff;

    color: #ff7818;

    font-size: 10px;

    font-weight: 600;

    text-decoration: none;

    transition:
        background 0.2s ease,
        color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.15s ease;
}

.auth-link:hover {
    background: #ff7818;

    color: #ffffff;

    box-shadow:
        0 4px 10px
        rgba(255, 120, 24, 0.18);

    transform: translateY(-1px);
}

.auth-link:active {
    transform: translateY(0);
}


                /* =========================================
   FOOTER
========================================= */

.auth-footer {
    width: 100%;
    max-width: 370px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-wrap: wrap;

    gap: 26px;

    margin-top: 28px;

    padding-top: 16px;

    border-top: 1px solid #eeeeee;

    font-size: 9px;

    color: #999999;
}

.auth-footer span {
    cursor: pointer;

    transition:
        color 0.2s ease;
}

.auth-footer span:hover {
    color: #ff7818;
}


                /* =========================================
                   LARGE DESKTOP
                ========================================= */

                @media (min-width: 1200px) {

                    .auth-container {
                        max-width: 1100px;
                    }
                }


                /* =========================================
                   TABLET
                ========================================= */

                @media (max-width: 768px) {

                    .auth-page {
                        padding: 15px;
                    }

                    .auth-container {
                        min-height: calc(100vh - 30px);
                        min-height: calc(100dvh - 30px);

                        border-radius: 5px;
                    }

                    .auth-logo {
                        width: calc(100% - 40px);
                        
                        margin-top: 50px;
                    }

                    .auth-content {
                        padding-top: 30px;
                        
                    }

                    .auth-heading h1 {
                        font-size: 24px;
                    }
                }


                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 480px) {

                    .auth-page {
                        min-height: 100vh;
                        min-height: 100dvh;

                        padding: 0;

                        align-items: stretch;
                    }

                    .auth-container {
                        width: 100%;

                        min-height: 100vh;
                        min-height: 100dvh;

                        border: none;

                        border-radius: 0;
                    }

                    .back-button {
                        top: 12px;
                        left: 10px;

                        width: 36px;
                        height: 36px;

                        font-size: 22px;
                    }

                    .auth-logo {
                        width: calc(100% - 30px);

                        height: 52px;

                        margin-top: 48px;
                    }

                    .logo-image {
                        width: 43px;
                        height: 43px;
                    }

                    .auth-content {
                        padding:
                            30px
                            16px
                            30px;
                    }

                    .auth-heading {
                        margin-bottom: 20px;
                    }

                    .auth-heading h1 {
                        font-size: 24px;
                    }

                    .auth-heading p {
                        font-size: 11px;
                    }

                    .login-form {
                        max-width: 100%;

                        padding: 20px;
                    }

                    .form-group {
                        margin-bottom: 16px;
                    }

                    .form-group label {
                        font-size: 11px;
                    }

                    .form-group input {
                        height: 42px;

                        font-size: 12px;
                    }

                    .remember-option,
                    .forgot-password {
                        font-size: 10px;
                    }

                    .primary-button {
                        height: 42px;

                        font-size: 12px;
                    }

                    .divider {
                        max-width: 100%;
                    }

                    .social-login {
                        max-width: 100%;

                        gap: 8px;
                    }

                    .social-button {
                        height: 40px;

                        font-size: 10px;
                    }

                    .account-text,
                    .auth-link {
                        font-size: 10px;
                    }

                    .auth-footer {
                        gap: 18px;

                        margin-top: 28px;

                        font-size: 9px;
                    }
                }
                    @media (max-width: 480px) {

    .auth-logo {
        width: calc(100% - 30px);

        height: 60px;

        margin-top: 48px;

        border-radius: 3px;
    }

    .logo-image {
        width: 47px;
        height: 47px;
    }

    .social-login {
        gap: 8px;
    }

    .social-button {
        height: 42px;

        font-size: 10px;
    }

    .account-section {
        margin-top: 24px;

        padding-top: 18px;
    }

    .auth-link {
        min-width: 145px;

        height: 35px;

        font-size: 10px;
    }

    .auth-footer {
        gap: 18px;

        margin-top: 25px;
    }
}


                /* =========================================
                   VERY SMALL PHONES
                ========================================= */

                @media (max-width: 360px) {

                    .auth-content {
                        padding-left: 12px;
                        padding-right: 12px;
                    }

                    .login-form {
                        padding: 17px;
                    }

                    .login-options {
                        gap: 5px;
                    }

                    .remember-option,
                    .forgot-password {
                        font-size: 9px;
                    }

                    .social-button {
                        font-size: 9px;
                    }

                    .social-button span {
                        display: none;
                    }

                    .social-button strong {
                        font-size: 15px;
                    }

                    .auth-footer {
                        gap: 13px;

                        font-size: 8px;
                    }
                }
                    @media (max-width: 360px) {

    .auth-logo {
        width: calc(100% - 24px);

        height: 56px;
    }

    .logo-image {
        width: 44px;
        height: 44px;
    }

    .social-button {
        height: 40px;
    }

    .auth-link {
        width: 100%;
        max-width: 170px;
    }

    .auth-footer {
        gap: 13px;
    }
}
            `}</style>

            <main className="auth-page">

                <div className="auth-container">

                    {/* BACK BUTTON */}
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/")}
                        aria-label="Go back"
                    >
                        ←
                    </button>


                    {/* LOGO HEADER */}
                    <div className="auth-logo">
                        <img
                            src={logoUrl}
                            alt="GuimarasGo Logo"
                            className="logo-image"
                        />
                    </div>


                    {/* CONTENT */}
                    <div className="auth-content">

                        {/* HEADING */}
                        <div className="auth-heading">

                            <h1>
                                Welcome Back
                            </h1>

                            <p>
                                Sign in to your account to continue
                            </p>

                        </div>


                        {/* LOGIN FORM */}
                        <form
                            className="login-form"
                            onSubmit={handleSubmit}
                        >

                            {/* EMAIL */}
                            <div className="form-group">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    autoComplete="email"
                                    required
                                />

                            </div>


                            {/* PASSWORD */}
                            <div className="form-group">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="current-password"
                                    required
                                />

                            </div>


                            {/* LOGIN OPTIONS */}
                            <div className="login-options">

                                <label className="remember-option">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(event) =>
                                            setRememberMe(
                                                event.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>


                                <button
                                    type="button"
                                    className="forgot-password"
                                    onClick={() =>
                                        alert(
                                            "Forgot password functionality will be added later."
                                        )
                                    }
                                >
                                    Forgot password?
                                </button>

                            </div>


                            {/* SIGN IN */}
                            <button
                                type="submit"
                                className="primary-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Signing In..."
                                    : "Sign In"}
                            </button>

                        </form>


                        {/* DIVIDER */}
                        <div className="divider">

                            <span>
                                Or continue with
                            </span>

                        </div>


                        <div className="social-login">

    {/* GOOGLE */}
    <button
        type="button"
        className="social-button google-button"
        onClick={() =>
            alert("Google login will be added later.")
        }
    >
        <FcGoogle className="social-icon google-icon" />

        <span>
            Continue with Google
        </span>
    </button>


    {/* APPLE */}
    <button
        type="button"
        className="social-button apple-button"
        onClick={() =>
            alert("Apple login will be added later.")
        }
    >
        <FaApple className="social-icon apple-icon" />

        <span>
            Continue with Apple
        </span>
    </button>

</div>

                        {/* REGISTER */}
                        <div className="account-section">

                            <p className="account-text">
                                Don't have an account?
                            </p>

                            <Link
                                to="/register"
                                className="auth-link"
                            >
                                Create an account
                            </Link>

                        </div>


                        {/* FOOTER */}
                        <div className="auth-footer">

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

export default Login;