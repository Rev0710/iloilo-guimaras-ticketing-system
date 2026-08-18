import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            alert("Passwords do not match.");
            return;
        }

        if (!formData.agreeTerms) {
            alert(
                "Please agree to the Terms of Service and Privacy Policy."
            );
            return;
        }

        console.log("Registration:", formData);

        // Temporary navigation.
        // Backend registration will be connected later.
        navigate("/login");
    };

    return (
        <main className="auth-page">

            <div className="auth-container register-container">

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
                    <h1>Create Account</h1>

                    <p>
                        Create your account to reserve
                        your ferry trip.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
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
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="registerEmail">
                            Email Address
                        </label>

                        <input
                            id="registerEmail"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
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
                            required
                        />
                    </div>

                    <div className="form-group">
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
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <label className="terms-option">

                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                        />

                        <span>
                            I agree to the Terms of Service
                            and Privacy Policy.
                        </span>

                    </label>

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Create Account
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
                    Already have an account?
                </p>

                <Link
                    to="/login"
                    className="auth-link"
                >
                    Sign In
                </Link>

            </div>

        </main>
    );
};

export default Register;