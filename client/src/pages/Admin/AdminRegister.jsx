import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api";


const AdminRegister = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        registrationCode: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {

        setForm({
            ...form,
            [event.target.name]:
                event.target.value
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/admin/register`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(form)
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Registration failed."
                );
            }


            setSuccess(
                "Administrator account created successfully!"
            );


            setTimeout(() => {

                navigate(
                    "/login"
                );

            }, 1200);

        } catch (error) {

            setError(
                error.message
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <main className="admin-auth-page">

            <div className="admin-auth-card">

                <div className="admin-logo">
                    GO
                </div>

                <h1>
                    Administrator Registration
                </h1>

                <p className="subtitle">
                    Create your GuimarasGo administrator account.
                </p>


                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="success">
                        {success}
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />


                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="admin@example.com"
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                        required
                    />


                    <label>
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />


                    <label>
                        Admin Registration Code
                    </label>

                    <input
                        type="password"
                        name="registrationCode"
                        value={
                            form.registrationCode
                        }
                        onChange={handleChange}
                        placeholder="Enter registration code"
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Administrator Account"}
                    </button>

                </form>


                <p className="login-link">

                    Already have an account?

                    {" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/login"
                            )
                        }
                    >
                        Login
                    </button>

                </p>

            </div>


            <style>{`

                * {
                    box-sizing: border-box;
                }

                .admin-auth-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 20px;

                    background:
                        linear-gradient(
                            135deg,
                            #f7f8fa,
                            #eef3f8
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                }

                .admin-auth-card {
                    width: 100%;
                    max-width: 450px;

                    padding: 35px;

                    background: white;

                    border-radius: 20px;

                    box-shadow:
                        0 15px 40px
                        rgba(
                            0,
                            0,
                            0,
                            0.10
                        );
                }

                .admin-logo {
                    width: 58px;
                    height: 58px;

                    margin: 0 auto 18px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #f5a623;

                    color: white;

                    font-size: 24px;
                    font-weight: 900;
                }

                h1 {
                    margin: 0;

                    text-align: center;

                    font-size: 25px;

                    color: #222;
                }

                .subtitle {
                    text-align: center;

                    color: #777;

                    font-size: 13px;

                    margin:
                        8px 0 25px;
                }

                form {
                    display: flex;
                    flex-direction: column;
                }

                label {
                    margin:
                        10px 0 6px;

                    font-size: 13px;

                    font-weight: 700;

                    color: #333;
                }

                input {
                    height: 45px;

                    padding:
                        0 13px;

                    border:
                        1px solid #ddd;

                    border-radius: 9px;

                    outline: none;

                    font-size: 14px;
                }

                input:focus {
                    border-color:
                        #f28c28;
                }

                form button {
                    height: 48px;

                    margin-top: 22px;

                    border: none;

                    border-radius: 9px;

                    background: #333;

                    color: white;

                    font-size: 14px;

                    font-weight: 700;

                    cursor: pointer;
                }

                form button:hover {
                    background: #222;
                }

                form button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .error,
                .success {
                    padding: 11px;

                    border-radius: 8px;

                    margin-bottom: 15px;

                    font-size: 12px;
                }

                .error {
                    background: #fff0f0;
                    color: #c62828;
                }

                .success {
                    background: #effaf1;
                    color: #2e7d32;
                }

                .login-link {
                    text-align: center;

                    margin:
                        20px 0 0;

                    color: #777;

                    font-size: 13px;
                }

                .login-link button {
                    border: none;
                    background: transparent;

                    color: #f28c28;

                    font-weight: 700;

                    cursor: pointer;
                }

            `}</style>

        </main>
    );
};

export default AdminRegister;