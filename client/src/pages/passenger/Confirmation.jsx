import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get booking information from navigation
    const navigationBooking = location.state?.booking;

    // Get saved trip information as backup
    const savedTrip = sessionStorage.getItem("tripDetails");

    const tripDetails =
        navigationBooking ||
        (savedTrip ? JSON.parse(savedTrip) : null);

    // Generate booking reference only once
    const [bookingReference] = useState(() => {
        return (
            tripDetails?.bookingReference ||
            "GG-" +
                Math.floor(
                    100000 + Math.random() * 900000
                )
        );
    });

    // If booking information is missing
    if (!tripDetails) {
        return (
            <main className="confirmation-page">
                <div className="confirmation-container empty-state">
                    <div className="go-logo">
                        <span className="logo-go">GO</span>
                        <span className="logo-leaf">●</span>
                    </div>

                    <h2>Booking Information Not Found</h2>

                    <p>
                        Your booking information could not be loaded.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() => navigate("/book-trip")}
                    >
                        Book a Trip
                    </button>
                </div>

                <style>{styles}</style>
            </main>
        );
    }

    // =========================
    // TRIP DATA
    // =========================

    const passengers =
        Number(tripDetails.passengers) || 1;

    const passengerFare = passengers * 40;

    const vehicleType =
        tripDetails.vehicleType || "Motorcycle";

    const plateNumber =
        tripDetails.plateNumber || "N/A";

    // Current project fare
    const vehicleFare =
        vehicleType.toLowerCase() === "motorcycle"
            ? 150
            : 280;

    const ppaFee = 65;

    const totalFare =
        passengerFare +
        vehicleFare +
        ppaFee;

    return (
        <main className="confirmation-page">

            <div className="confirmation-container">

                {/* ================= HEADER ================= */}

                <header className="confirmation-header">

                    <button
                        className="header-button"
                        onClick={() => navigate("/dashboard")}
                        aria-label="Back"
                    >
                        ←
                    </button>

                    <div className="header-title">
                        Booking Confirmation
                    </div>

                    <button
                        className="header-button menu-button"
                        onClick={() =>
                            alert(
                                "Booking confirmed successfully."
                            )
                        }
                        aria-label="More options"
                    >
                        ⋮
                    </button>

                </header>

                {/* ================= LOGO ================= */}

                <div className="logo-section">

                </div>

                {/* ================= SUCCESS ================= */}

                <section className="success-section">

                    <div className="success-icon">
                        ✓
                    </div>

                    <h1>
                        Booking Confirmed!
                    </h1>

                    <p>
                        Your GuimarasGo trip has been
                        successfully booked.
                    </p>

                </section>

                {/* ================= BOOKING CARD ================= */}

                <section className="booking-card">

                    {/* BLACK HEADER */}

                    <div className="booking-card-header">

                        <div className="company-info">

                            <strong>
                                GuimarasGo
                            </strong>

                            <span>
                                RORO Vessel
                            </span>

                        </div>

                        <span className="confirmed-badge">
                            CONFIRMED
                        </span>

                    </div>

                    <div className="booking-card-body">

                        {/* BOOKING REFERENCE */}

                        <div className="reference-box">

                            <span>
                                Booking Reference
                            </span>

                            <strong>
                                {bookingReference}
                            </strong>

                        </div>

                        {/* PASSENGER */}

                        <div className="two-column">

                            <div className="detail-item">

                                <span>
                                    Passenger
                                </span>

                                <strong>
                                    {tripDetails.passengerName ||
                                        "Guest Passenger"}
                                </strong>

                            </div>

                            <div className="detail-item">

                                <span>
                                    Passengers
                                </span>

                                <strong>
                                    {passengers}{" "}
                                    {passengers === 1
                                        ? "Adult"
                                        : "Adults"}
                                </strong>

                            </div>

                        </div>

                        {/* ROUTE */}

                        <div className="route-card">

                            <div className="route-location">

                                <span>
                                    From
                                </span>

                                <strong>
                                    {tripDetails.origin ||
                                        "Iloilo"}{" "}
                                    Port
                                </strong>

                            </div>

                            <div className="route-icon">
                                ⛴
                            </div>

                            <div className="route-location destination">

                                <span>
                                    To
                                </span>

                                <strong>
                                    {tripDetails.destination ||
                                        "Guimaras"}{" "}
                                    Port
                                </strong>

                            </div>

                        </div>

                        {/* DATE / TIME */}

                        <div className="two-column">

                            <div className="detail-item">

                                <span>
                                    Date
                                </span>

                                <strong>
                                    {tripDetails.date ||
                                        "Not available"}
                                </strong>

                            </div>

                            <div className="detail-item">

                                <span>
                                    Departure
                                </span>

                                <strong>
                                    {tripDetails.time ||
                                        "Not available"}
                                </strong>

                            </div>

                        </div>

                        {/* VESSEL */}

                        <div className="detail-item vessel-item">

                            <span>
                                Vessel
                            </span>

                            <strong>
                                MV Guimaras Star
                            </strong>

                        </div>

                        {/* VEHICLE */}

                        <div className="vehicle-card">

                            <div className="detail-item">

                                <span>
                                    Vehicle Details
                                </span>

                                <strong>
                                    {vehicleType}
                                </strong>

                            </div>

                            <div className="detail-item">

                                <span>
                                    Plate Number
                                </span>

                                <strong>
                                    {plateNumber}
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= FARE SUMMARY ================= */}

                <section className="fare-card">

                    <h2>
                        Fare Summary
                    </h2>

                    <div className="fare-row">

                        <span>
                            Passenger Fare ({passengers}{" "}
                            {passengers === 1
                                ? "passenger"
                                : "passengers"})
                        </span>

                        <strong>
                            ₱{passengerFare.toFixed(2)}
                        </strong>

                    </div>

                    <div className="fare-row">

                        <span>
                            {vehicleType}
                        </span>

                        <strong>
                            ₱{vehicleFare.toFixed(2)}
                        </strong>

                    </div>

                    <div className="fare-row">

                        <span>
                            PPA Fee
                        </span>

                        <strong>
                            ₱{ppaFee.toFixed(2)}
                        </strong>

                    </div>

                    <div className="fare-divider"></div>

                    <div className="total-row">

                        <strong>
                            Total Paid
                        </strong>

                        <strong>
                            ₱{totalFare.toFixed(2)}
                        </strong>

                    </div>

                </section>

                {/* ================= BACK BUTTON ================= */}

                <button
                    className="dashboard-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Back to Dashboard
                </button>

            </div>

            <style>{styles}</style>

        </main>
    );
};


// =====================================================
// STYLES
// =====================================================

const styles = `

* {
    box-sizing: border-box;
}

.confirmation-page {
    min-height: 100vh;
    width: 100%;
    background: #f5f6f7;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    padding: 20px 12px;

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    color: #111111;
}


/* =========================================
   MAIN CONTAINER
========================================= */

.confirmation-container {
    width: 100%;
    max-width: 430px;

    background: #ffffff;

    border-radius: 20px;

    overflow: hidden;

    box-shadow:
        0 8px 30px rgba(0, 0, 0, 0.08);

    padding-bottom: 28px;
}


/* =========================================
   HEADER
========================================= */

.confirmation-header {
    height: 58px;

    display: grid;

    grid-template-columns:
        45px
        1fr
        45px;

    align-items: center;

    border-bottom:
        1px solid #eeeeee;

    padding:
        0 12px;
}

.header-button {
    width: 36px;
    height: 36px;

    border: none;

    border-radius: 50%;

    background: #f6f6f6;

    color: #222222;

    font-size: 22px;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.2s;
}

.header-button:hover {
    background: #eeeeee;
}

.menu-button {
    margin-left: auto;

    font-size: 23px;

    background: transparent;
}

.header-title {
    text-align: center;

    font-size: 14px;

    font-weight: 600;

    color: #222222;
}


/* =========================================
   LOGO
========================================= */

.logo-section {
    display: flex;

    justify-content: center;
    align-items: center;

    padding-top: 18px;
    padding-bottom: 4px;
}

.go-logo-image {
    width: 62px;
    height: 55px;

    object-fit: contain;

    display: block;
}


/* =========================================
   SUCCESS
========================================= */

.success-section {
    text-align: center;

    padding:
        8px
        24px
        18px;
}

.success-icon {
    width: 48px;
    height: 48px;

    margin:
        0 auto
        10px;

    border-radius: 50%;

    background:
        linear-gradient(
            135deg,
            #ff8c1a,
            #ffb21c
        );

    color: #ffffff;

    font-size: 27px;

    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow:
        0 5px 12px
        rgba(255, 140, 26, 0.25);
}

.success-section h1 {
    margin: 0;

    font-size: 18px;

    font-weight: 700;

    color: #111111;
}

.success-section p {
    margin:
        7px auto
        0;

    max-width: 290px;

    font-size: 11px;

    line-height: 1.5;

    color: #777777;
}


/* =========================================
   BOOKING CARD
========================================= */

.booking-card {
    margin:
        0 16px
        16px;

    border-radius: 13px;

    overflow: hidden;

    background: #ffffff;

    box-shadow:
        0 4px 16px
        rgba(0, 0, 0, 0.12);
}

.booking-card-header {
    min-height: 54px;

    padding:
        10px 13px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    background: #202020;

    color: #ffffff;
}

.company-info strong {
    display: block;

    font-size: 12px;

    margin-bottom: 3px;
}

.company-info span {
    display: block;

    font-size: 8px;

    color: #c9c9c9;
}

.confirmed-badge {
    padding:
        4px
        9px;

    border-radius: 20px;

    background: #ffffff;

    color: #222222;

    font-size: 7px;

    font-weight: 700;
}

.booking-card-body {
    padding: 13px;
}


/* =========================================
   REFERENCE
========================================= */

.reference-box {
    padding: 10px;

    border-radius: 7px;

    background: #f5f5f5;

    margin-bottom: 13px;
}

.reference-box span,
.detail-item span,
.route-location span {
    display: block;

    font-size: 8px;

    color: #888888;

    margin-bottom: 4px;
}

.reference-box strong {
    display: block;

    font-size: 11px;

    font-weight: 600;

    color: #333333;
}


/* =========================================
   TWO COLUMNS
========================================= */

.two-column {
    display: grid;

    grid-template-columns:
        1fr
        1fr;

    gap: 18px;

    margin-bottom: 13px;
}

.detail-item strong {
    display: block;

    font-size: 10px;

    font-weight: 500;

    color: #333333;
}


/* =========================================
   ROUTE
========================================= */

.route-card {
    display: grid;

    grid-template-columns:
        1fr
        38px
        1fr;

    align-items: center;

    border:
        1px solid #e9e9e9;

    border-radius: 8px;

    padding: 11px;

    margin-bottom: 13px;
}

.route-location strong {
    display: block;

    font-size: 10px;

    font-weight: 500;

    color: #333333;
}

.route-icon {
    text-align: center;

    font-size: 16px;
}

.destination {
    text-align: right;
}


/* =========================================
   VESSEL
========================================= */

.vessel-item {
    margin-bottom: 13px;
}


/* =========================================
   VEHICLE
========================================= */

.vehicle-card {
    display: grid;

    grid-template-columns:
        1fr
        1fr;

    gap: 15px;

    padding: 10px;

    border-radius: 7px;

    background: #f6f6f6;
}


/* =========================================
   FARE SUMMARY
========================================= */

.fare-card {
    margin:
        0 16px
        16px;

    padding: 14px;

    border:
        1px solid #e4e4e4;

    border-radius: 10px;

    background: #ffffff;
}

.fare-card h2 {
    margin:
        0 0
        10px;

    font-size: 12px;

    font-weight: 700;

    color: #222222;
}

.fare-row {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 5px 0;

    font-size: 9px;

    color: #777777;
}

.fare-row strong {
    font-size: 9px;

    font-weight: 600;

    color: #333333;
}

.fare-divider {
    height: 1px;

    background: #dddddd;

    margin:
        7px 0;
}

.total-row {
    display: flex;

    justify-content: space-between;

    align-items: center;

    font-size: 11px;

    color: #111111;
}


/* =========================================
   DASHBOARD BUTTON
========================================= */

.dashboard-button {
    display: block;

    width:
        calc(100% - 32px);

    height: 48px;

    margin:
        0 16px;

    border: none;

    border-radius: 9px;

    background:
        linear-gradient(
            135deg,
            #ff8c1a,
            #ff9f1c
        );

    color: #ffffff;

    font-size: 13px;

    font-weight: 700;

    cursor: pointer;

    box-shadow:
        0 4px 10px
        rgba(255, 140, 26, 0.20);

    transition:
        transform 0.2s,
        box-shadow 0.2s;
}

.dashboard-button:hover {
    transform: translateY(-1px);

    box-shadow:
        0 6px 14px
        rgba(255, 140, 26, 0.28);
}

.dashboard-button:active {
    transform: translateY(0);
}


/* =========================================
   EMPTY STATE
========================================= */

.empty-state {
    padding:
        40px 25px;

    text-align: center;
}

.empty-state h2 {
    margin:
        20px 0
        8px;

    font-size: 20px;
}

.empty-state p {
    color: #777777;

    font-size: 13px;

    margin-bottom: 25px;
}

.go-logo {
    font-size: 40px;

    font-weight: 800;

    letter-spacing: -4px;
}

.logo-go {
    color: #ff8c1a;
}

.logo-leaf {
    color: #a8cf45;

    font-size: 20px;
}

.primary-button {
    width: 100%;

    height: 48px;

    border: none;

    border-radius: 9px;

    background: #ff8c1a;

    color: #ffffff;

    font-weight: 700;

    cursor: pointer;
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 480px) {

    .confirmation-page {
        padding:
            0;
    }

    .confirmation-container {
        min-height: 100vh;

        max-width: 430px;

        border-radius: 0;

        box-shadow: none;
    }
}

`;
export default Confirmation;