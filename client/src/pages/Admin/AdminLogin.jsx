import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response =
                await fetch(
                    `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/admin/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Login failed."
                );
            }


            // Save authentication
            localStorage.setItem(
                "adminToken",
                data.token
            );

            localStorage.setItem(
                "adminData",
                JSON.stringify(
                    data.admin
                )
            );


            navigate(
                "/admin-dashboard"
            );

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
                    Administrator Login
                </h1>

                <p className="subtitle">
                    Login to your GuimarasGo Admin Dashboard.
                </p>


                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        placeholder="admin@example.com"
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        placeholder="Enter your password"
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>


                <p className="login-link">

                    Don't have an admin account?

                    {" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin-register"
                            )
                        }
                    >
                        Register
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

                    background: #ffffff;

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

                    margin:
                        0 auto 18px;

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

                    color: #222;

                    font-size: 25px;
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

                    color: #ffffff;

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

                .error {
                    padding: 11px;

                    border-radius: 8px;

                    margin-bottom: 15px;

                    background: #fff0f0;

                    color: #c62828;

                    font-size: 12px;
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

export default AdminLogin;