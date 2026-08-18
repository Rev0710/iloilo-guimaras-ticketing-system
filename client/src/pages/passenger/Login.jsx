import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log({
            email,
            password,
            rememberMe,
        });

        // Temporary navigation.
        // Real authentication will be connected to MongoDB later.
        navigate("/dashboard");
    };

    return (
        <main className="auth-page">

            <div className="auth-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ←
                </button>

                <div className="auth-logo">
                    <span className="logo-orange">GO</span>
                    <span className="logo-green">.</span>
                </div>

                <div className="auth-heading">
                    <h1>Welcome Back</h1>

                    <p>
                        Sign in to continue to your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

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
                        >
                            Forgot Password?
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Sign In
                    </button>

                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="social-login">

                    <button
                        type="button"
                        className="social-button"
                    >
                        <strong>G</strong>
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="social-button"
                    >
                        <strong>●</strong>
                        Continue with Apple
                    </button>

                </div>

                <p className="account-text">
                    Don't have an account?
                </p>

                <Link
                    to="/register"
                    className="auth-link"
                >
                    Create an account
                </Link>

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