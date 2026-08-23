import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

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
        <main className="auth-page">

            <div className="auth-container">

                {/* BACK BUTTON */}
                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ←
                </button>

                {/* LOGO */}
                <div className="auth-logo">
                    <span className="logo-orange">GO</span>
                    <span className="logo-green">.</span>
                </div>

                {/* HEADING */}
                <div className="auth-heading">

                    <h1>Welcome Back</h1>

                    <p>
                        Sign in to continue to your account.
                    </p>

                </div>

                {/* LOGIN FORM */}
                <form onSubmit={handleSubmit}>

                    {/* EMAIL */}
                    <div className="form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
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
                            Forgot Password?
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
                    <span>OR</span>
                </div>

                {/* SOCIAL LOGIN */}
                <div className="social-login">

                    <button
                        type="button"
                        className="social-button"
                        onClick={() =>
                            alert(
                                "Google login will be added later."
                            )
                        }
                    >
                        <strong>G</strong>
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="social-button"
                        onClick={() =>
                            alert(
                                "Apple login will be added later."
                            )
                        }
                    >
                        <strong>●</strong>
                        Continue with Apple
                    </button>

                </div>

                {/* REGISTER */}
                <p className="account-text">
                    Don't have an account?
                </p>

                <Link
                    to="/register"
                    className="auth-link"
                >
                    Create an account
                </Link>

                {/* FOOTER */}
                <div className="auth-footer">

                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Help</span>

                </div>

            </div>

        </main>
    );
};

export default Login;