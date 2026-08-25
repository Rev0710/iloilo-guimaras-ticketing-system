import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    

    const [recentBookings, setRecentBookings] = useState([]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

const handleLogoutClick = () => {
    setShowLogoutModal(true);
};

const handleCancelLogout = () => {
    setShowLogoutModal(false);
};

const handleConfirmLogout = () => {
    // Remove login/session information
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("student");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("isLoggedIn");

    // Close popup
    setShowLogoutModal(false);

    // Return to the GuimarasGo landing page
    navigate("/");
};
    const logoUrl =
        "https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956";

    // =========================================================
    // LOAD BOOKINGS
    // =========================================================

    useEffect(() => {
        loadBookings();

        const handleStorageChange = () => {
            loadBookings();
        };

        window.addEventListener(
            "storage",
            handleStorageChange
        );

        return () => {
            window.removeEventListener(
                "storage",
                handleStorageChange
            );
        };
    }, []);

    const loadBookings = () => {
        try {
            let allBookings = [];

            // =================================================
            // MAIN BOOKING HISTORY
            // =================================================

            const savedAllBookings =
                sessionStorage.getItem("allBookings");

            if (savedAllBookings) {
                const parsed =
                    JSON.parse(savedAllBookings);

                if (Array.isArray(parsed)) {
                    allBookings = parsed;
                }
            }

            // =================================================
            // RECENT BOOKINGS COMPATIBILITY
            // =================================================

            const savedRecentBookings =
                sessionStorage.getItem("recentBookings");

            if (savedRecentBookings) {
                const parsedRecent =
                    JSON.parse(savedRecentBookings);

                if (Array.isArray(parsedRecent)) {
                    parsedRecent.forEach((booking) => {
                        const exists =
                            allBookings.some(
                                (item) =>
                                    item.bookingReference ===
                                    booking.bookingReference
                            );

                        if (!exists) {
                            allBookings.push(booking);
                        }
                    });
                }
            }

            // =================================================
            // CONFIRMED BOOKING COMPATIBILITY
            // =================================================

            const confirmedBooking =
                sessionStorage.getItem(
                    "confirmedBooking"
                );

            if (confirmedBooking) {
                const booking =
                    JSON.parse(confirmedBooking);

                const exists =
                    allBookings.some(
                        (item) =>
                            item.bookingReference ===
                            booking.bookingReference
                    );

                if (!exists) {
                    allBookings.push(booking);
                }
            }

            // =================================================
            // SAVE COMPLETE HISTORY
            // =================================================

            sessionStorage.setItem(
                "allBookings",
                JSON.stringify(allBookings)
            );

            // =================================================
            // SHOW NEWEST 3 BOOKINGS
            // =================================================

            const recent =
                [...allBookings]
                    .reverse()
                    .slice(0, 3);

            setRecentBookings(recent);

            // Keep compatibility
            sessionStorage.setItem(
                "recentBookings",
                JSON.stringify(recent)
            );

        } catch (error) {
            console.error(
                "Error loading bookings:",
                error
            );

            setRecentBookings([]);
        }
    };

    // =========================================================
    // NAVIGATION
    // =========================================================

    const goToBooking = () => {
        navigate("/book-trip");
    };

    const viewBooking = (booking) => {
        sessionStorage.setItem(
            "confirmedBooking",
            JSON.stringify(booking)
        );

        navigate("/confirmation");
    };

    const viewAllBookings = () => {
        navigate("/bookings");
    };
    

    // =========================================================
    // POPULAR ROUTES
    // =========================================================

    const popularRoutes = [
        {
            origin: "Iloilo",
            destination: "Guimaras",
            duration: "35 min",
            fare: "₱150",
            icon: "⛴️"
        },
        {
            origin: "Guimaras",
            destination: "Iloilo",
            duration: "35 min",
            fare: "₱150",
            icon: "⛴️"
        }
    ];

    return (
        <>
            <style>{`

                /* =================================================
                   GLOBAL
                ================================================= */

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
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Arial,
                        Helvetica,
                        sans-serif;

                    background: #f7f8fa;
                    color: #222;
                }

                button {
                    font-family: inherit;
                }


                /* =================================================
                   PAGE
                ================================================= */

                .dashboard-page {
                    min-height: 100vh;
                    min-height: 100dvh;

                    background:
                        linear-gradient(
                            180deg,
                            #fffaf7 0%,
                            #fff7f0 35%,
                            #f7f8fa 100%
                        );

                    padding-bottom: 100px;
                }

                .dashboard-container {
                    width: 100%;
                    max-width: 1200px;
                    min-height: 100vh;

                    margin: 0 auto;

                    background: #ffffff;

                    box-shadow:
                        0 0 40px
                        rgba(0, 0, 0, 0.04);
                }


                /* =================================================
                   HEADER
                ================================================= */

                .dashboard-header {
                    position: sticky;
                    top: 0;
                    z-index: 50;

                    height: 78px;

                    padding: 0 34px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    background:
                        rgba(
                            255,
                            255,
                            255,
                            0.96
                        );

                    border-bottom:
                        1px solid #eeeeee;

                    backdrop-filter: blur(10px);
                }

                .dashboard-logo {
                    display: flex;
                    align-items: center;
                    height: 100%;
                }

                .dashboard-logo img {
                    width: 112px;
                    height: 58px;

                    object-fit: contain;
                    display: block;
                }

                .menu-button {
                    width: 42px;
                    height: 42px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border:
                        1px solid #e8e8e8;

                    border-radius: 12px;

                    background: #ffffff;
                    color: #444444;

                    font-size: 22px;

                    cursor: pointer;

                    transition:
                        0.2s ease;
                }

                .menu-button:hover {
                    background: #fff4ed;
                    border-color: #ffd7c2;
                    color: #ff7818;
                }


                /* =================================================
                   WELCOME SECTION
                   UPDATED BACKGROUND
                ================================================= */

                .welcome-section {
                    position: relative;

                    margin:
                        34px
                        34px
                        30px;

                    min-height: 280px;

                    padding:
                        60px
                        30px
                        64px;

                    overflow: hidden;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    text-align: center;

                    border-radius: 24px;

                    /*
                     * Ferry / coastal background image.
                     *
                     * The dark overlay keeps the text readable
                     * while still showing the ferry.
                     */
                    background-image:
                        linear-gradient(
                            rgba(
                                0,
                                0,
                                0,
                                0.42
                            ),
                            rgba(
                                0,
                                0,
                                0,
                                0.38
                            )
                        ),
                        url(
                            "https://orbitshub.com/wp-content/uploads/2023/10/what-exactly-are-roro-ships-1024x576.jpg"
                        );

                    background-size: cover;

                    background-position:
                        center center;

                    background-repeat: no-repeat;

                    border:
                        1px solid
                        rgba(
                            255,
                            255,
                            255,
                            0.35
                        );

                    box-shadow:
                        0
                        15px
                        40px
                        rgba(
                            0,
                            0,
                            0,
                            0.12
                        );
                }


                /*
                 * Soft glass layer above the image.
                 */
                .welcome-section::before {
                    content: "";

                    position: absolute;

                    inset: 0;

                    background:
                        linear-gradient(
                            135deg,
                            rgba(
                                255,
                                255,
                                255,
                                0.12
                            ),
                            rgba(
                                255,
                                255,
                                255,
                                0.02
                            )
                        );

                    pointer-events: none;
                }


                /*
                 * Keep all welcome content above
                 * the background overlay.
                 */
                .welcome-section h1,
                .welcome-section p,
                .welcome-section .book-button {
                    position: relative;
                    z-index: 2;
                }

                .welcome-section h1 {
                    margin: 0;

                    color: #ffffff;

                    font-size:
                        clamp(
                            30px,
                            5vw,
                            48px
                        );

                    line-height: 1.15;

                    font-weight: 800;

                    text-shadow:
                        0
                        3px
                        12px
                        rgba(
                            0,
                            0,
                            0,
                            0.45
                        );
                }

                .welcome-section p {
                    margin:
                        14px
                        0
                        28px;

                    color:
                        rgba(
                            255,
                            255,
                            255,
                            0.92
                        );

                    font-size: 15px;

                    line-height: 1.5;

                    text-shadow:
                        0
                        2px
                        8px
                        rgba(
                            0,
                            0,
                            0,
                            0.45
                        );
                }


                /* =================================================
                   BOOK BUTTON
                ================================================= */

                .book-button {
                    min-width: 190px;
                    height: 48px;

                    padding:
                        0
                        24px;

                    border: none;

                    border-radius: 11px;

                    background:
                        linear-gradient(
                            135deg,
                            #ff7818,
                            #ff922f
                        );

                    color: #ffffff;

                    font-size: 14px;
                    font-weight: 700;

                    cursor: pointer;

                    box-shadow:
                        0
                        8px
                        20px
                        rgba(
                            255,
                            120,
                            24,
                            0.28
                        );

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .book-button:hover {
                    transform:
                        translateY(-3px);

                    background:
                        linear-gradient(
                            135deg,
                            #f06c0c,
                            #ff8a24
                        );

                    box-shadow:
                        0
                        12px
                        26px
                        rgba(
                            255,
                            120,
                            24,
                            0.36
                        );
                }

                .book-button:active {
                    transform:
                        translateY(0);
                }


                /* =================================================
                   QUICK ACTIONS
                ================================================= */

                .quick-actions {
                    display: grid;

                    grid-template-columns:
                        repeat(
                            2,
                            minmax(
                                0,
                                1fr
                            )
                        );

                    gap: 18px;

                    padding:
                        0
                        34px
                        35px;
                }

                .feature-card {
                    min-height: 140px;

                    display: flex;

                    flex-direction: column;

                    align-items: center;

                    justify-content: center;

                    border:
                        1px solid #eeeeee;

                    border-radius: 18px;

                    background:
                        linear-gradient(
                            135deg,
                            #ffffff,
                            #fffaf7
                        );

                    color: #222222;

                    cursor: pointer;

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        border-color 0.2s ease;
                }

                .feature-card:hover {
                    transform:
                        translateY(-3px);

                    border-color:
                        #ffd7bd;

                    box-shadow:
                        0
                        10px
                        25px
                        rgba(
                            255,
                            120,
                            24,
                            0.10
                        );
                }

                .feature-icon {
                    width: 48px;
                    height: 48px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    margin-bottom: 12px;

                    border-radius: 14px;

                    background:
                        #fff0e5;

                    font-size: 22px;
                }

                .feature-title {
                    font-size: 16px;

                    font-weight: 750;

                    color: #222222;
                }

                .feature-description {
                    margin-top: 5px;

                    color: #999999;

                    font-size: 12px;
                }


                /* =================================================
                   RECENT BOOKINGS
                ================================================= */

                .recent-bookings {
                    padding:
                        0
                        34px
                        50px;
                }

                .section-header {
                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    margin-bottom: 18px;
                }

                .section-header h2 {
                    margin: 0;

                    color: #222222;

                    font-size: 22px;

                    font-weight: 750;
                }

                .section-header button {
                    border: none;

                    background: transparent;

                    color: #ff7818;

                    font-size: 13px;

                    font-weight: 700;

                    cursor: pointer;

                    transition:
                        0.2s ease;
                }

                .section-header button:hover {
                    color: #e9660b;

                    text-decoration:
                        underline;
                }

                .booking-list {
                    display: flex;

                    flex-direction: column;

                    gap: 15px;
                }

                .recent-booking-card {
                    background: #ffffff;

                    border:
                        1px solid #e5e5e5;

                    border-radius: 15px;

                    padding: 18px;

                    box-shadow:
                        0
                        5px
                        18px
                        rgba(
                            0,
                            0,
                            0,
                            0.04
                        );
                }

                .booking-top {
                    display: flex;

                    justify-content:
                        space-between;

                    gap: 10px;

                    padding-bottom: 14px;

                    border-bottom:
                        1px solid #eeeeee;
                }

                .booking-top strong {
                    display: block;

                    font-size: 15px;
                }

                .booking-reference {
                    display: block;

                    margin-top: 5px;

                    color: #888888;

                    font-size: 11px;
                }

                .confirmed {
                    height: fit-content;

                    background: #e9f8ef;

                    color: #168b45;

                    padding:
                        5px
                        9px;

                    border-radius: 20px;

                    font-size: 9px;

                    font-weight: 700;

                    white-space: nowrap;
                }

                .booking-info {
                    display: grid;

                    grid-template-columns:
                        repeat(
                            3,
                            1fr
                        );

                    gap: 12px;

                    padding:
                        15px
                        0;
                }

                .booking-info small,
                .booking-info strong {
                    display: block;
                }

                .booking-info small {
                    color: #888888;

                    font-size: 10px;

                    margin-bottom: 4px;
                }

                .booking-info strong {
                    color: #222222;

                    font-size: 12px;
                }

                .booking-bottom {
                    display: flex;

                    justify-content:
                        space-between;

                    align-items: center;

                    padding-top: 13px;

                    border-top:
                        1px solid #eeeeee;
                }

                .booking-bottom strong {
                    font-size: 15px;
                }

                .view-booking-button {
                    border: none;

                    background: #ff7818;

                    color: #ffffff;

                    border-radius: 8px;

                    padding:
                        9px
                        14px;

                    font-size: 11px;

                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        0.2s ease;
                }

                .view-booking-button:hover {
                    background: #e9660b;
                }


                /* =================================================
                   POPULAR ROUTES
                ================================================= */

                .popular-section {
                    padding:
                        0
                        34px
                        50px;
                }

                .popular-header {
                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    max-width: 900px;

                    margin:
                        0
                        auto
                        18px;
                }

                .popular-header h2 {
                    margin: 0;

                    font-size: 22px;

                    color: #222222;

                    font-weight: 750;
                }

                .popular-header span {
                    color: #999999;

                    font-size: 12px;
                }

                .popular-routes {
                    width: 100%;

                    max-width: 900px;

                    margin: 0 auto;

                    display: grid;

                    grid-template-columns:
                        repeat(
                            2,
                            minmax(
                                280px,
                                1fr
                            )
                        );

                    justify-content: center;

                    gap: 22px;
                }

                .popular-route {
                    position: relative;

                    width: 100%;

                    min-height: 135px;

                    border:
                        1px solid #eeeeee;

                    border-radius: 18px;

                    background:
                        linear-gradient(
                            135deg,
                            #ffffff 0%,
                            #fffaf7 55%,
                            #fff4eb 100%
                        );

                    padding: 20px;

                    cursor: pointer;

                    text-align: left;

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        border-color 0.2s ease;
                }

                .popular-route:hover {
                    transform:
                        translateY(-4px);

                    border-color:
                        #ffd7bd;

                    box-shadow:
                        0
                        12px
                        28px
                        rgba(
                            255,
                            120,
                            24,
                            0.12
                        );
                }

                .route-icon {
                    width: 46px;
                    height: 46px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border-radius: 13px;

                    background:
                        #fff0e5;

                    font-size: 21px;

                    margin-bottom: 15px;
                }

                .route-name {
                    font-size: 15px;

                    font-weight: 750;

                    color: #222222;

                    margin-bottom: 6px;

                    padding-right: 75px;
                }

                .route-duration {
                    font-size: 11px;

                    color: #888888;
                }

                .route-fare {
                    position: absolute;

                    top: 20px;
                    right: 20px;

                    color: #222222;

                    font-size: 14px;

                    font-weight: 800;

                    text-align: right;
                }

                .route-fare small {
                    display: block;

                    margin-top: 2px;

                    color: #999999;

                    font-size: 9px;

                    font-weight: 400;

                    text-align: right;
                }


                /* =================================================
                   NO BOOKINGS
                ================================================= */

                .no-bookings {
                    min-height: 210px;

                    display: flex;

                    flex-direction: column;

                    align-items: center;

                    justify-content: center;

                    text-align: center;

                    border:
                        1px dashed #dddddd;

                    border-radius: 18px;

                    background: #fcfcfc;

                    padding: 30px;
                }

                .empty-icon {
                    width: 58px;
                    height: 58px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    margin-bottom: 14px;

                    border-radius: 16px;

                    background: #fff3eb;

                    font-size: 27px;
                }

                .no-bookings h3 {
                    margin:
                        0
                        0
                        7px;

                    font-size: 16px;
                }

                .no-bookings p {
                    margin:
                        0
                        0
                        18px;

                    color: #999999;

                    font-size: 13px;
                }

                .no-bookings button {
                    border: none;

                    background: #ff7818;

                    color: #ffffff;

                    padding:
                        11px
                        18px;

                    border-radius: 8px;

                    font-weight: 600;

                    cursor: pointer;
                }


                /* =================================================
                   BOTTOM NAVIGATION
                ================================================= */

                .bottom-navigation {
                    position: fixed;

                    left: 50%;
                    bottom: 0;

                    transform:
                        translateX(-50%);

                    z-index: 100;

                    width: 100%;

                    max-width: 1200px;

                    height: 76px;

                    display: grid;

                    grid-template-columns:
                        repeat(
                            4,
                            1fr
                        );

                    background:
                        rgba(
                            255,
                            255,
                            255,
                            0.97
                        );

                    border-top:
                        1px solid #e9e9e9;

                    box-shadow:
                        0
                        -5px
                        25px
                        rgba(
                            0,
                            0,
                            0,
                            0.045
                        );

                    backdrop-filter:
                        blur(12px);
                }

                .nav-item {
                    position: relative;

                    border: none;

                    background:
                        transparent;

                    display: flex;

                    flex-direction: column;

                    align-items: center;

                    justify-content: center;

                    gap: 5px;

                    color: #999999;

                    cursor: pointer;

                    transition:
                        color 0.2s ease;
                }

                .nav-item span {
                    font-size: 21px;
                }

                .nav-item small {
                    font-size: 11px;
                }

                .nav-item:hover,
                .nav-item.active {
                    color: #ff7818;
                }

                .nav-item.active::before {
                    content: "";

                    position: absolute;

                    top: 0;
                    left: 50%;

                    transform:
                        translateX(-50%);

                    width: 34px;
                    height: 3px;

                    border-radius:
                        0 0 5px 5px;

                    background:
                        #ff7818;
                }


                /* =================================================
                   TABLET
                ================================================= */

                @media (max-width: 900px) {

                    .popular-routes {
                        max-width: 760px;

                        grid-template-columns:
                            repeat(
                                2,
                                minmax(
                                    260px,
                                    1fr
                                )
                            );
                    }
                }

                @media (max-width: 768px) {

                    .dashboard-header {
                        height: 70px;

                        padding:
                            0
                            22px;
                    }

                    .welcome-section {
                        margin:
                            25px
                            22px;

                        padding:
                            48px
                            20px
                            50px;
                    }

                    .quick-actions {
                        padding:
                            0
                            22px
                            32px;

                        gap: 15px;
                    }

                    .recent-bookings,
                    .popular-section {
                        padding-left: 22px;
                        padding-right: 22px;
                    }

                    .popular-routes {
                        max-width: 650px;

                        grid-template-columns:
                            repeat(
                                2,
                                minmax(
                                    0,
                                    1fr
                                )
                            );

                        gap: 16px;
                    }

                    .popular-route {
                        min-height: 130px;
                    }
                }


                /* =================================================
                   MOBILE
                ================================================= */

                @media (max-width: 600px) {

                    .dashboard-page {
                        padding-bottom: 80px;
                    }

                    .dashboard-header {
                        height: 64px;

                        padding:
                            0
                            16px;
                    }

                    .dashboard-logo img {
                        width: 92px;
                        height: 48px;
                    }

                    .menu-button {
                        width: 38px;
                        height: 38px;
                    }

                    .welcome-section {
                        margin:
                            18px
                            16px
                            25px;

                        min-height: 260px;

                        padding:
                            42px
                            17px
                            44px;

                        border-radius: 18px;

                        background-position:
                            center center;
                    }

                    .welcome-section h1 {
                        font-size: 30px;
                    }

                    .welcome-section p {
                        font-size: 14px;
                    }

                    .book-button {
                        width: 100%;

                        max-width: 230px;
                    }

                    .quick-actions {
                        grid-template-columns: 1fr;

                        padding:
                            0
                            16px
                            30px;
                    }

                    .feature-card {
                        min-height: 125px;
                    }

                    .recent-bookings,
                    .popular-section {
                        padding-left: 16px;
                        padding-right: 16px;
                    }

                    .section-header h2,
                    .popular-header h2 {
                        font-size: 19px;
                    }

                    .popular-header {
                        margin-bottom: 14px;
                    }

                    .popular-header span {
                        font-size: 10px;
                    }

                    .popular-routes {
                        max-width: 100%;

                        grid-template-columns: 1fr;

                        gap: 13px;
                    }

                    .popular-route {
                        min-height: 125px;

                        padding: 18px;
                    }

                    .route-name {
                        font-size: 14px;
                    }

                    .route-duration {
                        font-size: 10px;
                    }

                    .route-fare {
                        top: 18px;
                        right: 18px;
                    }

                    .booking-info {
                        grid-template-columns:
                            repeat(
                                2,
                                1fr
                            );
                    }

                    .bottom-navigation {
                        height: 68px;
                    }

                    .nav-item span {
                        font-size: 20px;
                    }

                    .nav-item small {
                        font-size: 10px;
                    }
                }

                /* =========================================================
   LOGOUT CONFIRMATION MODAL
========================================================= */

.logout-overlay {
    position: fixed;

    inset: 0;

    z-index: 9999;

    display: flex;

    align-items: center;
    justify-content: center;

    padding: 20px;

    background:
        rgba(0, 0, 0, 0.45);

    backdrop-filter:
        blur(5px);

    -webkit-backdrop-filter:
        blur(5px);

    animation:
        logoutFadeIn 0.2s ease;
}

.logout-modal {
    width: 100%;
    max-width: 390px;

    background: #ffffff;

    border-radius: 20px;

    padding: 30px 26px 25px;

    text-align: center;

    box-shadow:
        0 20px 60px
        rgba(0, 0, 0, 0.20);

    animation:
        logoutModalIn 0.25s ease;
}

.logout-icon {
    width: 58px;
    height: 58px;

    margin:
        0 auto 16px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background:
        #fff1e6;

    color:
        #ff7818;

    font-size: 28px;

    font-weight: 800;
}

.logout-modal h2 {
    margin:
        0 0 10px;

    color:
        #171717;

    font-size:
        22px;

    font-weight:
        750;
}

.logout-modal p {
    margin:
        0 auto 25px;

    max-width:
        300px;

    color:
        #777777;

    font-size:
        14px;

    line-height:
        1.6;
}

.logout-actions {
    display:
        grid;

    grid-template-columns:
        1fr 1fr;

    gap:
        12px;
}

.logout-cancel-button,
.logout-confirm-button {
    height:
        46px;

    border:
        none;

    border-radius:
        10px;

    font-family:
        inherit;

    font-size:
        14px;

    font-weight:
        700;

    cursor:
        pointer;

    transition:
        0.2s ease;
}

.logout-cancel-button {
    background:
        #f2f2f2;

    color:
        #333333;
}

.logout-cancel-button:hover {
    background:
        #e7e7e7;
}

.logout-confirm-button {
    background:
        #ff7818;

    color:
        #ffffff;
}

.logout-confirm-button:hover {
    background:
        #e9670d;

    transform:
        translateY(-1px);

    box-shadow:
        0 6px 15px
        rgba(255, 120, 24, 0.25);
}

.logout-confirm-button:active,
.logout-cancel-button:active {
    transform:
        translateY(0);
}

@keyframes logoutFadeIn {

    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }

}

@keyframes logoutModalIn {

    from {
        opacity: 0;

        transform:
            scale(0.92)
            translateY(10px);
    }

    to {
        opacity: 1;

        transform:
            scale(1)
            translateY(0);
    }

}

@media (max-width: 480px) {

    .logout-modal {
        max-width:
            340px;

        padding:
            26px 20px 22px;

        border-radius:
            18px;
    }

    .logout-modal h2 {
        font-size:
            20px;
    }

    .logout-modal p {
        font-size:
            13px;
    }

    .logout-actions {
        gap:
            9px;
    }

}
            `}</style>


            <main className="dashboard-page">

                <div className="dashboard-container">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <header className="dashboard-header">

                        <div className="dashboard-logo">

                            <img
                                src={logoUrl}
                                alt="GuimarasGo Logo"
                            />

                        </div>

                        <button
    type="button"
    className="menu-button"
    onClick={handleLogoutClick}
    aria-label="Logout"
>
    ⇥
</button>

                    </header>


                    {/* =================================================
                        WELCOME
                    ================================================= */}

                    <section className="welcome-section">

                        <h1>
                            Welcome to GuimarasGo
                        </h1>

                        <p>
                            Your Gateway to Island Adventures
                        </p>

                        <button
                            type="button"
                            className="book-button"
                            onClick={goToBooking}
                        >
                            Book a Trip
                        </button>

                    </section>


                    {/* =================================================
                        QUICK ACTIONS
                    ================================================= */}

                    <section className="quick-actions">

                        <button
                            type="button"
                            className="feature-card"
                            onClick={() =>
                                navigate("/bookings")
                            }
                        >

                            <span className="feature-icon">
                                🎫
                            </span>

                            <span className="feature-title">
                                My Bookings
                            </span>

                            <span className="feature-description">
                                View your reservations
                            </span>

                        </button>


                        <button
                            type="button"
                            className="feature-card"
                            onClick={() =>
                                navigate("/trips")
                            }
                        >

                            <span className="feature-icon">
                                ⛴️
                            </span>

                            <span className="feature-title">
                                Available Trips
                            </span>

                            <span className="feature-description">
                                Find your next trip
                            </span>

                        </button>

                    </section>


                    {/* =================================================
                        RECENT BOOKINGS
                    ================================================= */}

                    <section className="recent-bookings">

                        <div className="section-header">

                            <h2>
                                Recent Bookings
                            </h2>

                            <button
                                type="button"
                                onClick={viewAllBookings}
                            >
                                View All
                            </button>

                        </div>


                        {recentBookings.length === 0 ? (

                            <div className="no-bookings">

                                <div className="empty-icon">
                                    🎫
                                </div>

                                <h3>
                                    No Recent Bookings
                                </h3>

                                <p>
                                    You don't have any
                                    recent bookings yet.
                                </p>

                                <button
                                    type="button"
                                    onClick={goToBooking}
                                >
                                    Book a Trip
                                </button>

                            </div>

                        ) : (

                            <div className="booking-list">

                                {recentBookings.map(
                                    (booking, index) => (

                                    <div
                                        className="recent-booking-card"
                                        key={
                                            booking.bookingReference ||
                                            index
                                        }
                                    >

                                        <div className="booking-top">

                                            <div>

                                                <strong>
                                                    {booking.origin}
                                                    {" → "}
                                                    {booking.destination}
                                                </strong>

                                                <span className="booking-reference">
                                                    {
                                                        booking.bookingReference ||
                                                        "Booking"
                                                    }
                                                </span>

                                            </div>

                                            <span className="confirmed">
                                                {
                                                    booking.status ||
                                                    "CONFIRMED"
                                                }
                                            </span>

                                        </div>


                                        <div className="booking-info">

                                            <div>

                                                <small>
                                                    Date
                                                </small>

                                                <strong>
                                                    {
                                                        booking.date ||
                                                        "N/A"
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <small>
                                                    Departure
                                                </small>

                                                <strong>
                                                    {
                                                        booking.time ||
                                                        "N/A"
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <small>
                                                    Vehicle
                                                </small>

                                                <strong>
                                                    {
                                                        booking.vehicleType ||
                                                        booking.vehicle ||
                                                        "Motorcycle"
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        <div className="booking-bottom">

                                            <strong>
                                                ₱
                                                {
                                                    Number(
                                                        booking.totalFare ||
                                                        booking.totalPaid ||
                                                        0
                                                    ).toFixed(2)
                                                }
                                            </strong>

                                            <button
                                                type="button"
                                                className="view-booking-button"
                                                onClick={() =>
                                                    viewBooking(
                                                        booking
                                                    )
                                                }
                                            >
                                                View Booking
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        POPULAR ROUTES
                    ================================================= */}

                    <section className="popular-section">

                        <div className="popular-header">

                            <h2>
                                Popular Routes
                            </h2>

                            <span>
                                GuimarasGo Ferry Routes
                            </span>

                        </div>


                        <div className="popular-routes">

                            {popularRoutes.map(
                                (route, index) => (

                                <button
                                    type="button"
                                    className="popular-route"
                                    key={index}
                                    onClick={() =>
                                        navigate(
                                            "/book-trip"
                                        )
                                    }
                                >

                                    <div className="route-icon">
                                        {route.icon}
                                    </div>

                                    <div className="route-name">
                                        {route.origin}
                                        {" → "}
                                        {route.destination}
                                    </div>

                                    <div className="route-duration">
                                        Travel time:
                                        {" "}
                                        {route.duration}
                                    </div>

                                    <div className="route-fare">
                                        {route.fare}

                                        <small>
                                            Starting fare
                                        </small>
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>
{/* =========================================================
    LOGOUT CONFIRMATION MODAL
========================================================= */}

{showLogoutModal && (

    <div
        className="logout-overlay"
        onClick={handleCancelLogout}
    >

        <div
            className="logout-modal"
            onClick={(event) =>
                event.stopPropagation()
            }
        >

            <div className="logout-icon">
                ⇥
            </div>

            <h2>
                Logout?
            </h2>

            <p>
                Are you sure you want to log out
                of your GuimarasGo account?
            </p>

            <div className="logout-actions">

                <button
                    type="button"
                    className="logout-cancel-button"
                    onClick={handleCancelLogout}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="logout-confirm-button"
                    onClick={handleConfirmLogout}
                >
                    Logout
                </button>

            </div>

        </div>

    </div>

)}

                    {/* =================================================
                        BOTTOM NAVIGATION
                    ================================================= */}

                    <nav className="bottom-navigation">

                        <button
                            type="button"
                            className="nav-item active"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            <span>
                                ⌂
                            </span>

                            <small>
                                Home
                            </small>
                        </button>


                        <button
                            type="button"
                            className="nav-item"
                            onClick={() =>
                                navigate("/book-trip")
                            }
                        >
                            <span>
                                ⛴️
                            </span>

                            <small>
                                Book
                            </small>
                        </button>


                        <button
                            type="button"
                            className="nav-item"
                            onClick={() =>
                                navigate("/bookings")
                            }
                        >
                            <span>
                                🎫
                            </span>

                            <small>
                                Tickets
                            </small>
                        </button>


                        <button
                            type="button"
                            className="nav-item"
                            onClick={() =>
                                navigate("/profile")
                            }
                        >
                            <span>
                                ◯
                            </span>

                            <small>
                                Profile
                            </small>
                        </button>

                    </nav>

                </div>

            </main>
        </>
    );
};

export default Dashboard;