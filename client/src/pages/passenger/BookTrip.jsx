import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGO_URL =
    "https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956";

const BookTrip = () => {
    const navigate = useNavigate();

    // =========================================================
    // RECOVER PREVIOUSLY ENTERED TRIP INFORMATION
    // =========================================================

    const savedTrip =
        sessionStorage.getItem("tripDetails");

    let previousTrip = {};

    try {
        previousTrip = savedTrip
            ? JSON.parse(savedTrip)
            : {};
    } catch (error) {
        console.error(
            "Unable to recover saved trip:",
            error
        );

        previousTrip = {};
    }

    // =========================================================
    // EXISTING TRIP STATES
    // =========================================================

    const [origin, setOrigin] = useState(
        previousTrip.origin || ""
    );

    const [destination, setDestination] = useState(
        previousTrip.destination || ""
    );

    const [date, setDate] = useState(
        previousTrip.date || ""
    );

    const [time, setTime] = useState(
        previousTrip.time || ""
    );

    // =========================================================
    // NEW PASSENGER INFORMATION
    // =========================================================

    const [passengerName, setPassengerName] =
        useState(
            previousTrip.passengerName || ""
        );

    const [passengerAge, setPassengerAge] =
        useState(
            previousTrip.passengerAge || ""
        );

    const [passengerGender, setPassengerGender] =
        useState(
            previousTrip.passengerGender || ""
        );

    // =========================================================
    // EXISTING PASSENGER COUNT
    // =========================================================

    const [passengers, setPassengers] = useState(
        previousTrip.passengers || 2
    );

    // =========================================================
    // EXISTING PLATE NUMBER
    // =========================================================

    const [plateNumber, setPlateNumber] = useState(
        previousTrip.plateNumber || ""
    );

    // Currently available vehicle
    const vehicleType = "Motorcycle";

    // =========================================================
    // PASSENGER DECREASE
    // =========================================================

    const handlePassengerDecrease = () => {
        if (passengers > 1) {
            setPassengers(
                (previous) => previous - 1
            );
        }
    };

    // =========================================================
    // PASSENGER INCREASE
    // =========================================================

    const handlePassengerIncrease = () => {
        if (passengers < 10) {
            setPassengers(
                (previous) => previous + 1
            );
        }
    };

    // =========================================================
    // SUBMIT BOOKING
    // =========================================================

    const handleSubmit = (event) => {
        event.preventDefault();

        // =====================================================
        // VALIDATION
        // =====================================================

        if (
            !origin ||
            !destination ||
            !date ||
            !time ||
            !passengerName.trim() ||
            !passengerAge ||
            !passengerGender ||
            !plateNumber.trim()
        ) {
            alert(
                "Please complete all trip and passenger details."
            );

            return;
        }

        // =====================================================
        // AGE VALIDATION
        // =====================================================

        const ageNumber =
            Number(passengerAge);

        if (
            Number.isNaN(ageNumber) ||
            ageNumber < 1 ||
            ageNumber > 120
        ) {
            alert(
                "Please enter a valid passenger age."
            );

            return;
        }

        // =====================================================
        // SAME PORT VALIDATION
        // =====================================================

        if (origin === destination) {
            alert(
                "Origin and Destination cannot be the same."
            );

            return;
        }

        // =====================================================
        // COMPLETE TRIP DETAILS
        // =====================================================

        const tripDetails = {
            origin,
            destination,
            date,
            time,

            // NEW PASSENGER INFORMATION
            passengerName:
                passengerName.trim(),

            passengerAge:
                ageNumber,

            passengerGender,

            // EXISTING PASSENGER COUNT
            passengers,

            // EXISTING VEHICLE
            vehicleType,

            // EXISTING PLATE NUMBER
            plateNumber:
                plateNumber
                    .trim()
                    .toUpperCase(),
        };

        console.log(
            "Complete Trip Details:",
            tripDetails
        );

        // =====================================================
        // SAVE TRIP INFORMATION
        // =====================================================

        sessionStorage.setItem(
            "tripDetails",
            JSON.stringify(tripDetails)
        );

        // =====================================================
        // CONTINUE TO PAYMENT
        // =====================================================

        navigate("/payment", {
            state: {
                trip: tripDetails,
            },
        });
    };

    // =========================================================
    // TODAY'S DATE
    // =========================================================

    const today = new Date()
        .toISOString()
        .split("T")[0];

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

                    background: #f5f6f8;
                    color: #222222;
                }

                button,
                input,
                select {
                    font-family: inherit;
                }

                /* =================================================
                   PAGE
                ================================================= */

                .book-trip-page {
                    min-height: 100vh;
                    min-height: 100dvh;

                    padding:
                        30px
                        16px
                        60px;

                    background:
                        linear-gradient(
                            180deg,
                            #fff8f2 0%,
                            #f7f8fa 55%,
                            #f4f5f7 100%
                        );
                }

                .book-trip-container {
                    width: 100%;
                    max-width: 900px;

                    margin: 0 auto;

                    background: #ffffff;

                    border:
                        1px solid #eeeeee;

                    border-radius: 22px;

                    overflow: hidden;

                    box-shadow:
                        0 18px 50px
                        rgba(0, 0, 0, 0.07);
                }

                /* =================================================
                   HEADER
                ================================================= */

                .book-trip-header {
                    height: 78px;

                    padding:
                        0
                        28px;

                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    border-bottom:
                        1px solid #eeeeee;

                    background: #ffffff;
                }

                .back-button {
                    width: 42px;
                    height: 42px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border:
                        1px solid #e8e8e8;

                    border-radius: 12px;

                    background: #ffffff;

                    color: #333333;

                    font-size: 22px;

                    cursor: pointer;

                    transition:
                        0.2s ease;
                }

                .back-button:hover {
                    background: #fff5ec;

                    border-color:
                        #ffd7bd;

                    color: #f28c28;
                }

                .book-trip-logo {
                    display: flex;

                    align-items: center;

                    justify-content: center;

                    flex: 1;
                }

                .book-trip-logo img {
                    width: 120px;
                    height: 62px;

                    object-fit: contain;
                }

                .header-spacer {
                    width: 42px;
                }

                /* =================================================
                   HEADING
                ================================================= */

                .book-trip-heading {
                    padding:
                        40px
                        40px
                        30px;

                    text-align: center;

                    background:
                        linear-gradient(
                            135deg,
                            #fff8f2,
                            #ffffff
                        );
                }

                .book-trip-heading h1 {
                    margin: 0;

                    color: #222222;

                    font-size: 32px;

                    font-weight: 800;
                }

                .book-trip-heading p {
                    margin:
                        10px
                        auto
                        0;

                    max-width: 540px;

                    color: #888888;

                    font-size: 14px;

                    line-height: 1.5;
                }

                /* =================================================
                   FORM
                ================================================= */

                .trip-form {
                    padding:
                        0
                        55px
                        50px;
                }

                .form-section {
                    padding:
                        30px
                        0;

                    border-bottom:
                        1px solid #eeeeee;
                }

                .form-section:last-child {
                    border-bottom: none;
                }

                /* =================================================
                   SECTION TITLE
                ================================================= */

                .section-title {
                    display: flex;

                    align-items: flex-start;

                    gap: 14px;

                    margin-bottom: 25px;
                }

                .section-number {
                    width: 38px;
                    height: 38px;

                    flex:
                        0
                        0
                        38px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border-radius: 11px;

                    background: #fff0e3;

                    color: #f28c28;

                    font-size: 12px;

                    font-weight: 800;
                }

                .section-title h2 {
                    margin: 0;

                    color: #222222;

                    font-size: 19px;

                    font-weight: 750;
                }

                .section-title p {
                    margin:
                        5px
                        0
                        0;

                    color: #999999;

                    font-size: 12px;

                    line-height: 1.4;
                }

                /* =================================================
                   ROUTE
                ================================================= */

                .route-row {
                    width: 100%;

                    display: grid;

                    grid-template-columns:
                        minmax(0, 1fr)
                        50px
                        minmax(0, 1fr);

                    align-items: end;

                    gap: 15px;
                }

                .route-field {
                    min-width: 0;
                }

                .route-field label,
                .form-group label {
                    display: block;

                    margin-bottom: 8px;

                    color: #444444;

                    font-size: 12px;

                    font-weight: 700;
                }

                .route-field input,
                .route-field select,
                .form-group input,
                .form-group select {
                    width: 100%;

                    height: 50px;

                    padding:
                        0
                        14px;

                    border:
                        1px solid #dddddd;

                    border-radius: 10px;

                    outline: none;

                    background: #ffffff;

                    color: #222222;

                    font-size: 13px;

                    transition:
                        0.2s ease;
                }

                .route-field input:focus,
                .route-field select:focus,
                .form-group input:focus,
                .form-group select:focus {
                    border-color:
                        #f28c28;

                    box-shadow:
                        0 0 0 3px
                        rgba(
                            242,
                            140,
                            40,
                            0.12
                        );
                }

                .route-arrow {
                    width: 50px;
                    height: 50px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    color: #f28c28;

                    font-size: 22px;
                }

                /* =================================================
                   FORM GROUP
                ================================================= */

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group:last-child {
                    margin-bottom: 0;
                }

                /* =================================================
                   DATE / TIME
                ================================================= */

                .date-time-row {
                    width: 100%;

                    display: grid;

                    grid-template-columns:
                        minmax(0, 1fr)
                        minmax(0, 1fr);

                    gap: 20px;
                }

                /* =================================================
                   NEW PASSENGER INFORMATION
                ================================================= */

                .passenger-details-grid {
                    display: grid;

                    grid-template-columns:
                        minmax(0, 1.5fr)
                        minmax(0, 0.7fr)
                        minmax(0, 0.9fr);

                    gap: 16px;

                    margin-bottom: 22px;
                }

                .passenger-details-grid .form-group {
                    margin-bottom: 0;
                }

                .passenger-input {
                    width: 100%;

                    height: 50px;

                    padding:
                        0
                        14px;

                    border:
                        1px solid #dddddd;

                    border-radius: 10px;

                    outline: none;

                    background: #ffffff;

                    color: #222222;

                    font-size: 13px;

                    transition:
                        0.2s ease;
                }

                .passenger-input:focus {
                    border-color:
                        #f28c28;

                    box-shadow:
                        0 0 0 3px
                        rgba(
                            242,
                            140,
                            40,
                            0.12
                        );
                }

                /* =================================================
                   PASSENGER COUNTER
                ================================================= */

                .passenger-counter {
                    width: 100%;
                    height: 52px;

                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    border:
                        1px solid #dddddd;

                    border-radius: 10px;

                    overflow: hidden;

                    background: #ffffff;
                }

                .passenger-counter button {
                    width: 58px;
                    height: 100%;

                    flex:
                        0
                        0
                        58px;

                    border: none;

                    background: #fff7f0;

                    color: #f28c28;

                    font-size: 24px;

                    font-weight: 500;

                    cursor: pointer;

                    transition:
                        background
                        0.2s ease;
                }

                .passenger-counter button:hover:not(:disabled) {
                    background: #ffecdd;
                }

                .passenger-counter button:disabled {
                    color: #cccccc;

                    background: #f7f7f7;

                    cursor: not-allowed;
                }

                .passenger-value {
                    flex: 1;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 8px;
                }

                .passenger-value strong {
                    color: #222222;

                    font-size: 18px;
                }

                .passenger-value span {
                    color: #777777;

                    font-size: 12px;
                }

                /* =================================================
                   HELP TEXT
                ================================================= */

                .field-help {
                    display: block;

                    margin-top: 7px;

                    color: #999999;

                    font-size: 11px;

                    line-height: 1.4;
                }

                /* =================================================
                   BOOKING NOTE
                ================================================= */

                .booking-note {
                    width: 100%;

                    display: flex;

                    align-items: flex-start;

                    gap: 12px;

                    padding: 15px;

                    border:
                        1px solid #f4dfcf;

                    border-radius: 11px;

                    background: #fffaf6;
                }

                .note-icon {
                    width: 28px;
                    height: 28px;

                    flex:
                        0
                        0
                        28px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #f28c28;

                    color: #ffffff;

                    font-size: 13px;

                    font-weight: 700;
                }

                .booking-note strong {
                    display: block;

                    margin-bottom: 3px;

                    color: #333333;

                    font-size: 12px;
                }

                .booking-note p {
                    margin: 0;

                    color: #888888;

                    font-size: 11px;

                    line-height: 1.5;
                }

                /* =================================================
                   CONTINUE BUTTON
                ================================================= */

                .continue-button {
                    width: 100%;
                    height: 54px;

                    margin-top: 18px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 12px;

                    border: none;

                    border-radius: 10px;

                    background:
                        linear-gradient(
                            135deg,
                            #f28c28,
                            #ff9d3f
                        );

                    color: #ffffff;

                    font-size: 14px;

                    font-weight: 700;

                    cursor: pointer;

                    transition:
                        0.2s ease;

                    box-shadow:
                        0 8px 20px
                        rgba(
                            242,
                            140,
                            40,
                            0.20
                        );
                }

                .continue-button:hover {
                    background:
                        linear-gradient(
                            135deg,
                            #e97f1d,
                            #f28c28
                        );

                    transform:
                        translateY(-2px);

                    box-shadow:
                        0 12px 25px
                        rgba(
                            242,
                            140,
                            40,
                            0.28
                        );
                }

                .continue-button:active {
                    transform:
                        translateY(0);
                }

                .button-arrow {
                    font-size: 18px;

                    transition:
                        transform
                        0.2s ease;
                }

                .continue-button:hover
                .button-arrow {
                    transform:
                        translateX(4px);
                }

                /* =================================================
                   TABLET
                ================================================= */

                @media (max-width: 800px) {

                    .book-trip-page {
                        padding:
                            20px
                            16px
                            50px;
                    }

                    .book-trip-container {
                        max-width: 720px;
                    }

                    .trip-form {
                        padding:
                            0
                            35px
                            40px;
                    }

                    .passenger-details-grid {
                        grid-template-columns:
                            1fr
                            1fr;
                    }

                    .passenger-details-grid
                    .form-group:first-child {
                        grid-column:
                            1 / -1;
                    }
                }

                /* =================================================
                   MOBILE
                ================================================= */

                @media (max-width: 600px) {

                    .book-trip-page {
                        padding: 0;

                        background: #ffffff;
                    }

                    .book-trip-container {
                        min-height: 100vh;

                        max-width: none;

                        border: none;

                        border-radius: 0;

                        box-shadow: none;
                    }

                    .book-trip-header {
                        height: 82px;

                        padding:
                            0
                            18px;
                    }

                    .back-button {
                        width: 40px;
                        height: 40px;
                    }

                    .book-trip-logo img {
                        width: 105px;
                        height: 55px;
                    }

                    .header-spacer {
                        width: 40px;
                    }

                    .book-trip-heading {
                        padding:
                            30px
                            20px
                            25px;
                    }

                    .book-trip-heading h1 {
                        font-size: 28px;
                    }

                    .book-trip-heading p {
                        font-size: 13px;
                    }

                    .trip-form {
                        padding:
                            0
                            20px
                            35px;
                    }

                    .form-section {
                        padding:
                            23px
                            0;
                    }

                    /* Route becomes vertical */

                    .route-row {
                        grid-template-columns:
                            1fr;

                        gap: 0;
                    }

                    .route-arrow {
                        display: none;
                    }

                    /* Date/time become vertical */

                    .date-time-row {
                        grid-template-columns:
                            1fr;

                        gap: 0;
                    }

                    /* Passenger details become vertical */

                    .passenger-details-grid {
                        grid-template-columns:
                            1fr;

                        gap: 0;
                    }

                    .passenger-details-grid
                    .form-group:first-child {
                        grid-column:
                            auto;
                    }

                    .section-title {
                        margin-bottom: 20px;
                    }

                    .section-title h2 {
                        font-size: 16px;
                    }

                    .section-title p {
                        font-size: 11px;
                    }

                    .form-group input,
                    .form-group select,
                    .route-field input,
                    .route-field select,
                    .passenger-input {
                        height: 48px;
                    }

                    .continue-button {
                        height: 52px;
                    }
                }

                /* =================================================
                   SMALL PHONES
                ================================================= */

                @media (max-width: 380px) {

                    .trip-form {
                        padding-left: 16px;

                        padding-right: 16px;
                    }

                    .book-trip-heading {
                        padding-left: 16px;

                        padding-right: 16px;
                    }

                    .book-trip-heading h1 {
                        font-size: 25px;
                    }

                    .section-title {
                        gap: 10px;
                    }

                    .section-number {
                        width: 32px;
                        height: 32px;

                        flex-basis: 32px;
                    }

                    .passenger-counter button {
                        width: 52px;

                        flex-basis: 52px;
                    }
                }

            `}</style>

            <main className="book-trip-page">

                <div className="book-trip-container">

                    {/* =================================================
                       HEADER
                    ================================================= */}

                    <header className="book-trip-header">

                        <button
                            type="button"
                            className="back-button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            aria-label="Back to dashboard"
                        >
                            ←
                        </button>

                        <div className="book-trip-logo">

                            <img
                                src={LOGO_URL}
                                alt="GuimarasGo Logo"
                            />

                        </div>

                        <div
                            className="header-spacer"
                            aria-hidden="true"
                        />

                    </header>

                    {/* =================================================
                       PAGE HEADING
                    ================================================= */}

                    <section className="book-trip-heading">

                        <h1>
                            Book Your Trip
                        </h1>

                        <p>
                            Choose your route, schedule,
                            and passenger details.
                        </p>

                    </section>

                    {/* =================================================
                       FORM
                    ================================================= */}

                    <form
                        className="trip-form"
                        onSubmit={handleSubmit}
                    >

                        {/* =================================================
                           01 - ROUTE
                        ================================================= */}

                        <section className="form-section">

                            <div className="section-title">

                                <span className="section-number">
                                    01
                                </span>

                                <div>

                                    <h2>
                                        Trip Route
                                    </h2>

                                    <p>
                                        Select your departure
                                        and destination ports.
                                    </p>

                                </div>

                            </div>

                            <div className="route-row">

                                {/* ORIGIN */}

                                <div className="route-field">

                                    <label htmlFor="origin">
                                        Origin Port
                                    </label>

                                    <select
                                        id="origin"
                                        value={origin}
                                        onChange={(event) =>
                                            setOrigin(
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select origin
                                        </option>

                                        <option value="Iloilo">
                                            Iloilo
                                        </option>

                                        <option value="Guimaras">
                                            Guimaras
                                        </option>
                                    </select>

                                </div>

                                {/* ARROW */}

                                <div className="route-arrow">
                                    →
                                </div>

                                {/* DESTINATION */}

                                <div className="route-field">

                                    <label htmlFor="destination">
                                        Destination Port
                                    </label>

                                    <select
                                        id="destination"
                                        value={destination}
                                        onChange={(event) =>
                                            setDestination(
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select destination
                                        </option>

                                        <option value="Iloilo">
                                            Iloilo
                                        </option>

                                        <option value="Guimaras">
                                            Guimaras
                                        </option>
                                    </select>

                                </div>

                            </div>

                        </section>

                        {/* =================================================
                           02 - SCHEDULE
                        ================================================= */}

                        <section className="form-section">

                            <div className="section-title">

                                <span className="section-number">
                                    02
                                </span>

                                <div>

                                    <h2>
                                        Trip Schedule
                                    </h2>

                                    <p>
                                        Select your travel date
                                        and departure time.
                                    </p>

                                </div>

                            </div>

                            <div className="date-time-row">

                                {/* DATE */}

                                <div className="form-group">

                                    <label htmlFor="date">
                                        Travel Date
                                    </label>

                                    <input
                                        id="date"
                                        type="date"
                                        min={today}
                                        value={date}
                                        onChange={(event) =>
                                            setDate(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                {/* TIME */}

                                <div className="form-group">

                                    <label htmlFor="time">
                                        Departure Time
                                    </label>

                                    <input
                                        id="time"
                                        type="time"
                                        value={time}
                                        onChange={(event) =>
                                            setTime(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                        </section>

                        {/* =================================================
                           03 - PASSENGER DETAILS
                        ================================================= */}

                        <section className="form-section">

                            <div className="section-title">

                                <span className="section-number">
                                    03
                                </span>

                                <div>

                                    <h2>
                                        Passenger Details
                                    </h2>

                                    <p>
                                        Tell us who will be
                                        traveling.
                                    </p>

                                </div>

                            </div>

                            {/* =================================================
                               NEW PASSENGER INFORMATION
                            ================================================= */}

                            <div className="passenger-details-grid">

                                {/* FULL NAME */}

                                <div className="form-group">

                                    <label htmlFor="passengerName">
                                        Full Name
                                    </label>

                                    <input
                                        id="passengerName"
                                        name="passengerName"
                                        type="text"
                                        className="passenger-input"
                                        placeholder="Enter passenger full name"
                                        value={passengerName}
                                        onChange={(event) =>
                                            setPassengerName(
                                                event.target.value
                                            )
                                        }
                                        autoComplete="name"
                                    />

                                </div>

                                {/* AGE */}

                                <div className="form-group">

                                    <label htmlFor="passengerAge">
                                        Age
                                    </label>

                                    <input
                                        id="passengerAge"
                                        name="passengerAge"
                                        type="number"
                                        className="passenger-input"
                                        placeholder="Age"
                                        min="1"
                                        max="120"
                                        value={passengerAge}
                                        onChange={(event) =>
                                            setPassengerAge(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                {/* GENDER */}

                                <div className="form-group">

                                    <label htmlFor="passengerGender">
                                        Gender
                                    </label>

                                    <select
                                        id="passengerGender"
                                        name="passengerGender"
                                        className="passenger-input"
                                        value={passengerGender}
                                        onChange={(event) =>
                                            setPassengerGender(
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>

                                        <option value="Prefer not to say">
                                            Prefer not to say
                                        </option>
                                    </select>

                                </div>

                            </div>

                            {/* =================================================
                               NUMBER OF PASSENGERS
                            ================================================= */}

                            <div className="form-group">

                                <label>
                                    Number of Passengers
                                </label>

                                <div className="passenger-counter">

                                    <button
                                        type="button"
                                        onClick={
                                            handlePassengerDecrease
                                        }
                                        disabled={
                                            passengers <= 1
                                        }
                                        aria-label="Decrease passengers"
                                    >
                                        −
                                    </button>

                                    <div className="passenger-value">

                                        <strong>
                                            {passengers}
                                        </strong>

                                        <span>
                                            {passengers === 1
                                                ? "Passenger"
                                                : "Passengers"}
                                        </span>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            handlePassengerIncrease
                                        }
                                        disabled={
                                            passengers >= 10
                                        }
                                        aria-label="Increase passengers"
                                    >
                                        +
                                    </button>

                                </div>

                                <small className="field-help">
                                    You can book for up to
                                    10 passengers.
                                </small>

                            </div>

                        </section>

                        {/* =================================================
                           04 - VEHICLE
                        ================================================= */}

                        <section className="form-section">

                            <div className="section-title">

                                <span className="section-number">
                                    04
                                </span>

                                <div>

                                    <h2>
                                        Vehicle Details
                                    </h2>

                                    <p>
                                        Enter the motorcycle
                                        plate number.
                                    </p>

                                </div>

                            </div>

                            <div className="form-group">

                                <label>
                                    Vehicle Type
                                </label>

                                <input
                                    type="text"
                                    value={vehicleType}
                                    disabled
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="plateNumber">
                                    Plate Number
                                </label>

                                <input
                                    id="plateNumber"
                                    type="text"
                                    placeholder="Enter plate number"
                                    value={plateNumber}
                                    onChange={(event) =>
                                        setPlateNumber(
                                            event.target.value
                                        )
                                    }
                                    maxLength={20}
                                />

                                <small className="field-help">
                                    Example: ABC-1234
                                </small>

                            </div>

                        </section>

                        {/* =================================================
                           BOOKING NOTE
                        ================================================= */}

                        <div className="booking-note">

                            <div className="note-icon">
                                !
                            </div>

                            <div>

                                <strong>
                                    Before continuing
                                </strong>

                                <p>
                                    Please make sure that
                                    your passenger information,
                                    trip schedule, and plate
                                    number are correct.
                                </p>

                            </div>

                        </div>

                        {/* =================================================
                           CONTINUE
                        ================================================= */}

                        <button
                            type="submit"
                            className="continue-button"
                        >

                            Continue to Payment

                            <span className="button-arrow">
                                →
                            </span>

                        </button>

                    </form>

                </div>

            </main>
        </>
    );
};

export default BookTrip;