import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const LOGO_URL =
    "https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__SjoqmY7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956";


const MAX_PASSENGERS = 5;
const MIN_PASSENGERS = 1;


const BookTrip = () => {

    const navigate = useNavigate();


    /*
     * =========================================================
     * RECOVER PREVIOUS TRIP
     * =========================================================
     */

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


    /*
     * =========================================================
     * TRIP INFORMATION
     * =========================================================
     */

    const [origin, setOrigin] =
        useState(
            previousTrip.origin || ""
        );


    const [destination, setDestination] =
        useState(
            previousTrip.destination || ""
        );


    const [date, setDate] =
        useState(
            previousTrip.date || ""
        );


    const [time, setTime] =
        useState(
            previousTrip.time || ""
        );


    /*
     * =========================================================
     * PASSENGER MODE
     *
     * solo          = 1 passenger
     * withPassenger = 2 to 5 passengers
     * =========================================================
     */

    const [passengerMode, setPassengerMode] =
        useState(
            previousTrip.passengerMode ||
            (
                Number(previousTrip.passengers || 1) > 1
                    ? "withPassenger"
                    : "solo"
            )
        );


    /*
     * =========================================================
     * PASSENGER INFORMATION
     *
     * This is now an ARRAY.
     *
     * Every passenger gets:
     * - name
     * - age
     * - gender
     * =========================================================
     */

    const createPassenger = (
        existing = {}
    ) => ({
        name:
            existing.name ||
            "",
        age:
            existing.age ||
            "",
        gender:
            existing.gender ||
            "",
    });


    const existingPassengerDetails =
        Array.isArray(
            previousTrip.passengerDetails
        )
            ? previousTrip.passengerDetails
            : [];


    /*
     * =========================================================
     * INITIAL PASSENGER COUNT
     *
     * Default:
     * - previous saved count
     * - otherwise 2 for with passenger
     * - otherwise 1 for solo
     * =========================================================
     */

    const savedPassengerCount =
        Number(
            previousTrip.passengers ||
            (
                previousTrip.passengerMode ===
                "solo"
                    ? 1
                    : 2
            )
        );


    const initialPassengerCount =
        Math.min(
            Math.max(
                savedPassengerCount,
                MIN_PASSENGERS
            ),
            MAX_PASSENGERS
        );


    /*
     * =========================================================
     * CREATE PASSENGER ARRAY
     * =========================================================
     */

    const buildInitialPassengers = () => {

        const result = [];


        for (
            let index = 0;
            index < initialPassengerCount;
            index++
        ) {

            if (
                existingPassengerDetails[index]
            ) {

                result.push(
                    createPassenger(
                        existingPassengerDetails[index]
                    )
                );

            } else if (
                index === 0 &&
                (
                    previousTrip.passengerName ||
                    previousTrip.passengerAge ||
                    previousTrip.passengerGender
                )
            ) {

                /*
                 * Backward compatibility
                 *
                 * Old saved bookings only had:
                 * passengerName
                 * passengerAge
                 * passengerGender
                 */

                result.push({

                    name:
                        previousTrip.passengerName ||
                        "",

                    age:
                        previousTrip.passengerAge ||
                        "",

                    gender:
                        previousTrip.passengerGender ||
                        "",

                });

            } else {

                result.push(
                    createPassenger()
                );
            }
        }


        return result;
    };


    const [
        passengerDetails,
        setPassengerDetails
    ] = useState(
        buildInitialPassengers()
    );


    /*
     * =========================================================
     * PASSENGER COUNT
     * =========================================================
     */

    const passengers =
        passengerDetails.length;


    /*
     * =========================================================
     * MOTORCYCLE
     * =========================================================
     */

    const vehicleType =
        previousTrip.vehicleType ||
        "Motorcycle";


    const [plateNumber, setPlateNumber] =
        useState(
            previousTrip.plateNumber ||
            ""
        );


    /*
     * =========================================================
     * PASSENGER FIELD UPDATE
     * =========================================================
     */

    const updatePassenger = (
        index,
        field,
        value
    ) => {

        setPassengerDetails(
            (previous) => {

                const updated =
                    [...previous];


                updated[index] = {

                    ...updated[index],

                    [field]:
                        value,

                };


                return updated;
            }
        );
    };


    /*
     * =========================================================
     * PASSENGER INCREASE
     *
     * MAXIMUM = 5
     * =========================================================
     */

    const handlePassengerIncrease = () => {

        if (
            passengers >=
            MAX_PASSENGERS
        ) {
            return;
        }


        setPassengerDetails(
            (previous) => [
                ...previous,
                createPassenger()
            ]
        );


        /*
         * If user is adding passengers,
         * automatically switch to
         * "With Passenger".
         */

        if (
            passengerMode !==
            "withPassenger"
        ) {

            setPassengerMode(
                "withPassenger"
            );
        }
    };


    /*
     * =========================================================
     * PASSENGER DECREASE
     * =========================================================
     */

    const handlePassengerDecrease = () => {

        if (
            passengers <=
            MIN_PASSENGERS
        ) {
            return;
        }


        setPassengerDetails(
            (previous) =>
                previous.slice(
                    0,
                    previous.length - 1
                )
        );


        /*
         * If only one passenger
         * remains, switch to Solo.
         */

        if (
            passengers - 1 === 1
        ) {

            setPassengerMode(
                "solo"
            );
        }
    };


    /*
     * =========================================================
     * PASSENGER MODE CHANGE
     * =========================================================
     */

    const handlePassengerModeChange = (
        mode
    ) => {

        setPassengerMode(mode);


        /*
         * SOLO
         *
         * Only one passenger.
         */

        if (
            mode === "solo"
        ) {

            setPassengerDetails(
                (previous) => {

                    /*
                     * Keep the first passenger's
                     * information.
                     */

                    return [
                        previous[0] ||
                        createPassenger()
                    ];
                }
            );

            return;
        }


        /*
         * WITH PASSENGER
         *
         * Minimum = 2
         */

        setPassengerDetails(
            (previous) => {

                if (
                    previous.length >= 2
                ) {

                    return previous;
                }


                return [
                    ...previous,

                    createPassenger()
                ];
            }
        );
    };


    /*
     * =========================================================
     * DATE
     * =========================================================
     */

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    /*
     * =========================================================
     * SUBMIT BOOKING
     * =========================================================
     */

    const handleSubmit = (
        event
    ) => {

        event.preventDefault();


        /*
         * =====================================================
         * BASIC TRIP VALIDATION
         * =====================================================
         */

        if (
            !origin ||
            !destination ||
            !date ||
            !time ||
            !plateNumber.trim()
        ) {

            alert(
                "Please complete all trip details."
            );

            return;
        }


        /*
         * =====================================================
         * SAME PORT VALIDATION
         * =====================================================
         */

        if (
            origin === destination
        ) {

            alert(
                "Origin and Destination cannot be the same."
            );

            return;
        }


        /*
         * =====================================================
         * PASSENGER COUNT VALIDATION
         * =====================================================
         */

        if (
            passengers <
            MIN_PASSENGERS ||
            passengers >
            MAX_PASSENGERS
        ) {

            alert(
                "You can book a maximum of 5 passengers."
            );

            return;
        }


        /*
         * =====================================================
         * PASSENGER INFORMATION VALIDATION
         *
         * EVERY PASSENGER MUST HAVE:
         * - NAME
         * - AGE
         * - GENDER
         * =====================================================
         */

        for (
            let index = 0;
            index < passengerDetails.length;
            index++
        ) {

            const passenger =
                passengerDetails[index];


            if (
                !passenger.name.trim()
            ) {

                alert(
                    `Please enter the full name of Passenger ${
                        index + 1
                    }.`
                );

                return;
            }


            if (
                !passenger.age
            ) {

                alert(
                    `Please enter the age of Passenger ${
                        index + 1
                    }.`
                );

                return;
            }


            const ageNumber =
                Number(
                    passenger.age
                );


            if (
                Number.isNaN(
                    ageNumber
                ) ||
                ageNumber < 1 ||
                ageNumber > 120
            ) {

                alert(
                    `Please enter a valid age for Passenger ${
                        index + 1
                    }.`
                );

                return;
            }


            if (
                !passenger.gender
            ) {

                alert(
                    `Please select the gender of Passenger ${
                        index + 1
                    }.`
                );

                return;
            }
        }


        /*
         * =====================================================
         * CLEAN PASSENGER DATA
         * =====================================================
         */

        const cleanedPassengerDetails =
            passengerDetails.map(
                (passenger) => ({

                    name:
                        passenger.name
                            .trim(),

                    age:
                        Number(
                            passenger.age
                        ),

                    gender:
                        passenger.gender,

                })
            );


        /*
         * =====================================================
         * FIRST PASSENGER
         *
         * These are kept for compatibility
         * with the existing Payment and
         * Confirmation pages.
         * =====================================================
         */

        const firstPassenger =
            cleanedPassengerDetails[0];


        /*
         * =====================================================
         * COMPLETE TRIP DETAILS
         * =====================================================
         */

        const tripDetails = {

            /*
             * Route
             */

            origin,

            destination,


            /*
             * Schedule
             */

            date,

            time,


            /*
             * Passenger mode
             */

            passengerMode,


            /*
             * Total number of passengers
             */

            passengers,


            /*
             * NEW:
             * Complete passenger list
             */

            passengerDetails:
                cleanedPassengerDetails,


            /*
             * OLD COMPATIBILITY FIELDS
             *
             * These represent Passenger 1.
             */

            passengerName:
                firstPassenger.name,

            passengerAge:
                firstPassenger.age,

            passengerGender:
                firstPassenger.gender,


            /*
             * Vehicle
             */

            vehicleType,

            plateNumber:
                plateNumber
                    .trim()
                    .toUpperCase(),

        };


        /*
         * =====================================================
         * SAVE TRIP DETAILS
         * =====================================================
         */

        sessionStorage.setItem(
            "tripDetails",
            JSON.stringify(
                tripDetails
            )
        );


        /*
         * =====================================================
         * SAVE PENDING TRIP
         * =====================================================
         */

        sessionStorage.setItem(
            "pendingTrip",
            JSON.stringify(
                tripDetails
            )
        );


        /*
         * =====================================================
         * SAVE LATEST BOOKING
         * =====================================================
         */

        sessionStorage.setItem(
            "latestBooking",
            JSON.stringify(
                tripDetails
            )
        );


        /*
         * =====================================================
         * CONSOLE CHECK
         *
         * You can open browser console
         * to verify all passengers.
         * =====================================================
         */

        console.log(
            "Complete Trip Details:",
            tripDetails
        );


        /*
         * =====================================================
         * GO TO PAYMENT
         * =====================================================
         */

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
                    width: 100%;
                    min-height: 100%;
                }


                body {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    background:
                        #f7f8fa;

                    color:
                        #222222;
                }


                /* =================================================
                   PAGE
                ================================================= */

                .book-trip-page {

                    min-height:
                        100vh;

                    padding:
                        30px
                        20px
                        60px;

                    background:
                        #f7f8fa;

                    display:
                        flex;

                    justify-content:
                        center;
                }


                .book-trip-container {

                    width:
                        100%;

                    max-width:
                        850px;

                    background:
                        #ffffff;

                    border:
                        1px solid #e5e5e5;

                    border-radius:
                        18px;

                    box-shadow:
                        0 10px 35px
                        rgba(
                            0,
                            0,
                            0,
                            0.06
                        );

                    overflow:
                        hidden;
                }


                /* =================================================
                   HEADER
                ================================================= */

                .book-trip-header {

                    height:
                        82px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    padding:
                        0 28px;

                    border-bottom:
                        1px solid #eeeeee;

                    background:
                        #ffffff;
                }


                .back-button {

                    width:
                        42px;

                    height:
                        42px;

                    border:
                        1px solid #dddddd;

                    border-radius:
                        10px;

                    background:
                        #ffffff;

                    color:
                        #333333;

                    font-size:
                        20px;

                    cursor:
                        pointer;

                    transition:
                        0.2s ease;
                }


                .back-button:hover {

                    background:
                        #fff7f0;

                    border-color:
                        #f28c28;

                    color:
                        #f28c28;
                }


                .book-trip-logo {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    flex:
                        1;
                }


                .book-trip-logo img {

                    width:
                        125px;

                    height:
                        65px;

                    object-fit:
                        contain;
                }


                .header-spacer {

                    width:
                        42px;
                }


                /* =================================================
                   PAGE HEADING
                ================================================= */

                .book-trip-heading {

                    padding:
                        32px
                        42px
                        20px;
                }


                .book-trip-heading h1 {

                    margin:
                        0;

                    color:
                        #222222;

                    font-size:
                        28px;

                    font-weight:
                        750;
                }


                .book-trip-heading p {

                    margin:
                        7px
                        0
                        0;

                    color:
                        #999999;

                    font-size:
                        13px;
                }


                /* =================================================
                   FORM
                ================================================= */

                .trip-form {

                    padding:
                        0
                        42px
                        42px;
                }


                .form-section {

                    padding:
                        28px
                        0;

                    border-top:
                        1px solid #eeeeee;
                }


                .section-title {

                    display:
                        flex;

                    align-items:
                        flex-start;

                    gap:
                        13px;

                    margin-bottom:
                        24px;
                }


                .section-number {

                    width:
                        38px;

                    height:
                        38px;

                    flex:
                        0
                        0
                        38px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        12px;

                    background:
                        #fff1e5;

                    color:
                        #f28c28;

                    font-size:
                        11px;

                    font-weight:
                        800;
                }


                .section-title h2 {

                    margin:
                        0;

                    color:
                        #222222;

                    font-size:
                        19px;

                    font-weight:
                        750;
                }


                .section-title p {

                    margin:
                        5px
                        0
                        0;

                    color:
                        #999999;

                    font-size:
                        12px;

                    line-height:
                        1.4;
                }


                /* =================================================
                   ROUTE
                ================================================= */

                .route-row {

                    width:
                        100%;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(0, 1fr)
                        50px
                        minmax(0, 1fr);

                    align-items:
                        end;

                    gap:
                        15px;
                }


                .route-field {

                    min-width:
                        0;
                }


                .route-field label,
                .form-group label {

                    display:
                        block;

                    margin-bottom:
                        8px;

                    color:
                        #444444;

                    font-size:
                        12px;

                    font-weight:
                        700;
                }


                .route-field input,
                .route-field select,
                .form-group input,
                .form-group select {

                    width:
                        100%;

                    height:
                        50px;

                    padding:
                        0
                        14px;

                    border:
                        1px solid #dddddd;

                    border-radius:
                        10px;

                    outline:
                        none;

                    background:
                        #ffffff;

                    color:
                        #222222;

                    font-size:
                        13px;

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

                    width:
                        50px;

                    height:
                        50px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    color:
                        #f28c28;

                    font-size:
                        22px;
                }


                /* =================================================
                   FORM GROUP
                ================================================= */

                .form-group {

                    margin-bottom:
                        20px;
                }


                .form-group:last-child {

                    margin-bottom:
                        0;
                }


                /* =================================================
                   DATE / TIME
                ================================================= */

                .date-time-row {

                    width:
                        100%;

                    display:
                        grid;

                    grid-template-columns:
                        minmax(0, 1fr)
                        minmax(0, 1fr);

                    gap:
                        20px;
                }


                /* =================================================
                   PASSENGER MODE
                ================================================= */

                .passenger-choice {

                    display:
                        grid;

                    grid-template-columns:
                        repeat(
                            2,
                            minmax(0, 1fr)
                        );

                    gap:
                        16px;

                    margin-bottom:
                        25px;
                }


                .passenger-choice-card {

                    position:
                        relative;

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        13px;

                    min-height:
                        72px;

                    padding:
                        15px 18px;

                    border:
                        1px solid #dddddd;

                    border-radius:
                        12px;

                    background:
                        #ffffff;

                    cursor:
                        pointer;

                    transition:
                        0.2s ease;
                }


                .passenger-choice-card:hover {

                    border-color:
                        #f28c28;

                    background:
                        #fffaf6;
                }


                .passenger-choice-card.active {

                    border:
                        2px solid #f28c28;

                    background:
                        #fff8f1;
                }


                .choice-radio {

                    width:
                        18px;

                    height:
                        18px;

                    flex:
                        0
                        0
                        18px;

                    border:
                        2px solid #cccccc;

                    border-radius:
                        50%;

                    position:
                        relative;
                }


                .passenger-choice-card.active
                .choice-radio {

                    border-color:
                        #f28c28;
                }


                .passenger-choice-card.active
                .choice-radio::after {

                    content:
                        "";

                    position:
                        absolute;

                    width:
                        8px;

                    height:
                        8px;

                    left:
                        3px;

                    top:
                        3px;

                    border-radius:
                        50%;

                    background:
                        #f28c28;
                }


                .choice-icon {

                    width:
                        34px;

                    height:
                        34px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        10px;

                    background:
                        #fff0e3;

                    font-size:
                        17px;
                }


                .choice-content {

                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        3px;
                }


                .choice-content strong {

                    color:
                        #222222;

                    font-size:
                        13px;
                }


                .choice-content span {

                    color:
                        #999999;

                    font-size:
                        11px;
                }


                /* =================================================
                   PASSENGER CARDS
                ================================================= */

                .passenger-list {

                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        18px;

                    margin-bottom:
                        24px;
                }


                .passenger-card {

                    padding:
                        20px;

                    border:
                        1px solid #e5e5e5;

                    border-radius:
                        13px;

                    background:
                        #fcfcfc;

                    transition:
                        0.2s ease;
                }


                .passenger-card:hover {

                    border-color:
                        #f0c7a5;

                    box-shadow:
                        0 5px 18px
                        rgba(
                            0,
                            0,
                            0,
                            0.04
                        );
                }


                .passenger-card-header {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    margin-bottom:
                        18px;
                }


                .passenger-card-title {

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        9px;
                }


                .passenger-card-number {

                    width:
                        30px;

                    height:
                        30px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        9px;

                    background:
                        #fff0e3;

                    color:
                        #f28c28;

                    font-size:
                        11px;

                    font-weight:
                        800;
                }


                .passenger-card-title strong {

                    color:
                        #222222;

                    font-size:
                        14px;
                }


                .passenger-card-title span {

                    color:
                        #999999;

                    font-size:
                        11px;
                }


                .passenger-fields {

                    display:
                        grid;

                    grid-template-columns:
                        minmax(0, 1.5fr)
                        minmax(100px, 0.6fr)
                        minmax(0, 0.9fr);

                    gap:
                        15px;
                }


                .passenger-fields
                .form-group {

                    margin-bottom:
                        0;
                }


                .passenger-input {

                    width:
                        100%;

                    height:
                        50px;

                    padding:
                        0
                        14px;

                    border:
                        1px solid #dddddd;

                    border-radius:
                        10px;

                    outline:
                        none;

                    background:
                        #ffffff;

                    color:
                        #222222;

                    font-size:
                        13px;

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

                    width:
                        100%;

                    height:
                        52px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    border:
                        1px solid #dddddd;

                    border-radius:
                        10px;

                    overflow:
                        hidden;

                    background:
                        #ffffff;
                }


                .passenger-counter button {

                    width:
                        60px;

                    height:
                        100%;

                    flex:
                        0
                        0
                        60px;

                    border:
                        none;

                    background:
                        #fff7f0;

                    color:
                        #f28c28;

                    font-size:
                        25px;

                    cursor:
                        pointer;

                    transition:
                        0.2s ease;
                }


                .passenger-counter button:hover:not(:disabled) {

                    background:
                        #ffeddf;
                }


                .passenger-counter button:disabled {

                    background:
                        #f7f7f7;

                    color:
                        #cccccc;

                    cursor:
                        not-allowed;
                }


                .passenger-value {

                    flex:
                        1;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        8px;
                }


                .passenger-value strong {

                    color:
                        #222222;

                    font-size:
                        18px;
                }


                .passenger-value span {

                    color:
                        #999999;

                    font-size:
                        12px;
                }


                .passenger-limit {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    margin-top:
                        8px;
                }


                .passenger-help {

                    color:
                        #999999;

                    font-size:
                        11px;
                }


                .passenger-limit-text {

                    color:
                        #f28c28;

                    font-size:
                        11px;

                    font-weight:
                        700;
                }


                .field-help {

                    display:
                        block;

                    margin-top:
                        7px;

                    color:
                        #999999;

                    font-size:
                        11px;

                    line-height:
                        1.4;
                }


                /* =================================================
                   BOOKING NOTE
                ================================================= */

                .booking-note {

                    width:
                        100%;

                    display:
                        flex;

                    align-items:
                        flex-start;

                    gap:
                        12px;

                    padding:
                        15px;

                    border:
                        1px solid #f4dfcf;

                    border-radius:
                        11px;

                    background:
                        #fffaf6;
                }


                .note-icon {

                    width:
                        28px;

                    height:
                        28px;

                    flex:
                        0
                        0
                        28px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        50%;

                    background:
                        #f28c28;

                    color:
                        #ffffff;

                    font-size:
                        13px;

                    font-weight:
                        700;
                }


                .booking-note strong {

                    display:
                        block;

                    margin-bottom:
                        3px;

                    color:
                        #333333;

                    font-size:
                        12px;
                }


                .booking-note p {

                    margin:
                        0;

                    color:
                        #888888;

                    font-size:
                        11px;

                    line-height:
                        1.5;
                }


                /* =================================================
                   CONTINUE BUTTON
                ================================================= */

                .continue-button {

                    width:
                        100%;

                    height:
                        54px;

                    margin-top:
                        18px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        12px;

                    border:
                        none;

                    border-radius:
                        10px;

                    background:
                        linear-gradient(
                            135deg,
                            #f28c28,
                            #ff9d3f
                        );

                    color:
                        #ffffff;

                    font-size:
                        14px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

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

                    font-size:
                        18px;

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

                        max-width:
                            720px;
                    }


                    .trip-form {

                        padding:
                            0
                            35px
                            40px;
                    }


                    .passenger-fields {

                        grid-template-columns:
                            1fr
                            1fr;
                    }


                    .passenger-fields
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

                        padding:
                            0;

                        background:
                            #ffffff;
                    }


                    .book-trip-container {

                        min-height:
                            100vh;

                        max-width:
                            none;

                        border:
                            none;

                        border-radius:
                            0;

                        box-shadow:
                            none;
                    }


                    .book-trip-header {

                        height:
                            82px;

                        padding:
                            0
                            18px;
                    }


                    .book-trip-logo img {

                        width:
                            105px;

                        height:
                            55px;
                    }


                    .header-spacer {

                        width:
                            40px;
                    }


                    .book-trip-heading {

                        padding:
                            30px
                            20px
                            25px;
                    }


                    .book-trip-heading h1 {

                        font-size:
                            28px;
                    }


                    .book-trip-heading p {

                        font-size:
                            13px;
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


                    .route-row {

                        grid-template-columns:
                            1fr;

                        gap:
                            0;
                    }


                    .route-arrow {

                        display:
                            none;
                    }


                    .date-time-row {

                        grid-template-columns:
                            1fr;

                        gap:
                            0;
                    }


                    .passenger-choice {

                        grid-template-columns:
                            1fr;
                    }


                    .passenger-fields {

                        grid-template-columns:
                            1fr;
                    }


                    .passenger-fields
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


                    .passenger-counter button {

                        width:
                            55px;

                        flex-basis:
                            55px;
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


            <main className="book-trip-page">

                <div className="book-trip-container">


                    {/* =================================================
                       HEADER
                    ================================================= */}

                    <header
                        className="book-trip-header"
                    >

                        <button
                            type="button"
                            className="back-button"
                            onClick={() =>
                                navigate(
                                    "/dashboard"
                                )
                            }
                            aria-label="Back to dashboard"
                        >
                            ←
                        </button>


                        <div
                            className="book-trip-logo"
                        >

                        <img
                            src="/images/logo.png"
                            alt="GuimarasGo Logo"
                            className="logo"
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

                    <section
                        className="book-trip-heading"
                    >

                        <h1>
                            Book Your Trip
                        </h1>

                        <p>
                            Choose your route,
                            schedule, and
                            passenger details.
                        </p>

                    </section>


                    {/* =================================================
                       FORM
                    ================================================= */}

                    <form
                        className="trip-form"
                        onSubmit={
                            handleSubmit
                        }
                    >


                        {/* =================================================
                           01 - ROUTE
                        ================================================= */}

                        <section
                            className="form-section"
                        >

                            <div
                                className="section-title"
                            >

                                <span
                                    className="section-number"
                                >
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


                            <div
                                className="route-row"
                            >

                                {/* ORIGIN */}

                                <div
                                    className="route-field"
                                >

                                    <label
                                        htmlFor="origin"
                                    >
                                        Origin Port
                                    </label>


                                    <select
                                        id="origin"
                                        value={origin}
                                        onChange={(
                                            event
                                        ) =>
                                            setOrigin(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    >

                                        <option
                                            value=""
                                        >
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

                                <div
                                    className="route-arrow"
                                >
                                    →
                                </div>


                                {/* DESTINATION */}

                                <div
                                    className="route-field"
                                >

                                    <label
                                        htmlFor="destination"
                                    >
                                        Destination Port
                                    </label>


                                    <select
                                        id="destination"
                                        value={
                                            destination
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setDestination(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    >

                                        <option
                                            value=""
                                        >
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

                        <section
                            className="form-section"
                        >

                            <div
                                className="section-title"
                            >

                                <span
                                    className="section-number"
                                >
                                    02
                                </span>


                                <div>

                                    <h2>
                                        Travel Schedule
                                    </h2>

                                    <p>
                                        Select your travel
                                        date and departure time.
                                    </p>

                                </div>

                            </div>


                            <div
                                className="date-time-row"
                            >

                                {/* DATE */}

                                <div
                                    className="form-group"
                                >

                                    <label
                                        htmlFor="date"
                                    >
                                        Travel Date
                                    </label>


                                    <input
                                        id="date"
                                        type="date"
                                        min={today}
                                        value={date}
                                        onChange={(
                                            event
                                        ) =>
                                            setDate(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    />

                                </div>


                                {/* TIME */}

                                <div
                                    className="form-group"
                                >

                                    <label
                                        htmlFor="time"
                                    >
                                        Departure Time
                                    </label>


                                    <input
                                        id="time"
                                        type="time"
                                        value={time}
                                        onChange={(
                                            event
                                        ) =>
                                            setTime(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    />

                                    <small
                                        className="field-help"
                                    >
                                        Select your preferred
                                        departure time.
                                    </small>

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                           03 - PASSENGER DETAILS
                        ================================================= */}

                        <section
                            className="form-section"
                        >

                            <div
                                className="section-title"
                            >

                                <span
                                    className="section-number"
                                >
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
                               SOLO / WITH PASSENGER
                            ================================================= */}

                            <div
                                className="passenger-choice"
                            >


                                {/* SOLO */}

                                <div
                                    className={
                                        `passenger-choice-card ${
                                            passengerMode ===
                                            "solo"
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        handlePassengerModeChange(
                                            "solo"
                                        )
                                    }
                                >

                                    <div
                                        className="choice-radio"
                                    />


                                    <div
                                        className="choice-icon"
                                    >
                                        👤
                                    </div>


                                    <div
                                        className="choice-content"
                                    >

                                        <strong>
                                            Solo
                                        </strong>

                                        <span>
                                            I am travelling alone.
                                        </span>

                                    </div>

                                </div>


                                {/* WITH PASSENGER */}

                                <div
                                    className={
                                        `passenger-choice-card ${
                                            passengerMode ===
                                            "withPassenger"
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        handlePassengerModeChange(
                                            "withPassenger"
                                        )
                                    }
                                >

                                    <div
                                        className="choice-radio"
                                    />


                                    <div
                                        className="choice-icon"
                                    >
                                        👥
                                    </div>


                                    <div
                                        className="choice-content"
                                    >

                                        <strong>
                                            With Passenger
                                        </strong>

                                        <span>
                                            I am travelling with someone.
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                               DYNAMIC PASSENGER INFORMATION
                            ================================================= */}

                            <div
                                className="passenger-list"
                            >

                                {passengerDetails.map(
                                    (
                                        passenger,
                                        index
                                    ) => (

                                        <div
                                            className="passenger-card"
                                            key={
                                                index
                                            }
                                        >

                                            {/* CARD HEADER */}

                                            <div
                                                className="passenger-card-header"
                                            >

                                                <div
                                                    className="passenger-card-title"
                                                >

                                                    <div
                                                        className="passenger-card-number"
                                                    >
                                                        {
                                                            String(
                                                                index +
                                                                1
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )
                                                        }
                                                    </div>


                                                    <div>

                                                        <strong>
                                                            Passenger{" "}
                                                            {
                                                                index +
                                                                1
                                                            }
                                                        </strong>

                                                        <span>
                                                            {" "}
                                                            — Personal Information
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* PASSENGER FIELDS */}

                                            <div
                                                className="passenger-fields"
                                            >


                                                {/* FULL NAME */}

                                                <div
                                                    className="form-group"
                                                >

                                                    <label
                                                        htmlFor={
                                                            `passenger-name-${index}`
                                                        }
                                                    >
                                                        Full Name
                                                    </label>


                                                    <input
                                                        id={
                                                            `passenger-name-${index}`
                                                        }
                                                        type="text"
                                                        className="passenger-input"
                                                        placeholder="Enter passenger full name"
                                                        value={
                                                            passenger.name
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            updatePassenger(
                                                                index,
                                                                "name",
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        autoComplete="name"
                                                    />

                                                </div>


                                                {/* AGE */}

                                                <div
                                                    className="form-group"
                                                >

                                                    <label
                                                        htmlFor={
                                                            `passenger-age-${index}`
                                                        }
                                                    >
                                                        Age
                                                    </label>


                                                    <input
                                                        id={
                                                            `passenger-age-${index}`
                                                        }
                                                        type="number"
                                                        className="passenger-input"
                                                        placeholder="Age"
                                                        min="1"
                                                        max="120"
                                                        value={
                                                            passenger.age
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            updatePassenger(
                                                                index,
                                                                "age",
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                {/* GENDER */}

                                                <div
                                                    className="form-group"
                                                >

                                                    <label
                                                        htmlFor={
                                                            `passenger-gender-${index}`
                                                        }
                                                    >
                                                        Gender
                                                    </label>


                                                    <select
                                                        id={
                                                            `passenger-gender-${index}`
                                                        }
                                                        className="passenger-input"
                                                        value={
                                                            passenger.gender
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            updatePassenger(
                                                                index,
                                                                "gender",
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                    >

                                                        <option
                                                            value=""
                                                        >
                                                            Select gender
                                                        </option>

                                                        <option
                                                            value="Male"
                                                        >
                                                            Male
                                                        </option>

                                                        <option
                                                            value="Female"
                                                        >
                                                            Female
                                                        </option>

                                                        <option
                                                            value="Prefer not to say"
                                                        >
                                                            Prefer not to say
                                                        </option>

                                                    </select>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* =================================================
                               NUMBER OF PASSENGERS
                            ================================================= */}

                            <div
                                className="form-group"
                            >

                                <label>
                                    Number of Passengers
                                </label>


                                <div
                                    className="passenger-counter"
                                >

                                    {/* MINUS */}

                                    <button
                                        type="button"
                                        onClick={
                                            handlePassengerDecrease
                                        }
                                        disabled={
                                            passengers <=
                                            MIN_PASSENGERS
                                        }
                                        aria-label="Decrease passengers"
                                    >
                                        −
                                    </button>


                                    {/* VALUE */}

                                    <div
                                        className="passenger-value"
                                    >

                                        <strong>
                                            {
                                                passengers
                                            }
                                        </strong>

                                        <span>
                                            {
                                                passengers ===
                                                1
                                                    ? "Passenger"
                                                    : "Passengers"
                                            }
                                        </span>

                                    </div>


                                    {/* PLUS */}

                                    <button
                                        type="button"
                                        onClick={
                                            handlePassengerIncrease
                                        }
                                        disabled={
                                            passengers >=
                                            MAX_PASSENGERS
                                        }
                                        aria-label="Increase passengers"
                                    >
                                        +
                                    </button>

                                </div>


                                <div
                                    className="passenger-limit"
                                >

                                    <span
                                        className="passenger-help"
                                    >
                                        Add personal details
                                        for every passenger.
                                    </span>


                                    <span
                                        className="passenger-limit-text"
                                    >
                                        Maximum 5 passengers
                                    </span>

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                           04 - VEHICLE
                        ================================================= */}

                        <section
                            className="form-section"
                        >

                            <div
                                className="section-title"
                            >

                                <span
                                    className="section-number"
                                >
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


                            {/* VEHICLE TYPE */}

                            <div
                                className="form-group"
                            >

                                <label>
                                    Vehicle Type
                                </label>


                                <input
                                    type="text"
                                    value={
                                        vehicleType
                                    }
                                    disabled
                                />

                            </div>


                            {/* PLATE NUMBER */}

                            <div
                                className="form-group"
                            >

                                <label
                                    htmlFor="plateNumber"
                                >
                                    Plate Number
                                </label>


                                <input
                                    id="plateNumber"
                                    type="text"
                                    placeholder="Enter plate number"
                                    value={
                                        plateNumber
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setPlateNumber(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    maxLength={20}
                                />


                                <small
                                    className="field-help"
                                >
                                    Example: ABC-1234
                                </small>

                            </div>

                        </section>


                        {/* =================================================
                           BOOKING NOTE
                        ================================================= */}

                        <div
                            className="booking-note"
                        >

                            <div
                                className="note-icon"
                            >
                                !
                            </div>


                            <div>

                                <strong>
                                    Before continuing
                                </strong>

                                <p>
                                    Please make sure that
                                    all passenger information,
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

                            <span
                                className="button-arrow"
                            >
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