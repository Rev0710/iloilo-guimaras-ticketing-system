import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // =========================================================
    // LOAD ALL BOOKINGS
    // =========================================================

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = () => {
        try {
            const saved =
                sessionStorage.getItem("allBookings");

            if (!saved) {
                setBookings([]);
                return;
            }

            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                setBookings([...parsed].reverse());
            }

        } catch (error) {
            console.error(
                "Error loading bookings:",
                error
            );

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
    // DELETE BOOKING
    // =========================================================

    const askDelete = (booking) => {
        setDeleteTarget(booking);
    };

    const cancelDelete = () => {
        setDeleteTarget(null);
    };

    const confirmDelete = () => {

        if (!deleteTarget) {
            return;
        }

        const bookingReference =
            deleteTarget.bookingReference;

        try {

            // Remove from all bookings
            const saved =
                sessionStorage.getItem("allBookings");

            let allBookings = [];

            if (saved) {
                allBookings = JSON.parse(saved);
            }

            const updatedBookings =
                allBookings.filter(
                    (booking) =>
                        booking.bookingReference !==
                        bookingReference
                );

            sessionStorage.setItem(
                "allBookings",
                JSON.stringify(updatedBookings)
            );


            // Remove from recent bookings
            const savedRecent =
                sessionStorage.getItem(
                    "recentBookings"
                );

            if (savedRecent) {

                const recentBookings =
                    JSON.parse(savedRecent);

                const updatedRecent =
                    recentBookings.filter(
                        (booking) =>
                            booking.bookingReference !==
                            bookingReference
                    );

                sessionStorage.setItem(
                    "recentBookings",
                    JSON.stringify(
                        updatedRecent
                    )
                );
            }


            // Remove current confirmed booking
            const confirmed =
                sessionStorage.getItem(
                    "confirmedBooking"
                );

            if (confirmed) {

                const currentBooking =
                    JSON.parse(confirmed);

                if (
                    currentBooking.bookingReference ===
                    bookingReference
                ) {
                    sessionStorage.removeItem(
                        "confirmedBooking"
                    );
                }
            }


            // Update screen
            setBookings(
                [...updatedBookings].reverse()
            );

            setDeleteTarget(null);

        } catch (error) {

            console.error(
                "Error deleting booking:",
                error
            );
        }
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
                        Inter,
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

                /* =================================================
                   PAGE
                ================================================= */

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

                /* =================================================
                   HEADER
                ================================================= */

                .bookings-header {
                    display: flex;

                    align-items: center;

                    gap: 15px;

                    margin-bottom: 28px;
                }

                .back-button {
                    width: 42px;
                    height: 42px;

                    border:
                        1px solid #eeeeee;

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
                    margin:
                        4px
                        0
                        0;

                    color: #888;

                    font-size: 13px;
                }

                /* =================================================
                   BOOKING CARDS
                ================================================= */

                .history-list {
                    display: flex;

                    flex-direction: column;

                    gap: 16px;
                }

                .history-card {
                    background: #ffffff;

                    border:
                        1px solid #e8e8e8;

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
                }

                .history-reference {
                    display: block;

                    margin-top: 4px;

                    color: #999;

                    font-size: 11px;
                }

                .status {
                    padding:
                        6px
                        10px;

                    border-radius: 20px;

                    font-size: 9px;

                    font-weight: 800;

                    white-space: nowrap;
                }

                .status-confirmed {
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

                /* =================================================
                   BOOKING INFORMATION
                ================================================= */

                .history-details {
                    display: grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap: 15px;

                    padding:
                        17px
                        0;
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
                }

                /* =================================================
                   CARD BOTTOM
                ================================================= */

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
                }

                .history-actions {
                    display: flex;

                    gap: 8px;
                }

                .view-button,
                .delete-button {
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
                }

                .delete-button {
                    background: #fff0f0;

                    color: #d9534f;
                }

                .delete-button:hover {
                    background: #ffe0e0;
                }

                /* =================================================
                   EMPTY HISTORY
                ================================================= */

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
                    margin:
                        0
                        0
                        7px;

                    font-size: 20px;
                }

                .empty-history p {
                    margin:
                        0
                        0
                        20px;

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

                    padding:
                        12px
                        22px;

                    border-radius: 9px;

                    font-weight: 700;

                    cursor: pointer;
                }

                /* =================================================
                   DELETE MODAL
                ================================================= */

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

                .delete-modal {
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

                .delete-icon {
                    width: 60px;
                    height: 60px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    margin:
                        0
                        auto
                        16px;

                    border-radius: 18px;

                    background: #fff0f0;

                    color: #d9534f;

                    font-size: 27px;
                }

                .delete-modal h2 {
                    margin:
                        0
                        0
                        8px;

                    font-size: 20px;
                }

                .delete-modal p {
                    margin:
                        0
                        0
                        8px;

                    color: #777;

                    font-size: 13px;

                    line-height: 1.5;
                }

                .delete-reference {
                    display: inline-block;

                    margin:
                        8px
                        0
                        22px;

                    padding:
                        7px
                        10px;

                    border-radius: 7px;

                    background: #f7f7f7;

                    color: #555;

                    font-size: 11px;

                    font-weight: 700;
                }

                .modal-actions {
                    display: grid;

                    grid-template-columns:
                        1fr
                        1fr;

                    gap: 10px;
                }

                .cancel-delete,
                .confirm-delete {
                    border: none;

                    padding: 12px;

                    border-radius: 9px;

                    font-weight: 700;

                    cursor: pointer;
                }

                .cancel-delete {
                    background: #f1f1f1;

                    color: #555;
                }

                .cancel-delete:hover {
                    background: #e7e7e7;
                }

                .confirm-delete {
                    background: #d9534f;

                    color: #ffffff;
                }

                .confirm-delete:hover {
                    background: #c43f3b;
                }

                /* =================================================
                   MOBILE
                ================================================= */

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
                    .delete-button {
                        flex: 1;
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


                    {/* BOOKINGS */}

                    {bookings.length === 0 ? (

                        <div className="empty-history">

                            <div className="empty-history-icon">
                                🎫
                            </div>

                            <h2>
                                No Booking History
                            </h2>

                            <p>
                                You haven't made any trips yet.
                            </p>

                            <button
                                type="button"
                                className="book-now-button"
                                onClick={() =>
                                    navigate(
                                        "/book-trip"
                                    )
                                }
                            >
                                Book a Trip
                            </button>

                        </div>

                    ) : (

                        <div className="history-list">

                            {bookings.map(
                                (booking, index) => {

                                const status =
                                    (
                                        booking.status ||
                                        "CONFIRMED"
                                    ).toUpperCase();

                                let statusClass =
                                    "status-confirmed";

                                if (
                                    status ===
                                    "COMPLETED"
                                ) {
                                    statusClass =
                                        "status-completed";
                                }

                                if (
                                    status ===
                                    "CANCELLED"
                                ) {
                                    statusClass =
                                        "status-cancelled";
                                }

                                return (

                                    <div
                                        className="history-card"
                                        key={
                                            booking.bookingReference ||
                                            index
                                        }
                                    >

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
                                                className={`status ${statusClass}`}
                                            >
                                                {status}
                                            </span>

                                        </div>


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
                                                    Vehicle
                                                </small>

                                                <strong>
                                                    {booking.vehicle ||
                                                        "Motorcycle"}
                                                </strong>

                                            </div>

                                        </div>


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

                                                <button
                                                    type="button"
                                                    className="delete-button"
                                                    onClick={() =>
                                                        askDelete(
                                                            booking
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                    )}

                </div>

            </main>


            {/* =====================================================
                DELETE CONFIRMATION MODAL
            ===================================================== */}

            {deleteTarget && (

                <div
                    className="modal-overlay"
                    onClick={cancelDelete}
                >

                    <div
                        className="delete-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="delete-icon">
                            🗑️
                        </div>

                        <h2>
                            Delete Booking?
                        </h2>

                        <p>
                            Are you sure you want to delete
                            this booking from your history?
                        </p>

                        <span className="delete-reference">
                            {deleteTarget.bookingReference ||
                                "Booking"}
                        </span>

                        <div className="modal-actions">

                            <button
                                type="button"
                                className="cancel-delete"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="confirm-delete"
                                onClick={confirmDelete}
                            >
                                Yes, Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default Bookings;