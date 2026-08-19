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

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fullName: formData.fullName,
                        email: formData.email,
                        phoneNumber: formData.phoneNumber,
                        password: formData.password,
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

            // Go to login
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
        <main className="auth-page">

            <div className="auth-container register-container">

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

                    <h1>Create Account</h1>

                    <p>
                        Create your account to reserve
                        your ferry trip.
                    </p>

                </div>

                {/* REGISTRATION FORM */}
                <form onSubmit={handleSubmit}>

                    {/* FULL NAME */}
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

                    {/* EMAIL */}
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

                    {/* PHONE NUMBER */}
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

                    {/* PASSWORD */}
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
                            minLength={6}
                        />

                    </div>

                    {/* CONFIRM PASSWORD */}
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
                            minLength={6}
                        />

                    </div>

                    {/* TERMS */}
                    <label className="terms-option">

                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={
                                formData.agreeTerms
                            }
                            onChange={handleChange}
                        />

                        <span>
                            I agree to the Terms of
                            Service and Privacy
                            Policy.
                        </span>

                    </label>

                    {/* CREATE ACCOUNT */}
                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                {/* SOCIAL LOGIN */}
                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="social-login">

                    <button
                        type="button"
                        className="social-button"
                        onClick={() =>
                            alert(
                                "Google registration will be added later."
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
                                "Apple registration will be added later."
                            )
                        }
                    >
                        <strong>●</strong>
                        Continue with Apple
                    </button>

                </div>

                {/* LOGIN LINK */}
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