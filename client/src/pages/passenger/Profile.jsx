import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState(true);

    // =========================================================
    // USER INFORMATION
    // =========================================================

    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+63 912 345 6789",
    });

    // =========================================================
    // EDIT PROFILE
    // =========================================================

    const handleEditProfile = () => {
        alert("Edit Profile feature coming soon.");
    };

    // =========================================================
    // PAYMENT METHODS
    // =========================================================

    const handlePaymentMethods = () => {
        alert("Payment Methods feature coming soon.");
    };

    // =========================================================
    // SETTINGS
    // =========================================================

    const handleSettings = () => {
        alert("Settings feature coming soon.");
    };

    // =========================================================
    // HELP & SUPPORT
    // =========================================================

    const handleHelpSupport = () => {
        alert("Help & Support feature coming soon.");
    };

    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {
        const confirmed = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmed) {
            return;
        }

        sessionStorage.removeItem("user");
        sessionStorage.removeItem("currentUser");

        navigate("/");
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
                    padding: 0;
                    width: 100%;
                    min-height: 100%;
                }

                body {
                    font-family:
                        "Poppins",
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Arial,
                        sans-serif;

                    background: #1d1d1d;
                    color: #222;
                }

                button {
                    font-family: inherit;
                }

                /* =====================================================
                   PAGE
                ===================================================== */

                .profile-page {
                    min-height: 100vh;
                    min-height: 100dvh;

                    display: flex;
                    justify-content: center;

                    background: #1d1d1d;

                    padding: 20px;
                }

                .profile-container {
                    width: 100%;
                    max-width: 900px;

                    min-height: calc(100vh - 40px);
                    min-height: calc(100dvh - 40px);

                    background:
                        linear-gradient(
                            180deg,
                            #fff8f0 0%,
                            #ffe6ce 100%
                        );

                    position: relative;

                    overflow: hidden;
                }

                /* =====================================================
                   HEADER
                ===================================================== */

                .profile-header {
                    height: 80px;

                    display: flex;
                    align-items: center;

                    justify-content: center;

                    position: relative;

                    border-bottom:
                        1px solid
                        rgba(255, 120, 24, 0.16);

                    background:
                        radial-gradient(
                            circle at 50% 0%,
                            rgba(255,255,255,0.95),
                            rgba(255,239,220,0.85)
                        );
                }

                .profile-back-button {
                    position: absolute;

                    left: 20px;
                    top: 50%;

                    transform: translateY(-50%);

                    width: 42px;
                    height: 42px;

                    border: none;

                    background: transparent;

                    font-size: 27px;

                    color: #333;

                    cursor: pointer;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    transition: 0.2s ease;
                }

                .profile-back-button:hover {
                    color: #ff7818;

                    transform:
                        translateY(-50%)
                        translateX(-2px);
                }

                .profile-header h1 {
                    margin: 0;

                    font-size: 20px;

                    font-weight: 500;

                    color: #222;
                }

                /* =====================================================
                   CONTENT
                ===================================================== */

                .profile-content {
                    padding:
                        25px
                        30px
                        35px;

                    max-width: 600px;

                    margin: 0 auto;
                }

                /* =====================================================
                   USER CARD
                ===================================================== */

                .profile-user-card {
                    background: #ffffff;

                    border-radius: 10px;

                    padding: 18px;

                    margin-bottom: 24px;

                    box-shadow:
                        0 4px 15px
                        rgba(0,0,0,0.04);

                    border:
                        1px solid
                        rgba(255,255,255,0.8);
                }

                .profile-user-info {
                    display: flex;

                    align-items: center;

                    gap: 18px;

                    margin-bottom: 18px;
                }

                .profile-avatar {
                    width: 62px;
                    height: 62px;

                    flex-shrink: 0;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    border-radius: 50%;

                    background:
                        linear-gradient(
                            135deg,
                            #fff,
                            #f4f4f4
                        );

                    font-size: 42px;

                    overflow: hidden;
                }

                .profile-avatar span {
                    transform:
                        translateY(2px);
                }

                .profile-user-details {
                    min-width: 0;
                }

                .profile-user-details h2 {
                    margin: 0 0 5px;

                    font-size: 18px;

                    font-weight: 500;

                    color: #222;
                }

                .profile-user-details p {
                    margin: 2px 0;

                    color: #777;

                    font-size: 14px;

                    line-height: 1.35;
                }

                /* =====================================================
                   EDIT PROFILE BUTTON
                ===================================================== */

                .edit-profile-button {
                    width: 100%;

                    height: 49px;

                    border: none;

                    border-radius: 8px;

                    background: #171717;

                    color: #ffffff;

                    font-size: 16px;

                    font-weight: 500;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .edit-profile-button:hover {
                    background: #303030;

                    transform:
                        translateY(-1px);
                }

                /* =====================================================
                   MENU
                ===================================================== */

                .profile-menu {
                    display: flex;

                    flex-direction: column;

                    gap: 10px;
                }

                .profile-menu-item {
                    width: 100%;

                    min-height: 76px;

                    display: flex;

                    align-items: center;

                    gap: 14px;

                    padding:
                        12px
                        16px;

                    border-radius: 9px;

                    border:
                        1px solid
                        rgba(255, 255, 255, 0.85);

                    background:
                        rgba(
                            255,
                            255,
                            255,
                            0.18
                        );

                    cursor: pointer;

                    text-align: left;

                    transition: 0.2s ease;
                }

                .profile-menu-item:hover {
                    background:
                        rgba(
                            255,
                            255,
                            255,
                            0.42
                        );

                    transform:
                        translateY(-1px);
                }

                .profile-menu-icon {
                    width: 40px;
                    height: 40px;

                    flex-shrink: 0;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    border-radius: 10px;

                    background: #e8e8e8;

                    color: #555;

                    font-size: 19px;
                }

                .profile-menu-text {
                    flex: 1;

                    min-width: 0;
                }

                .profile-menu-text strong {
                    display: block;

                    margin-bottom: 2px;

                    color: #222;

                    font-size: 16px;

                    font-weight: 500;
                }

                .profile-menu-text span {
                    display: block;

                    color: #777;

                    font-size: 13px;

                    line-height: 1.3;
                }

                .profile-arrow {
                    color: #999;

                    font-size: 28px;

                    font-weight: 300;

                    line-height: 1;
                }

                /* =====================================================
                   NOTIFICATION TOGGLE
                ===================================================== */

                .notification-toggle {
                    width: 44px;
                    height: 25px;

                    flex-shrink: 0;

                    border: none;

                    border-radius: 20px;

                    padding: 2px;

                    background: #bbb;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .notification-toggle.active {
                    background: #171717;
                }

                .notification-knob {
                    display: block;

                    width: 21px;
                    height: 21px;

                    border-radius: 50%;

                    background: #ffffff;

                    transition: 0.2s ease;

                    box-shadow:
                        0 1px 3px
                        rgba(0,0,0,0.2);
                }

                .notification-toggle.active
                .notification-knob {
                    transform:
                        translateX(19px);
                }

                /* =====================================================
                   LOGOUT
                ===================================================== */

                .logout-button {
                    width: 100%;

                    height: 56px;

                    margin-top: 12px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 12px;

                    border:
                        2px solid
                        #222;

                    border-radius: 8px;

                    background:
                        rgba(
                            255,
                            255,
                            255,
                            0.08
                        );

                    color: #222;

                    font-size: 16px;

                    font-weight: 500;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .logout-button:hover {
                    background: #222;

                    color: #ffffff;
                }

                .logout-icon {
                    font-size: 19px;
                }

                /* =====================================================
                   MOBILE
                ===================================================== */

                @media (max-width: 600px) {

                    .profile-page {
                        padding: 0;
                    }

                    .profile-container {
                        min-height: 100vh;
                        min-height: 100dvh;

                        max-width: 100%;

                        border-radius: 0;
                    }

                    .profile-header {
                        height: 80px;
                    }

                    .profile-content {
                        padding:
                            25px
                            16px
                            30px;
                    }

                    .profile-user-card {
                        padding: 16px;
                    }

                    .profile-avatar {
                        width: 58px;
                        height: 58px;

                        font-size: 38px;
                    }

                    .profile-user-details h2 {
                        font-size: 17px;
                    }

                    .profile-user-details p {
                        font-size: 13px;
                    }

                    .profile-menu-item {
                        min-height: 74px;
                    }
                }

                @media (max-width: 380px) {

                    .profile-content {
                        padding:
                            20px
                            12px
                            25px;
                    }

                    .profile-user-info {
                        gap: 12px;
                    }

                    .profile-menu-text strong {
                        font-size: 15px;
                    }

                    .profile-menu-text span {
                        font-size: 12px;
                    }
                }

            `}</style>

            <main className="profile-page">

                <div className="profile-container">

                    {/* =================================================
                       HEADER
                    ================================================= */}

                    <header className="profile-header">

                        <button
                            type="button"
                            className="profile-back-button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            aria-label="Go back"
                        >
                            ←
                        </button>

                        <h1>
                            Profile
                        </h1>

                    </header>

                    {/* =================================================
                       CONTENT
                    ================================================= */}

                    <section className="profile-content">

                        {/* USER CARD */}

                        <div className="profile-user-card">

                            <div className="profile-user-info">

                                <div className="profile-avatar">
                                    <span>
                                        👨🏻
                                    </span>
                                </div>

                                <div className="profile-user-details">

                                    <h2>
                                        {user.name}
                                    </h2>

                                    <p>
                                        {user.email}
                                    </p>

                                    <p>
                                        {user.phone}
                                    </p>

                                </div>

                            </div>

                            <button
                                type="button"
                                className="edit-profile-button"
                                onClick={handleEditProfile}
                            >
                                Edit Profile
                            </button>

                        </div>

                        {/* MENU */}

                        <div className="profile-menu">

                            {/* PAYMENT METHODS */}

                            <button
                                type="button"
                                className="profile-menu-item"
                                onClick={
                                    handlePaymentMethods
                                }
                            >

                                <div className="profile-menu-icon">
                                    💳
                                </div>

                                <div className="profile-menu-text">

                                    <strong>
                                        Payment Methods
                                    </strong>

                                    <span>
                                        Saved GCash / Maya
                                    </span>

                                </div>

                                <span className="profile-arrow">
                                    ›
                                </span>

                            </button>

                            {/* NOTIFICATIONS */}

                            <div
                                className="profile-menu-item"
                                role="button"
                                tabIndex={0}
                                onClick={() =>
                                    setNotifications(
                                        !notifications
                                    )
                                }
                                onKeyDown={(event) => {

                                    if (
                                        event.key ===
                                        "Enter"
                                    ) {
                                        setNotifications(
                                            !notifications
                                        );
                                    }

                                }}
                            >

                                <div className="profile-menu-icon">
                                    🔔
                                </div>

                                <div className="profile-menu-text">

                                    <strong>
                                        Notifications
                                    </strong>

                                    <span>
                                        Toggle alerts
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    className={`notification-toggle ${
                                        notifications
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={(event) => {

                                        event.stopPropagation();

                                        setNotifications(
                                            !notifications
                                        );

                                    }}
                                    aria-label="Toggle notifications"
                                >

                                    <span className="notification-knob" />

                                </button>

                            </div>

                            {/* SETTINGS */}

                            <button
                                type="button"
                                className="profile-menu-item"
                                onClick={handleSettings}
                            >

                                <div className="profile-menu-icon">
                                    ⚙️
                                </div>

                                <div className="profile-menu-text">

                                    <strong>
                                        Settings
                                    </strong>

                                    <span>
                                        Change password, preferences
                                    </span>

                                </div>

                                <span className="profile-arrow">
                                    ›
                                </span>

                            </button>

                            {/* HELP & SUPPORT */}

                            <button
                                type="button"
                                className="profile-menu-item"
                                onClick={handleHelpSupport}
                            >

                                <div className="profile-menu-icon">
                                    ?
                                </div>

                                <div className="profile-menu-text">

                                    <strong>
                                        Help & Support
                                    </strong>

                                    <span>
                                        FAQs, Contact support
                                    </span>

                                </div>

                                <span className="profile-arrow">
                                    ›
                                </span>

                            </button>

                        </div>

                        {/* LOGOUT */}

                        <button
                            type="button"
                            className="logout-button"
                            onClick={handleLogout}
                        >

                            <span className="logout-icon">
                                ↪
                            </span>

                            Logout

                        </button>

                    </section>

                </div>

            </main>
        </>
    );
};

export default Profile;