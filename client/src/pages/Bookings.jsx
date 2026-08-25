import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [cancelTarget, setCancelTarget] = useState(null);
    const [clearCancelledModal, setClearCancelledModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState("ALL");

    // =========================================================
    // LOAD ALL BOOKINGS
    // =========================================================

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = () => {
        try {
            const saved = sessionStorage.getItem("allBookings");

            if (!saved) {
                setBookings([]);
                return;
            }

            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                setBookings([...parsed].reverse());
            } else {
                setBookings([]);
            }

        } catch (error) {
            console.error("Error loading bookings:", error);
            setBookings([]);
        }
    };

    // =========================================================
    // VIEW BOOKING
    // =========================================================

    const viewBooking = (booking) => {
        sessionStorage.setItem(
            "confirmedBooking",
            JSON.stringify(booking)
        );

        navigate("/confirmation");
    };

    // =========================================================
    // OPEN CANCEL MODAL
    // =========================================================

    const askCancel = (booking) => {
        setCancelTarget(booking);
    };

    // =========================================================
    // CLOSE CANCEL MODAL
    // =========================================================

    const closeCancelModal = () => {
        setCancelTarget(null);
    };

    // =========================================================
    // CONFIRM CANCELLATION
    // =========================================================

    const confirmCancellation = () => {
        if (!cancelTarget) {
            return;
        }

        const bookingReference =
            cancelTarget.bookingReference;

        try {
            // -------------------------------------------------
            // GET ALL BOOKINGS
            // -------------------------------------------------

            const saved =
                sessionStorage.getItem("allBookings");

            let allBookings = [];

            if (saved) {
                const parsed = JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    allBookings = parsed;
                }
            }

            // -------------------------------------------------
            // CHANGE STATUS ONLY
            // DO NOT DELETE THE BOOKING
            // -------------------------------------------------

            const updatedBookings =
                allBookings.map((booking) => {

                    if (
                        booking.bookingReference ===
                        bookingReference
                    ) {
                        return {
                            ...booking,
                            status: "CANCELLED"
                        };
                    }

                    return booking;
                });

            // -------------------------------------------------
            // SAVE BACK TO ALL BOOKINGS
            // -------------------------------------------------

            sessionStorage.setItem(
                "allBookings",
                JSON.stringify(updatedBookings)
            );

            // -------------------------------------------------
            // UPDATE RECENT BOOKINGS
            // -------------------------------------------------

            const savedRecent =
                sessionStorage.getItem("recentBookings");

            if (savedRecent) {
                try {
                    const recentBookings =
                        JSON.parse(savedRecent);

                    if (Array.isArray(recentBookings)) {

                        const updatedRecent =
                            recentBookings.map((booking) => {

                                if (
                                    booking.bookingReference ===
                                    bookingReference
                                ) {
                                    return {
                                        ...booking,
                                        status: "CANCELLED"
                                    };
                                }

                                return booking;
                            });

                        sessionStorage.setItem(
                            "recentBookings",
                            JSON.stringify(updatedRecent)
                        );
                    }

                } catch (recentError) {
                    console.error(
                        "Error updating recent bookings:",
                        recentError
                    );
                }
            }

            // -------------------------------------------------
            // UPDATE CONFIRMED BOOKING
            // -------------------------------------------------

            const confirmed =
                sessionStorage.getItem(
                    "confirmedBooking"
                );

            if (confirmed) {

                try {
                    const currentBooking =
                        JSON.parse(confirmed);

                    if (
                        currentBooking.bookingReference ===
                        bookingReference
                    ) {

                        sessionStorage.setItem(
                            "confirmedBooking",
                            JSON.stringify({
                                ...currentBooking,
                                status: "CANCELLED"
                            })
                        );
                    }

                } catch (confirmedError) {
                    console.error(
                        "Error updating confirmed booking:",
                        confirmedError
                    );
                }
            }

            // -------------------------------------------------
            // UPDATE UI
            // -------------------------------------------------

            setBookings(
                [...updatedBookings].reverse()
            );

            setCancelTarget(null);

        } catch (error) {

            console.error(
                "Error cancelling booking:",
                error
            );
        }
    };

    // =========================================================
    // OPEN DELETE ALL CANCELLED MODAL
    // =========================================================

    const askClearCancelled = () => {
        const cancelledCount =
            bookings.filter((booking) => {

                const status =
                    (
                        booking.status ||
                        "PENDING"
                    ).toUpperCase();

                return status === "CANCELLED";

            }).length;

        if (cancelledCount === 0) {
            return;
        }

        setClearCancelledModal(true);
    };

    // =========================================================
    // CLOSE DELETE ALL CANCELLED MODAL
    // =========================================================

    const closeClearCancelledModal = () => {
        setClearCancelledModal(false);
    };

    // =========================================================
    // CONFIRM DELETE ALL CANCELLED
    // =========================================================

    const confirmClearCancelled = () => {

        try {

            // -------------------------------------------------
            // GET ALL BOOKINGS
            // -------------------------------------------------

            const saved =
                sessionStorage.getItem("allBookings");

            let allBookings = [];

            if (saved) {

                try {

                    const parsed =
                        JSON.parse(saved);

                    if (Array.isArray(parsed)) {
                        allBookings = parsed;
                    }

                } catch (error) {

                    console.error(
                        "Error parsing allBookings:",
                        error
                    );

                }
            }

            // -------------------------------------------------
            // KEEP ONLY NON-CANCELLED BOOKINGS
            // -------------------------------------------------

            const remainingBookings =
                allBookings.filter((booking) => {

                    const status =
                        (
                            booking.status ||
                            "PENDING"
                        ).toUpperCase();

                    return status !== "CANCELLED";

                });

            // -------------------------------------------------
            // SAVE UPDATED ALL BOOKINGS
            // -------------------------------------------------

            sessionStorage.setItem(
                "allBookings",
                JSON.stringify(remainingBookings)
            );

            // -------------------------------------------------
            // REMOVE CANCELLED BOOKINGS FROM RECENT BOOKINGS
            // -------------------------------------------------

            const savedRecent =
                sessionStorage.getItem("recentBookings");

            if (savedRecent) {

                try {

                    const recentBookings =
                        JSON.parse(savedRecent);

                    if (Array.isArray(recentBookings)) {

                        const remainingRecent =
                            recentBookings.filter(
                                (booking) => {

                                    const status =
                                        (
                                            booking.status ||
                                            "PENDING"
                                        ).toUpperCase();

                                    return status !==
                                        "CANCELLED";
                                }
                            );

                        sessionStorage.setItem(
                            "recentBookings",
                            JSON.stringify(
                                remainingRecent
                            )
                        );
                    }

                } catch (recentError) {

                    console.error(
                        "Error clearing cancelled recent bookings:",
                        recentError
                    );

                }
            }

            // -------------------------------------------------
            // REMOVE CONFIRMED BOOKING IF IT IS CANCELLED
            // -------------------------------------------------

            const confirmed =
                sessionStorage.getItem(
                    "confirmedBooking"
                );

            if (confirmed) {

                try {

                    const currentBooking =
                        JSON.parse(confirmed);

                    const confirmedStatus =
                        (
                            currentBooking.status ||
                            "PENDING"
                        ).toUpperCase();

                    if (
                        confirmedStatus ===
                        "CANCELLED"
                    ) {
                        sessionStorage.removeItem(
                            "confirmedBooking"
                        );
                    }

                } catch (confirmedError) {

                    console.error(
                        "Error clearing confirmed booking:",
                        confirmedError
                    );

                }
            }

            // -------------------------------------------------
            // UPDATE UI
            // -------------------------------------------------

            setBookings(
                [...remainingBookings].reverse()
            );

            // -------------------------------------------------
            // CLOSE MODAL
            // -------------------------------------------------

            setClearCancelledModal(false);

            // -------------------------------------------------
            // RETURN TO CANCELLED FILTER
            // -------------------------------------------------

            setActiveFilter("CANCELLED");

        } catch (error) {

            console.error(
                "Error clearing cancelled bookings:",
                error
            );

        }
    };

    // =========================================================
    // FILTER BOOKINGS
    // =========================================================

    const filteredBookings =
        bookings.filter((booking) => {

            const status =
                (
                    booking.status ||
                    "PENDING"
                ).toUpperCase();

            // ALL
            if (activeFilter === "ALL") {
                return true;
            }

            // PAID
            if (activeFilter === "PAID") {
                return status === "PAID";
            }

            // PENDING
            if (activeFilter === "PENDING") {
                return (
                    status === "PENDING" ||
                    status === "CONFIRMED"
                );
            }

            // CANCELLED
            if (activeFilter === "CANCELLED") {
                return status === "CANCELLED";
            }

            return true;
        });

    // =========================================================
    // SECTION TITLE
    // =========================================================

    const getSectionTitle = () => {

        if (activeFilter === "PAID") {
            return "Paid Bookings";
        }

        if (activeFilter === "PENDING") {
            return "Pending Bookings";
        }

        if (activeFilter === "CANCELLED") {
            return "Cancelled Bookings";
        }

        return "All Bookings";
    };

    // =========================================================
    // STATUS CLASS
    // =========================================================

    const getStatusClass = (status) => {

        if (status === "PAID") {
            return "status-paid";
        }

        if (status === "COMPLETED") {
            return "status-completed";
        }

        if (status === "CANCELLED") {
            return "status-cancelled";
        }

        if (status === "CONFIRMED") {
            return "status-confirmed";
        }

        return "status-pending";
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

                    background: #f7f8fa;
                    color: #222;
                }

                button {
                    font-family: inherit;
                }

                .bookings-page {
                    min-height: 100vh;
                    min-height: 100dvh;

                    background:
                        linear-gradient(
                            180deg,
                            #fffaf7,
                            #f7f8fa
                        );

                    padding-bottom: 40px;
                }

                .bookings-container {
                    width: 100%;
                    max-width: 900px;

                    margin: 0 auto;

                    min-height: 100vh;

                    background: #ffffff;

                    padding:
                        25px
                        30px
                        50px;
                }

                /* HEADER */

                .bookings-header {
                    display: flex;
                    align-items: center;

                    gap: 15px;

                    margin-bottom: 28px;
                }

                .back-button {
                    width: 42px;
                    height: 42px;

                    border: 1px solid #eeeeee;

                    border-radius: 12px;

                    background: #ffffff;

                    font-size: 20px;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .back-button:hover {
                    background: #fff3eb;
                    color: #ff7818;
                    border-color: #ffd5bd;
                }

                .bookings-title h1 {
                    margin: 0;

                    font-size: 27px;

                    font-weight: 800;
                }

                .bookings-title p {
                    margin: 4px 0 0;

                    color: #888;

                    font-size: 13px;
                }

                /* FILTERS */

                .booking-filters {
                    width: 100%;
                    max-width: 430px;

                    display: grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap: 4px;

                    padding: 4px;

                    margin-bottom: 28px;

                    background: #f5f5f5;

                    border: 1px solid #e8e8e8;

                    border-radius: 11px;
                }

                .filter-button {
                    height: 38px;

                    border: none;

                    border-radius: 8px;

                    background: transparent;

                    color: #666;

                    font-size: 11px;

                    font-weight: 500;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .filter-button:hover {
                    color: #ff7818;
                }

                .filter-button.active {
                    background: #ff7818;

                    color: #ffffff;

                    font-weight: 700;

                    box-shadow:
                        0 3px 8px
                        rgba(
                            255,
                            120,
                            24,
                            0.20
                        );
                }

                /* SECTION */

                .booking-section-title {
                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    margin-bottom: 18px;
                }

                .booking-section-left {
                    display: flex;

                    align-items: center;

                    gap: 10px;
                }

                .booking-section-title h2 {
                    margin: 0;

                    font-size: 16px;

                    font-weight: 600;

                    color: #222;
                }

                .booking-count {
                    min-width: 27px;
                    height: 27px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    border-radius: 50%;

                    background: #fff1e8;

                    color: #ff7818;

                    font-size: 10px;

                    font-weight: 700;
                }

                /* DELETE ALL BUTTON */

                .clear-cancelled-button {
                    border: 1px solid #ffd2d2;

                    background: #fff4f4;

                    color: #d9534f;

                    padding:
                        9px
                        13px;

                    border-radius: 9px;

                    font-size: 10px;

                    font-weight: 700;

                    cursor: pointer;

                    transition: 0.2s ease;

                    white-space: nowrap;
                }

                .clear-cancelled-button:hover {
                    background: #ffe3e3;

                    border-color: #ffbcbc;

                    transform:
                        translateY(-1px);
                }

                /* CARDS */

                .history-list {
                    display: flex;

                    flex-direction: column;

                    gap: 16px;
                }

                .history-card {
                    background: #ffffff;

                    border: 1px solid #e8e8e8;

                    border-radius: 17px;

                    padding: 20px;

                    box-shadow:
                        0 5px 20px
                        rgba(
                            0,
                            0,
                            0,
                            0.045
                        );

                    transition: 0.2s ease;
                }

                .history-card:hover {
                    border-color: #ffd8c1;

                    box-shadow:
                        0 10px 30px
                        rgba(
                            255,
                            120,
                            24,
                            0.08
                        );
                }

                .history-top {
                    display: flex;

                    align-items: flex-start;

                    justify-content:
                        space-between;

                    gap: 15px;

                    padding-bottom: 15px;

                    border-bottom:
                        1px solid #eeeeee;
                }

                .history-route {
                    display: flex;

                    align-items: center;

                    gap: 10px;
                }

                .route-icon-large {
                    width: 45px;
                    height: 45px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    border-radius: 13px;

                    background: #fff0e5;

                    font-size: 21px;
                }

                .history-route strong {
                    display: block;

                    font-size: 16px;

                    font-weight: 700;
                }

                .history-reference {
                    display: block;

                    margin-top: 4px;

                    color: #999;

                    font-size: 11px;
                }

                /* STATUS */

                .status {
                    padding: 6px 10px;

                    border-radius: 20px;

                    font-size: 9px;

                    font-weight: 700;

                    white-space: nowrap;
                }

                .status-confirmed,
                .status-pending {
                    background: #fff1e5;

                    color: #ff7818;
                }

                .status-paid {
                    background: #e9f8ef;

                    color: #168b45;
                }

                .status-completed {
                    background: #eef2ff;

                    color: #5267b7;
                }

                .status-cancelled {
                    background: #fff0f0;

                    color: #d9534f;
                }

                /* DETAILS */

                .history-details {
                    display: grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap: 15px;

                    padding: 17px 0;
                }

                .detail-item small {
                    display: block;

                    color: #999;

                    font-size: 10px;

                    margin-bottom: 5px;
                }

                .detail-item strong {
                    display: block;

                    color: #222;

                    font-size: 12px;

                    font-weight: 500;
                }

                /* BOTTOM */

                .history-bottom {
                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    padding-top: 15px;

                    border-top:
                        1px solid #eeeeee;
                }

                .history-fare small {
                    display: block;

                    color: #999;

                    font-size: 10px;

                    margin-bottom: 3px;
                }

                .history-fare strong {
                    font-size: 18px;

                    font-weight: 700;
                }

                .history-actions {
                    display: flex;

                    gap: 8px;
                }

                .view-button,
                .cancel-button {
                    border: none;

                    border-radius: 9px;

                    padding:
                        10px
                        14px;

                    font-size: 11px;

                    font-weight: 700;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .view-button {
                    background: #ff7818;

                    color: #ffffff;
                }

                .view-button:hover {
                    background: #e9660b;

                    transform:
                        translateY(-1px);
                }

                .cancel-button {
                    background: #fff0f0;

                    color: #d9534f;

                    border:
                        1px solid #ffd5d5;
                }

                .cancel-button:hover {
                    background: #ffe0e0;
                }

                /* EMPTY */

                .empty-history {
                    min-height: 350px;

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

                .empty-history-icon {
                    width: 70px;
                    height: 70px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background: #fff3eb;

                    border-radius: 20px;

                    font-size: 30px;

                    margin-bottom: 16px;
                }

                .empty-history h2 {
                    margin: 0 0 7px;

                    font-size: 20px;
                }

                .empty-history p {
                    margin: 0 0 20px;

                    color: #999;

                    font-size: 13px;
                }

                .book-now-button {
                    border: none;

                    background:
                        linear-gradient(
                            135deg,
                            #ff7818,
                            #ff951f
                        );

                    color: white;

                    padding: 12px 22px;

                    border-radius: 9px;

                    font-weight: 700;

                    cursor: pointer;
                }

                /* MODAL */

                .modal-overlay {
                    position: fixed;

                    inset: 0;

                    z-index: 500;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    padding: 20px;

                    background:
                        rgba(
                            0,
                            0,
                            0,
                            0.45
                        );

                    backdrop-filter:
                        blur(4px);
                }

                .cancel-modal {
                    width: 100%;

                    max-width: 420px;

                    background: #ffffff;

                    border-radius: 20px;

                    padding: 28px;

                    text-align: center;

                    box-shadow:
                        0 25px 70px
                        rgba(
                            0,
                            0,
                            0,
                            0.20
                        );

                    animation:
                        modalIn
                        0.2s ease;
                }

                @keyframes modalIn {

                    from {
                        opacity: 0;

                        transform:
                            translateY(10px)
                            scale(0.97);
                    }

                    to {
                        opacity: 1;

                        transform:
                            translateY(0)
                            scale(1);
                    }
                }

                .cancel-icon {
                    width: 60px;
                    height: 60px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    margin: 0 auto 16px;

                    border-radius: 18px;

                    background: #fff3eb;

                    color: #ff7818;

                    font-size: 27px;

                    font-weight: 800;
                }

                .cancel-modal h2 {
                    margin: 0 0 8px;

                    font-size: 20px;

                    font-weight: 700;
                }

                .cancel-modal p {
                    margin: 0 0 8px;

                    color: #777;

                    font-size: 13px;

                    line-height: 1.5;
                }

                .cancel-reference {
                    display: inline-block;

                    margin: 8px 0 22px;

                    padding: 7px 10px;

                    border-radius: 7px;

                    background: #f7f7f7;

                    color: #555;

                    font-size: 11px;

                    font-weight: 700;
                }

                .modal-actions {
                    display: grid;

                    grid-template-columns:
                        1fr 1fr;

                    gap: 10px;
                }

                .close-cancel,
                .confirm-cancel {
                    border: none;

                    padding: 12px;

                    border-radius: 9px;

                    font-weight: 700;

                    cursor: pointer;
                }

                .close-cancel {
                    background: #f1f1f1;

                    color: #555;
                }

                .close-cancel:hover {
                    background: #e7e7e7;
                }

                .confirm-cancel {
                    background: #d9534f;

                    color: #ffffff;
                }

                .confirm-cancel:hover {
                    background: #c43f3b;
                }

                /* DELETE ALL MODAL */

                .clear-modal {
                    width: 100%;

                    max-width: 440px;

                    background: #ffffff;

                    border-radius: 20px;

                    padding: 30px;

                    text-align: center;

                    box-shadow:
                        0 25px 70px
                        rgba(
                            0,
                            0,
                            0,
                            0.20
                        );

                    animation:
                        modalIn
                        0.2s ease;
                }

                .clear-icon {
                    width: 64px;
                    height: 64px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    margin: 0 auto 16px;

                    border-radius: 18px;

                    background: #fff0f0;

                    color: #d9534f;

                    font-size: 28px;

                    font-weight: 800;
                }

                .clear-modal h2 {
                    margin: 0 0 9px;

                    font-size: 21px;

                    font-weight: 700;

                    color: #222;
                }

                .clear-modal p {
                    margin: 0 auto 22px;

                    max-width: 340px;

                    color: #777;

                    font-size: 13px;

                    line-height: 1.6;
                }

                .clear-count {
                    color: #d9534f;

                    font-weight: 700;
                }

                .delete-all-button {
                    border: none;

                    padding: 12px;

                    border-radius: 9px;

                    font-weight: 700;

                    cursor: pointer;

                    background: #d9534f;

                    color: #ffffff;
                }

                .delete-all-button:hover {
                    background: #c43f3b;
                }

                /* MOBILE */

                @media (max-width: 650px) {

                    .bookings-container {
                        padding:
                            18px
                            16px
                            40px;
                    }

                    .bookings-title h1 {
                        font-size: 23px;
                    }

                    .booking-filters {
                        max-width: 100%;
                    }

                    .filter-button {
                        font-size: 10px;
                    }

                    .history-card {
                        padding: 16px;
                    }

                    .history-details {
                        grid-template-columns:
                            repeat(2, 1fr);

                        gap: 14px;
                    }

                    .history-bottom {
                        align-items:
                            flex-start;

                        gap: 15px;

                        flex-direction:
                            column;
                    }

                    .history-actions {
                        width: 100%;
                    }

                    .view-button,
                    .cancel-button {
                        flex: 1;
                    }

                    .booking-section-title {
                        align-items:
                            flex-start;

                        gap: 10px;
                    }

                    .booking-section-left {
                        flex-wrap: wrap;
                    }

                    .clear-cancelled-button {
                        padding:
                            8px
                            10px;

                        font-size: 9px;
                    }
                }

                @media (max-width: 420px) {

                    .booking-filters {
                        grid-template-columns:
                            repeat(2, 1fr);
                    }

                    .history-top {
                        gap: 10px;
                    }

                    .history-route strong {
                        font-size: 14px;
                    }

                    .status {
                        font-size: 8px;

                        padding:
                            5px
                            8px;
                    }

                    .booking-section-title {
                        flex-direction:
                            column;

                        align-items:
                            stretch;
                    }

                    .clear-cancelled-button {
                        width: 100%;
                    }
                }

            `}</style>

            <main className="bookings-page">

                <div className="bookings-container">

                    {/* HEADER */}

                    <header className="bookings-header">

                        <button
                            type="button"
                            className="back-button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            ←
                        </button>

                        <div className="bookings-title">

                            <h1>
                                My Bookings
                            </h1>

                            <p>
                                View and manage all your trips
                            </p>

                        </div>

                    </header>

                    {/* FILTERS */}

                    <div className="booking-filters">

                        <button
                            type="button"
                            className={`filter-button ${
                                activeFilter === "ALL"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setActiveFilter("ALL")
                            }
                        >
                            All
                        </button>

                        <button
                            type="button"
                            className={`filter-button ${
                                activeFilter === "PAID"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setActiveFilter("PAID")
                            }
                        >
                            Paid
                        </button>

                        <button
                            type="button"
                            className={`filter-button ${
                                activeFilter === "PENDING"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setActiveFilter("PENDING")
                            }
                        >
                            Pending
                        </button>

                        <button
                            type="button"
                            className={`filter-button ${
                                activeFilter === "CANCELLED"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setActiveFilter("CANCELLED")
                            }
                        >
                            Cancelled
                        </button>

                    </div>

                    {/* SECTION TITLE */}

                    <div className="booking-section-title">

                        <div className="booking-section-left">

                            <h2>
                                {getSectionTitle()}
                            </h2>

                            <span className="booking-count">
                                {filteredBookings.length}
                            </span>

                        </div>

                        {/* =================================================
                            DELETE ALL CANCELLED BUTTON
                            ONLY SHOWS IN CANCELLED FILTER
                           ================================================= */}

                        {activeFilter === "CANCELLED" &&
                            filteredBookings.length > 0 && (

                            <button
                                type="button"
                                className="clear-cancelled-button"
                                onClick={
                                    askClearCancelled
                                }
                            >
                                🗑 Delete All
                            </button>

                        )}

                    </div>

                    {/* BOOKINGS */}

                    {filteredBookings.length === 0 ? (

                        <div className="empty-history">

                            <div className="empty-history-icon">
                                🎫
                            </div>

                            <h2>
                                No {activeFilter.toLowerCase()} bookings
                            </h2>

                            <p>
                                There are no bookings in this category.
                            </p>

                            {activeFilter === "ALL" && (

                                <button
                                    type="button"
                                    className="book-now-button"
                                    onClick={() =>
                                        navigate("/trips")
                                    }
                                >
                                    Book a Trip
                                </button>

                            )}

                        </div>

                    ) : (

                        <div className="history-list">

                            {filteredBookings.map(
                                (booking, index) => {

                                    const status =
                                        (
                                            booking.status ||
                                            "PENDING"
                                        ).toUpperCase();

                                    return (

                                        <div
                                            className="history-card"
                                            key={
                                                booking.bookingReference ||
                                                index
                                            }
                                        >

                                            {/* TOP */}

                                            <div className="history-top">

                                                <div className="history-route">

                                                    <div className="route-icon-large">
                                                        ⛴️
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {booking.origin ||
                                                                "Iloilo"}
                                                            {" → "}
                                                            {booking.destination ||
                                                                "Guimaras"}
                                                        </strong>

                                                        <span className="history-reference">
                                                            {booking.bookingReference ||
                                                                "Booking Reference"}
                                                        </span>

                                                    </div>

                                                </div>

                                                <span
                                                    className={`status ${getStatusClass(
                                                        status
                                                    )}`}
                                                >
                                                    {status}
                                                </span>

                                            </div>

                                            {/* DETAILS */}

                                            <div className="history-details">

                                                <div className="detail-item">

                                                    <small>
                                                        Date
                                                    </small>

                                                    <strong>
                                                        {booking.date ||
                                                            "N/A"}
                                                    </strong>

                                                </div>

                                                <div className="detail-item">

                                                    <small>
                                                        Departure
                                                    </small>

                                                    <strong>
                                                        {booking.time ||
                                                            "N/A"}
                                                    </strong>

                                                </div>

                                                <div className="detail-item">

                                                    <small>
                                                        Passengers
                                                    </small>

                                                    <strong>
                                                        {booking.passengers ||
                                                            booking.numberOfPassengers ||
                                                            "N/A"}
                                                    </strong>

                                                </div>

                                                <div className="detail-item">

                                                    <small>
                                                        Vessel
                                                    </small>

                                                    <strong>
                                                        {booking.vesselName ||
                                                            booking.vessel ||
                                                            booking.ferryName ||
                                                            "Ferry"}
                                                    </strong>

                                                </div>

                                            </div>

                                            {/* BOTTOM */}

                                            <div className="history-bottom">

                                                <div className="history-fare">

                                                    <small>
                                                        Total Paid
                                                    </small>

                                                    <strong>
                                                        ₱
                                                        {Number(
                                                            booking.totalFare ||
                                                            0
                                                        ).toFixed(2)}
                                                    </strong>

                                                </div>

                                                <div className="history-actions">

                                                    <button
                                                        type="button"
                                                        className="view-button"
                                                        onClick={() =>
                                                            viewBooking(
                                                                booking
                                                            )
                                                        }
                                                    >
                                                        View Booking
                                                    </button>

                                                    {status !==
                                                        "CANCELLED" && (

                                                        <button
                                                            type="button"
                                                            className="cancel-button"
                                                            onClick={() =>
                                                                askCancel(
                                                                    booking
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    )}

                </div>

            </main>

            {/* =========================================================
                INDIVIDUAL CANCEL MODAL
               ========================================================= */}

            {cancelTarget && (

                <div
                    className="modal-overlay"
                    onClick={closeCancelModal}
                >

                    <div
                        className="cancel-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="cancel-icon">
                            !
                        </div>

                        <h2>
                            Cancel Booking?
                        </h2>

                        <p>
                            Are you sure you want to
                            cancel this booking?
                        </p>

                        <span className="cancel-reference">
                            {cancelTarget.bookingReference ||
                                "Booking"}
                        </span>

                        <div className="modal-actions">

                            <button
                                type="button"
                                className="close-cancel"
                                onClick={closeCancelModal}
                            >
                                Keep Booking
                            </button>

                            <button
                                type="button"
                                className="confirm-cancel"
                                onClick={
                                    confirmCancellation
                                }
                            >
                                Yes, Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* =========================================================
                DELETE ALL CANCELLED MODAL
               ========================================================= */}

            {clearCancelledModal && (

                <div
                    className="modal-overlay"
                    onClick={
                        closeClearCancelledModal
                    }
                >

                    <div
                        className="clear-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="clear-icon">
                            🗑
                        </div>

                        <h2>
                            Delete All Cancelled?
                        </h2>

                        <p>
                            Are you sure you want to remove
                            <span className="clear-count">
                                {" "}
                                all cancelled bookings
                            </span>
                            ? This action will permanently
                            remove them from your booking
                            history.
                        </p>

                        <div className="modal-actions">

                            <button
                                type="button"
                                className="close-cancel"
                                onClick={
                                    closeClearCancelledModal
                                }
                            >
                                Keep Bookings
                            </button>

                            <button
                                type="button"
                                className="delete-all-button"
                                onClick={
                                    confirmClearCancelled
                                }
                            >
                                Yes, Delete All
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default Bookings;