import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [admin, setAdmin] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const token =
            localStorage.getItem(
                "adminToken"
            );

        if (!token) {

            navigate(
                "/admin-login",
                {
                    replace: true
                }
            );

            return;
        }


        const loadAdmin =
            async () => {

                try {

                    const response =
                        await fetch(
                            "http://localhost:5000/api/admin/me",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            data.message
                        );
                    }


                    setAdmin(
                        data.admin
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                    localStorage.removeItem(
                        "adminToken"
                    );

                    localStorage.removeItem(
                        "adminData"
                    );

                    navigate(
                        "/admin-login",
                        {
                            replace: true
                        }
                    );

                } finally {

                    setLoading(false);
                }
            };


        loadAdmin();

    }, [navigate]);


    const handleLogout = () => {

        localStorage.removeItem(
            "adminToken"
        );

        localStorage.removeItem(
            "adminData"
        );

       navigate(
    "/",
    {
        replace: true
    }
);
    };


    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading Admin Dashboard...
            </div>
        );
    }


    return (
        <main className="admin-dashboard">

            <aside className="sidebar">

                <div className="sidebar-title">
                    GuimarasGo
                </div>


                <div className="admin-label">
                    ADMINISTRATOR
                </div>


                <button
                    className="side-item active"
                >
                    Dashboard
                </button>


                <button
                    className="side-item"
                    onClick={() =>
                        alert(
                            "Payment Verification will be connected next."
                        )
                    }
                >
                    Payment Verification
                </button>


                <div className="sidebar-spacer" />


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </aside>


            <section className="dashboard-content">

                <header className="dashboard-header">

                    <div>

                        <h1>
                            Administrator Dashboard
                        </h1>

                        <p>
                            Welcome back,{" "}
                            <strong>
                                {admin?.fullName}
                            </strong>
                        </p>

                    </div>

                    <div className="admin-badge">
                        ADMIN
                    </div>

                </header>


                <div className="dashboard-body">

                    <h2>
                        Dashboard Overview
                    </h2>

                    <p className="dashboard-description">
                        Here's what's happening with
                        your GuimarasGo system.
                    </p>


                    <div className="cards">

                        <div className="stat-card">

                            <span>
                                Total Bookings
                            </span>

                            <strong>
                                0
                            </strong>

                            <small>
                                Current records
                            </small>

                        </div>


                        <div className="stat-card">

                            <span>
                                Pending Payments
                            </span>

                            <strong>
                                0
                            </strong>

                            <small>
                                Awaiting verification
                            </small>

                        </div>


                        <div className="stat-card">

                            <span>
                                Verified Payments
                            </span>

                            <strong>
                                0
                            </strong>

                            <small>
                                Verified transactions
                            </small>

                        </div>

                    </div>


                    <div className="welcome-card">

                        <div>

                            <h3>
                                Payment Verification
                            </h3>

                            <p>
                                Uploaded customer payment
                                receipts will appear here
                                once the payment verification
                                module is connected to
                                MongoDB.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                alert(
                                    "Payment Verification will be implemented next."
                                )
                            }
                        >
                            View Payments
                        </button>

                    </div>


                    <div className="system-card">

                        <h3>
                            Administrator Account
                        </h3>

                        <div className="account-row">

                            <span>
                                Name
                            </span>

                            <strong>
                                {admin?.fullName}
                            </strong>

                        </div>


                        <div className="account-row">

                            <span>
                                Email
                            </span>

                            <strong>
                                {admin?.email}
                            </strong>

                        </div>


                        <div className="account-row">

                            <span>
                                Role
                            </span>

                            <strong>
                                {admin?.role}
                            </strong>

                        </div>

                    </div>

                </div>


                <footer className="dashboard-footer">

                    <span>
                        © 2026 GuimarasGo
                    </span>

                    <span>
                        Administrator System
                    </span>

                </footer>

            </section>


            <style>{`

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                }

                .admin-dashboard {
                    min-height: 100vh;

                    display: flex;

                    background:
                        #f5f7fa;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                }


                /* SIDEBAR */

                .sidebar {
                    width: 230px;

                    min-height: 100vh;

                    display: flex;

                    flex-direction: column;

                    padding: 25px 15px;

                    background:
                        #ffffff;

                    border-right:
                        1px solid #e5e5e5;
                }


                .sidebar-title {
                    padding:
                        0 10px;

                    color:
                        #f28c28;

                    font-size:
                        20px;

                    font-weight:
                        900;

                    margin-bottom:
                        5px;
                }


                .admin-label {
                    padding:
                        0 10px;

                    margin-bottom:
                        25px;

                    color:
                        #999999;

                    font-size:
                        10px;

                    font-weight:
                        700;

                    letter-spacing:
                        1px;
                }


                .side-item {
                    width: 100%;

                    padding:
                        12px 13px;

                    margin-bottom:
                        6px;

                    border: none;

                    border-radius:
                        8px;

                    background:
                        transparent;

                    color:
                        #555555;

                    text-align:
                        left;

                    font-size:
                        13px;

                    cursor:
                        pointer;
                }


                .side-item:hover {
                    background:
                        #f7f7f7;
                }


                .side-item.active {
                    background:
                        #fff2e6;

                    color:
                        #f28c28;

                    font-weight:
                        700;
                }


                .sidebar-spacer {
                    flex: 1;
                }


                .logout-button {
                    width: 100%;

                    padding:
                        12px;

                    border: none;

                    border-radius:
                        8px;

                    background:
                        #fff0f0;

                    color:
                        #d32f2f;

                    font-size:
                        13px;

                    font-weight:
                        700;

                    cursor:
                        pointer;
                }


                /* CONTENT */

                .dashboard-content {
                    flex: 1;

                    min-width: 0;

                    display: flex;

                    flex-direction: column;
                }


                .dashboard-header {
                    min-height:
                        76px;

                    padding:
                        0 35px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    background:
                        #ffffff;

                    border-bottom:
                        1px solid #e5e5e5;
                }


                .dashboard-header h1 {
                    margin:
                        0 0 5px;

                    color:
                        #222222;

                    font-size:
                        22px;
                }


                .dashboard-header p {
                    margin: 0;

                    color:
                        #888888;

                    font-size:
                        12px;
                }


                .admin-badge {
                    padding:
                        8px 13px;

                    border-radius:
                        20px;

                    background:
                        #fff2e6;

                    color:
                        #f28c28;

                    font-size:
                        11px;

                    font-weight:
                        800;
                }


                .dashboard-body {
                    width:
                        100%;

                    max-width:
                        1100px;

                    margin:
                        0 auto;

                    padding:
                        35px;
                }


                .dashboard-body h2 {
                    margin:
                        0 0 5px;

                    color:
                        #222222;

                    font-size:
                        24px;
                }


                .dashboard-description {
                    margin:
                        0 0 25px;

                    color:
                        #888888;

                    font-size:
                        13px;
                }


                /* CARDS */

                .cards {
                    display:
                        grid;

                    grid-template-columns:
                        repeat(3, 1fr);

                    gap:
                        18px;

                    margin-bottom:
                        25px;
                }


                .stat-card {
                    padding:
                        20px;

                    background:
                        #ffffff;

                    border:
                        1px solid #e8e8e8;

                    border-radius:
                        12px;

                    box-shadow:
                        0 3px 12px
                        rgba(
                            0,
                            0,
                            0,
                            0.03
                        );
                }


                .stat-card span {
                    display:
                        block;

                    color:
                        #777777;

                    font-size:
                        12px;

                    margin-bottom:
                        12px;
                }


                .stat-card strong {
                    display:
                        block;

                    color:
                        #222222;

                    font-size:
                        28px;

                    margin-bottom:
                        5px;
                }


                .stat-card small {
                    color:
                        #999999;

                    font-size:
                        10px;
                }


                /* PAYMENT CARD */

                .welcome-card {
                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        20px;

                    padding:
                        24px;

                    margin-bottom:
                        20px;

                    background:
                        #ffffff;

                    border:
                        1px solid #e8e8e8;

                    border-radius:
                        12px;
                }


                .welcome-card h3,
                .system-card h3 {
                    margin:
                        0 0 8px;

                    color:
                        #222222;

                    font-size:
                        17px;
                }


                .welcome-card p {
                    margin:
                        0;

                    max-width:
                        650px;

                    color:
                        #777777;

                    font-size:
                        12px;

                    line-height:
                        1.6;
                }


                .welcome-card button {
                    flex-shrink:
                        0;

                    padding:
                        11px 18px;

                    border:
                        none;

                    border-radius:
                        8px;

                    background:
                        #333333;

                    color:
                        white;

                    font-size:
                        12px;

                    font-weight:
                        700;

                    cursor:
                        pointer;
                }


                /* ACCOUNT */

                .system-card {
                    padding:
                        24px;

                    background:
                        #ffffff;

                    border:
                        1px solid #e8e8e8;

                    border-radius:
                        12px;
                }


                .account-row {
                    display:
                        flex;

                    justify-content:
                        space-between;

                    padding:
                        12px 0;

                    border-bottom:
                        1px solid #f0f0f0;
                }


                .account-row:last-child {
                    border-bottom:
                        none;
                }


                .account-row span {
                    color:
                        #888888;

                    font-size:
                        12px;
                }


                .account-row strong {
                    color:
                        #333333;

                    font-size:
                        12px;
                }


                /* FOOTER */

                .dashboard-footer {
                    margin-top:
                        auto;

                    padding:
                        18px 35px;

                    display:
                        flex;

                    justify-content:
                        space-between;

                    color:
                        #999999;

                    font-size:
                        11px;

                    background:
                        #ffffff;

                    border-top:
                        1px solid #e5e5e5;
                }


                .dashboard-loading {
                    min-height:
                        100vh;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    color:
                        #777777;
                }


                /* MOBILE */

                @media (
                    max-width: 800px
                ) {

                    .sidebar {
                        width:
                            190px;
                    }

                    .dashboard-header {
                        padding:
                            0 20px;
                    }

                    .dashboard-body {
                        padding:
                            25px 20px;
                    }

                    .cards {
                        grid-template-columns:
                            1fr;
                    }

                }


                @media (
                    max-width: 600px
                ) {

                    .admin-dashboard {
                        flex-direction:
                            column;
                    }

                    .sidebar {
                        width:
                            100%;

                        min-height:
                            auto;

                        padding:
                            15px;

                        flex-direction:
                            row;

                        align-items:
                            center;

                        gap:
                            5px;

                        overflow-x:
                            auto;
                    }

                    .sidebar-title,
                    .admin-label {
                        display:
                            none;
                    }

                    .side-item {
                        width:
                            auto;

                        white-space:
                            nowrap;

                        margin:
                            0;
                    }

                    .sidebar-spacer {
                        display:
                            none;
                    }

                    .logout-button {
                        width:
                            auto;

                        white-space:
                            nowrap;
                    }

                    .dashboard-header {
                        min-height:
                            90px;
                    }

                    .dashboard-header h1 {
                        font-size:
                            18px;
                    }

                    .admin-badge {
                        display:
                            none;
                    }

                    .welcome-card {
                        flex-direction:
                            column;

                        align-items:
                            flex-start;
                    }

                    .welcome-card button {
                        width:
                            100%;
                    }

                    .dashboard-footer {
                        padding:
                            15px 20px;

                        flex-direction:
                            column;

                        gap:
                            5px;
                    }

                }

            `}</style>

        </main>
    );
};

export default AdminDashboard;