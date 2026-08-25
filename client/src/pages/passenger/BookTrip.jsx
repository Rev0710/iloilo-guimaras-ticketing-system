import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGO_URL =
    "https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__SjoqmY7Y75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956";

const BookTrip = () => {
    const navigate = useNavigate();

    // =========================================================
    // SELECTED FERRY / VESSEL
    // =========================================================

    const [selectedTrip, setSelectedTrip] = useState(null);

    // =========================================================
    // RECOVER SAVED TRIP
    // =========================================================

    const [previousTrip, setPreviousTrip] = useState({});

    // =========================================================
    // LOAD SELECTED FERRY
    // =========================================================

    useEffect(() => {
        try {
            const savedSelectedTrip =
                sessionStorage.getItem("selectedTrip");

            if (savedSelectedTrip) {
                const parsedSelectedTrip =
                    JSON.parse(savedSelectedTrip);

                setSelectedTrip(parsedSelectedTrip);
            }
        } catch (error) {
            console.error(
                "Error loading selected ferry:",
                error
            );
        }
    }, []);

    // =========================================================
    // LOAD PREVIOUS TRIP INFORMATION
    // =========================================================

    useEffect(() => {
        try {
            const savedTrip =
                sessionStorage.getItem("tripDetails");

            if (savedTrip) {
                const parsedTrip =
                    JSON.parse(savedTrip);

                setPreviousTrip(parsedTrip);
            }
        } catch (error) {
            console.error(
                "Unable to recover saved trip:",
                error
            );

            setPreviousTrip({});
        }
    }, []);

    // =========================================================
    // TRIP STATES
    // =========================================================

    const [origin, setOrigin] = useState("");

    const [destination, setDestination] =
        useState("");

    const [date, setDate] = useState("");

    const [time, setTime] = useState("");

    // =========================================================
    // PASSENGER MODE
    // =========================================================

    const [passengerMode, setPassengerMode] =
        useState("solo");

    // =========================================================
    // PASSENGER INFORMATION
    // =========================================================

    const [passengerName, setPassengerName] =
        useState("");

    const [passengerAge, setPassengerAge] =
        useState("");

    const [passengerGender, setPassengerGender] =
        useState("");

    // =========================================================
    // PASSENGER COUNT
    // =========================================================

    const [passengers, setPassengers] =
        useState(1);

    // =========================================================
    // VEHICLE
    // =========================================================

    const vehicleType = "Motorcycle";

    // =========================================================
    // PLATE NUMBER
    // =========================================================

    const [plateNumber, setPlateNumber] =
        useState("");

    // =========================================================
    // DEPARTURE TIME POPUP
    // =========================================================

    const [showTimeModal, setShowTimeModal] =
        useState(false);

    // =========================================================
    // APPLY SAVED DATA AFTER LOADING
    // =========================================================

    useEffect(() => {
        if (!previousTrip) {
            return;
        }

        setOrigin(
            previousTrip.origin || ""
        );

        setDestination(
            previousTrip.destination || ""
        );

        setDate(
            previousTrip.date || ""
        );

        setTime(
            previousTrip.time || ""
        );

        setPassengerMode(
            previousTrip.passengerMode ||
            "solo"
        );

        setPassengerName(
            previousTrip.passengerName || ""
        );

        setPassengerAge(
            previousTrip.passengerAge || ""
        );

        setPassengerGender(
            previousTrip.passengerGender || ""
        );

        setPassengers(
            previousTrip.passengers || 1
        );

        setPlateNumber(
            previousTrip.plateNumber || ""
        );
    }, [previousTrip]);

    // =========================================================
    // APPLY SELECTED FERRY
    // =========================================================

    useEffect(() => {
        if (!selectedTrip) {
            return;
        }

        /*
         * The Trips page should save:
         *
         * {
         *   vesselName: "MV Island Princess",
         *   origin: "Iloilo",
         *   destination: "Guimaras",
         *   time: "06:00",
         *   passengersAvailable: 45,
         *   vehicleAvailable: 8
         * }
         *
         * We also support alternate property names
         * so the page remains compatible.
         */

        if (
            selectedTrip.origin
        ) {
            setOrigin(
                selectedTrip.origin
            );
        }

        if (
            selectedTrip.destination
        ) {
            setDestination(
                selectedTrip.destination
            );
        }

        if (
            selectedTrip.time
        ) {
            setTime(
                selectedTrip.time
            );
        }

    }, [selectedTrip]);

    // =========================================================
    // DEPARTURE TIME
    // 3:30 AM - 7:30 PM
    // =========================================================

    const MIN_TIME = "03:30";

    const MAX_TIME = "19:30";

    // =========================================================
    // AVAILABLE DEPARTURE TIMES
    // =========================================================

    const departureTimes = [];

    for (
        let minutes = 3 * 60 + 30;
        minutes <= 19 * 60 + 30;
        minutes += 30
    ) {
        const hour =
            Math.floor(minutes / 60);

        const minute =
            minutes % 60;

        const value =
            `${String(hour).padStart(
                2,
                "0"
            )}:${String(minute).padStart(
                2,
                "0"
            )}`;

        departureTimes.push(value);
    }

    // =========================================================
    // PASSENGER DECREASE
    // =========================================================

    const handlePassengerDecrease = () => {

        if (
            passengerMode ===
                "withPassenger" &&
            passengers > 2
        ) {
            setPassengers(
                (previous) =>
                    previous - 1
            );
        }

    };

    // =========================================================
    // PASSENGER INCREASE
    // =========================================================

    const handlePassengerIncrease = () => {

        if (
            passengerMode ===
                "withPassenger" &&
            passengers < 10
        ) {
            setPassengers(
                (previous) =>
                    previous + 1
            );
        }

    };

    // =========================================================
    // PASSENGER MODE
    // =========================================================

    const handlePassengerModeChange = (
        mode
    ) => {

        setPassengerMode(mode);

        if (mode === "solo") {

            setPassengers(1);

        } else {

            setPassengers(
                passengers < 2
                    ? 2
                    : passengers
            );

        }

    };

    // =========================================================
    // TIME CHANGE
    // =========================================================

    const handleTimeChange = (
        event
    ) => {

        const selectedTime =
            event.target.value;

        if (!selectedTime) {

            setTime("");

            return;
        }

        if (
            selectedTime <
            MIN_TIME
        ) {

            setTime(
                MIN_TIME
            );

            setShowTimeModal(true);

            return;
        }

        if (
            selectedTime >
            MAX_TIME
        ) {

            setTime(
                MAX_TIME
            );

            setShowTimeModal(true);

            return;
        }

        setTime(
            selectedTime
        );

        setShowTimeModal(true);
    };

    // =========================================================
    // SELECT DEPARTURE TIME
    // =========================================================

    const handleDepartureTimeSelect =
        (selectedTime) => {

            handleTimeChange({
                target: {
                    value:
                        selectedTime
                }
            });

        };

    // =========================================================
    // FORMAT TIME
    // =========================================================

    const formatTime = (
        timeValue
    ) => {

        if (!timeValue) {
            return "";
        }

        const [
            hours,
            minutes
        ] =
            timeValue.split(":");

        const hourNumber =
            Number(hours);

        const period =
            hourNumber >= 12
                ? "PM"
                : "AM";

        const displayHour =
            hourNumber % 12 || 12;

        return `${displayHour}:${minutes} ${period}`;
    };

    // =========================================================
    // SUBMIT BOOKING
    // =========================================================

    const handleSubmit = (
        event
    ) => {

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
            Number.isNaN(
                ageNumber
            ) ||
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

        if (
            origin ===
            destination
        ) {

            alert(
                "Origin and Destination cannot be the same."
            );

            return;
        }

        // =====================================================
        // TIME VALIDATION
        // =====================================================

        if (
            time < MIN_TIME ||
            time > MAX_TIME
        ) {

            alert(
                "Departure time must be between 3:30 AM and 7:30 PM."
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

            // Ferry / Vessel
            vesselName:
                selectedTrip?.vesselName ||
                selectedTrip?.vessel ||
                selectedTrip?.name ||
                "Ferry Vessel",

            vesselTime:
                selectedTrip?.time ||
                time,

            // Passenger information
            passengerName:
                passengerName.trim(),

            passengerAge:
                ageNumber,

            passengerGender,

            passengerMode,

            passengers,

            // Vehicle
            vehicleType,

            plateNumber:
                plateNumber
                    .trim()
                    .toUpperCase()
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
            JSON.stringify(
                tripDetails
            )
        );

        // =====================================================
        // SAVE SELECTED FERRY
        // =====================================================

        if (selectedTrip) {

            sessionStorage.setItem(
                "selectedTrip",
                JSON.stringify({
                    ...selectedTrip,

                    vesselName:
                        selectedTrip.vesselName ||
                        selectedTrip.vessel ||
                        selectedTrip.name ||
                        "Ferry Vessel",

                    time:
                        selectedTrip.time ||
                        time
                })
            );

        }

        // =====================================================
        // CONTINUE TO PAYMENT
        // =====================================================

        navigate(
            "/payment",
            {
                state: {
                    trip:
                        tripDetails
                }
            }
        );
    };

    // =========================================================
    // TODAY'S DATE
    // =========================================================

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

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

                    background: #f5f6f8;

                    color: #222222;
                }

                button,
                input,
                select {
                    font-family: inherit;
                }

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
                        0 15px 45px
                        rgba(
                            0,
                            0,
                            0,
                            0.06
                        );
                }

                /* =================================================
                   HEADER
                ================================================= */

                .book-trip-header {
                    height: 76px;

                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    padding:
                        0
                        28px;

                    border-bottom:
                        1px solid #eeeeee;
                }

                .back-button {
                    width: 42px;

                    height: 42px;

                    border:
                        1px solid #eeeeee;

                    border-radius: 11px;

                    background: #ffffff;

                    color: #333333;

                    font-size: 20px;

                    cursor: pointer;

                    transition:
                        0.2s ease;
                }

                .back-button:hover {
                    background: #fff5ed;

                    color: #f28c28;

                    border-color:
                        #f5c9a7;
                }

                .book-trip-logo {
                    height: 55px;

                    display: flex;

                    align-items: center;

                    justify-content: center;
                }

                .book-trip-logo img {
                    width: 70px;

                    height: 55px;

                    object-fit: contain;
                }

                .header-spacer {
                    width: 42px;

                    height: 42px;
                }

                /* =================================================
                   HEADING
                ================================================= */

                .book-trip-heading {
                    padding:
                        30px
                        32px
                        10px;
                }

                .book-trip-heading h1 {
                    margin: 0;

                    color: #222222;

                    font-size: 28px;

                    font-weight: 800;
                }

                .book-trip-heading p {
                    margin:
                        7px
                        0
                        0;

                    color: #999999;

                    font-size: 12px;
                }

                /* =================================================
                   SELECTED FERRY
                ================================================= */

                .selected-vessel-card {
                    margin:
                        18px
                        32px
                        5px;

                    padding:
                        16px
                        18px;

                    display: flex;

                    align-items: center;

                    justify-content:
                        space-between;

                    gap: 20px;

                    background:
                        linear-gradient(
                            135deg,
                            #fff7ef,
                            #ffffff
                        );

                    border:
                        1px solid #f4d7c0;

                    border-radius: 13px;
                }

                .selected-vessel-label {
                    color: #999999;

                    font-size: 10px;

                    font-weight: 600;

                    text-transform:
                        uppercase;

                    letter-spacing:
                        0.5px;
                }

                .selected-vessel-name {
                    margin-top: 4px;

                    color: #222222;

                    font-size: 15px;

                    font-weight: 800;
                }

                .selected-vessel-route {
                    margin-top: 3px;

                    color: #888888;

                    font-size: 10px;
                }

                .selected-vessel-time {
                    padding:
                        8px
                        12px;

                    border-radius: 9px;

                    background: #ffffff;

                    color: #f28c28;

                    font-size: 12px;

                    font-weight: 700;
                }

                /* =================================================
                   FORM
                ================================================= */

                .trip-form {
                    padding:
                        20px
                        32px
                        35px;
                }

                .form-section {
                    padding:
                        25px
                        0;

                    border-bottom:
                        1px solid #eeeeee;
                }

                .form-section:last-of-type {
                    border-bottom: none;
                }

                .section-title {
                    display: flex;

                    align-items: center;

                    gap: 14px;

                    margin-bottom: 22px;
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

                    font-size: 11px;

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
                   PASSENGER DETAILS
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

                .passenger-details-grid
                .form-group {
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

                    font-size: 12px;

                    font-weight: 500;
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

                    cursor: pointer;
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

                    border-radius: 11px;

                    background:
                        linear-gradient(
                            135deg,
                            #f28c28,
                            #ff7417
                        );

                    color: #ffffff;

                    font-size: 13px;

                    font-weight: 700;

                    cursor: pointer;

                    box-shadow:
                        0 8px 20px
                        rgba(
                            242,
                            140,
                            40,
                            0.20
                        );

                    transition:
                        0.2s ease;
                }

                .continue-button:hover {
                    transform:
                        translateY(-1px);

                    box-shadow:
                        0 10px 24px
                        rgba(
                            242,
                            140,
                            40,
                            0.28
                        );
                }

                .button-arrow {
                    font-size: 18px;
                }

                /* =================================================
                   TIME MODAL
                ================================================= */

                .time-modal-overlay {
                    position: fixed;

                    inset: 0;

                    z-index: 1000;

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

                .time-modal {
                    width: 100%;

                    max-width: 400px;

                    padding: 25px;

                    background: #ffffff;

                    border-radius: 18px;

                    text-align: center;

                    box-shadow:
                        0 25px 60px
                        rgba(
                            0,
                            0,
                            0,
                            0.20
                        );
                }

                .time-modal h2 {
                    margin:
                        0
                        0
                        8px;

                    font-size: 19px;
                }

                .time-modal p {
                    margin:
                        0
                        0
                        18px;

                    color: #777777;

                    font-size: 12px;

                    line-height: 1.5;
                }

                .time-modal button {
                    width: 100%;

                    height: 44px;

                    border: none;

                    border-radius: 9px;

                    background: #f28c28;

                    color: #ffffff;

                    font-weight: 700;

                    cursor: pointer;
                }

                /* =================================================
                   TABLET
                ================================================= */

                @media (max-width: 768px) {

                    .book-trip-page {
                        padding:
                            20px
                            12px
                            40px;
                    }

                    .book-trip-heading {
                        padding:
                            25px
                            22px
                            10px;
                    }

                    .trip-form {
                        padding:
                            15px
                            22px
                            30px;
                    }

                    .selected-vessel-card {
                        margin-left: 22px;

                        margin-right: 22px;
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

                @media (max-width: 520px) {

                    .book-trip-page {
                        padding:
                            0
                            0
                            30px;
                    }

                    .book-trip-container {
                        border-radius: 0;

                        border-left: none;

                        border-right: none;
                    }

                    .book-trip-header {
                        padding:
                            0
                            16px;
                    }

                    .book-trip-heading {
                        padding:
                            22px
                            16px
                            8px;
                    }

                    .book-trip-heading h1 {
                        font-size: 25px;
                    }

                    .trip-form {
                        padding:
                            12px
                            16px
                            30px;
                    }

                    .selected-vessel-card {
                        margin:
                            16px
                            16px
                            5px;

                        align-items:
                            flex-start;

                        flex-direction:
                            column;
                    }

                    .selected-vessel-time {
                        align-self:
                            stretch;

                        text-align:
                            center;
                    }

                    .route-row {
                        grid-template-columns:
                            1fr;
                    }

                    .route-arrow {
                        width: 100%;

                        height: 25px;

                        transform:
                            rotate(90deg);
                    }

                    .date-time-row {
                        grid-template-columns:
                            1fr;
                    }

                    .passenger-details-grid {
                        grid-template-columns:
                            1fr;
                    }

                    .passenger-details-grid
                    .form-group:first-child {
                        grid-column:
                            auto;
                    }

                    .section-title {
                        margin-bottom:
                            20px;
                    }

                    .section-title h2 {
                        font-size:
                            16px;
                    }

                    .section-title p {
                        font-size:
                            11px;
                    }

                    .form-group input,
                    .form-group select,
                    .route-field input,
                    .route-field select,
                    .passenger-input {
                        height:
                            48px;
                    }

                    .continue-button {
                        height:
                            52px;
                    }

                }

                /* =================================================
                   SMALL PHONES
                ================================================= */

                @media (max-width: 380px) {

                    .trip-form {
                        padding-left:
                            16px;

                        padding-right:
                            16px;
                    }

                    .book-trip-heading {
                        padding-left:
                            16px;

                        padding-right:
                            16px;
                    }

                    .book-trip-heading h1 {
                        font-size:
                            25px;
                    }

                    .section-title {
                        gap:
                            10px;
                    }

                    .section-number {
                        width:
                            32px;

                        height:
                            32px;

                        flex-basis:
                            32px;
                    }

                    .passenger-counter button {
                        width:
                            52px;

                        flex-basis:
                            52px;
                    }

                }

            `}</style>

            {/* =====================================================
                TIME MODAL
            ===================================================== */}

            {showTimeModal && (

                <div
                    className="time-modal-overlay"
                    onClick={() =>
                        setShowTimeModal(false)
                    }
                >

                    <div
                        className="time-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <h2>
                            Departure Time
                        </h2>

                        <p>
                            Your selected departure
                            time is{" "}
                            <strong>
                                {formatTime(time)}
                            </strong>.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                setShowTimeModal(false)
                            }
                        >
                            Done
                        </button>

                    </div>

                </div>

            )}

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
                                src={"https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956"}
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
                       SELECTED FERRY
                    ================================================= */}

                    {selectedTrip && (

                        <div className="selected-vessel-card">

                            <div>

                                <div className="selected-vessel-label">
                                    Selected Ferry
                                </div>

                                <div className="selected-vessel-name">

                                    {selectedTrip.vesselName ||
                                        selectedTrip.vessel ||
                                        selectedTrip.name ||
                                        "Ferry Vessel"}

                                </div>

                                <div className="selected-vessel-route">

                                    {selectedTrip.origin ||
                                        origin ||
                                        "Iloilo"}

                                    {" → "}

                                    {selectedTrip.destination ||
                                        destination ||
                                        "Guimaras"}

                                </div>

                            </div>

                            <div className="selected-vessel-time">

                                {formatTime(
                                    selectedTrip.time ||
                                    time
                                )}

                            </div>

                        </div>

                    )}

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

                                <div className="route-arrow">
                                    →
                                </div>

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

                                <div className="form-group">

                                    <label htmlFor="time">
                                        Departure Time
                                    </label>

                                    <select
                                        id="time"
                                        value={time}
                                        onChange={
                                            handleTimeChange
                                        }
                                    >

                                        <option value="">
                                            Select departure time
                                        </option>

                                        {departureTimes.map(
                                            (departureTime) => (

                                                <option
                                                    key={
                                                        departureTime
                                                    }
                                                    value={
                                                        departureTime
                                                    }
                                                >
                                                    {formatTime(
                                                        departureTime
                                                    )}
                                                </option>

                                            )
                                        )}

                                    </select>

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

                            <div className="passenger-details-grid">

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

                                <div className="form-group">

                                    <label htmlFor="passengerAge">
                                        Age
                                    </label>

                                    <input
                                        id="passengerAge"
                                        type="number"
                                        min="1"
                                        max="120"
                                        className="passenger-input"
                                        placeholder="Age"
                                        value={passengerAge}
                                        onChange={(event) =>
                                            setPassengerAge(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="passengerGender">
                                        Gender
                                    </label>

                                    <select
                                        id="passengerGender"
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

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                            </div>

                            {/* PASSENGER MODE */}

                            <div className="form-group">

                                <label>
                                    Passenger Type
                                </label>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "1fr 1fr",
                                        gap: "10px"
                                    }}
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handlePassengerModeChange(
                                                "solo"
                                            )
                                        }
                                        style={{
                                            padding:
                                                "13px",
                                            border:
                                                passengerMode ===
                                                "solo"
                                                    ? "2px solid #f28c28"
                                                    : "1px solid #dddddd",
                                            borderRadius:
                                                "10px",
                                            background:
                                                passengerMode ===
                                                "solo"
                                                    ? "#fff7f0"
                                                    : "#ffffff",
                                            color:
                                                "#333",
                                            cursor:
                                                "pointer",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        Solo
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handlePassengerModeChange(
                                                "withPassenger"
                                            )
                                        }
                                        style={{
                                            padding:
                                                "13px",
                                            border:
                                                passengerMode ===
                                                "withPassenger"
                                                    ? "2px solid #f28c28"
                                                    : "1px solid #dddddd",
                                            borderRadius:
                                                "10px",
                                            background:
                                                passengerMode ===
                                                "withPassenger"
                                                    ? "#fff7f0"
                                                    : "#ffffff",
                                            color:
                                                "#333",
                                            cursor:
                                                "pointer",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        With Passenger
                                    </button>

                                </div>

                            </div>

                            {/* PASSENGER COUNT */}

                            <div className="form-group">

                                <label>
                                    Number of Passengers
                                </label>

                                <div className="passenger-counter">

                                    <button
                                        type="button"
                                        disabled={
                                            passengerMode ===
                                            "solo"
                                        }
                                        onClick={
                                            handlePassengerDecrease
                                        }
                                    >
                                        −
                                    </button>

                                    <div className="passenger-value">

                                        <strong>
                                            {passengers}
                                        </strong>

                                        <span>
                                            passenger
                                            {passengers !== 1
                                                ? "s"
                                                : ""}
                                        </span>

                                    </div>

                                    <button
                                        type="button"
                                        disabled={
                                            passengerMode ===
                                            "solo"
                                        }
                                        onClick={
                                            handlePassengerIncrease
                                        }
                                    >
                                        +
                                    </button>

                                </div>

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
                                        Provide the vehicle
                                        information.
                                    </p>

                                </div>

                            </div>

                            <div className="date-time-row">

                                <div className="form-group">

                                    <label htmlFor="vehicleType">
                                        Vehicle Type
                                    </label>

                                    <input
                                        id="vehicleType"
                                        type="text"
                                        value={
                                            vehicleType
                                        }
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
                                        value={
                                            plateNumber
                                        }
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
                                    trip schedule, vessel, and
                                    plate number are correct.
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