import React from "react";
import { useNavigate } from "react-router-dom";

const GCashPayment = () => {

    const navigate = useNavigate();

    /*
     * =========================================================
     * LOGO
     * =========================================================
     */

    const LOGO_URL =
        "https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956";


    /*
     * =========================================================
     * GET TRIP DETAILS
     * =========================================================
     */

    const savedTrip =
        sessionStorage.getItem(
            "tripDetails"
        );

    let trip = null;

    try {

        trip = savedTrip
            ? JSON.parse(savedTrip)
            : null;

    } catch (error) {

        console.error(
            "Unable to recover trip details:",
            error
        );

        trip = null;
    }


    /*
     * =========================================================
     * NORMALIZE TRIP INFORMATION
     * =========================================================
     *
     * Keep all information entered from Book Trip.
     */

    const normalizedTrip = trip
        ? {

            ...trip,

            passengerName:
                trip.passengerName ||
                trip.name ||
                "",

            passengerAge:
                trip.passengerAge ||
                trip.age ||
                "",

            passengerGender:
                trip.passengerGender ||
                trip.gender ||
                "",

            passengers:
                Number(
                    trip.passengers ||
                    trip.numberOfPassengers ||
                    1
                ),

            vehicleType:
                trip.vehicleType ||
                trip.vehicle ||
                trip.vehicleDetails?.type ||
                "Motorcycle",

            plateNumber:
                trip.plateNumber ||
                trip.plate_number ||
                trip.plate ||
                trip.motorcyclePlateNumber ||
                trip.vehiclePlateNumber ||
                trip.vehicleDetails?.plateNumber ||
                trip.vehicleDetails?.plate ||
                trip.motorcycle?.plateNumber ||
                "",

        }
        : null;


    /*
     * =========================================================
     * IF TRIP INFORMATION IS MISSING
     * =========================================================
     */

    if (!normalizedTrip) {

        return (

            <main className="gcash-page">

                <div className="gcash-container">

                    <h2>
                        Trip Details Not Found
                    </h2>

                    <p>
                        Please return to the booking page
                        and select your trip again.
                    </p>

                    <button
                        type="button"
                        className="gcash-primary-button"
                        onClick={() =>
                            navigate("/book-trip")
                        }
                    >
                        Back to Book Trip
                    </button>

                </div>

                <style>{`

                    * {
                        box-sizing: border-box;
                    }

                    .gcash-page {
                        min-height: 100vh;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        padding: 20px;

                        background: #f7f8fa;

                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;
                    }

                    .gcash-container {
                        width: 100%;
                        max-width: 520px;

                        padding: 40px;

                        text-align: center;

                        background: #ffffff;

                        border-radius: 20px;

                        box-shadow:
                            0 10px 35px
                            rgba(0,0,0,0.08);
                    }

                    .gcash-primary-button {
                        width: 100%;
                        height: 50px;

                        border: none;
                        border-radius: 10px;

                        background: #f28c28;

                        color: #ffffff;

                        font-size: 15px;
                        font-weight: 700;

                        cursor: pointer;
                    }

                `}</style>

            </main>
        );
    }


    /*
     * =========================================================
     * FARES
     * =========================================================
     */

    const passengers =
        Number(
            normalizedTrip.passengers || 1
        );

    const passengerFare =
        passengers * 40;

    const motorcycleFare =
        150;

    const ppaFee =
        65;

    const totalFare =
        passengerFare +
        motorcycleFare +
        ppaFee;


    /*
     * =========================================================
     * BOOKING REFERENCE
     * =========================================================
     *
     * IMPORTANT:
     *
     * We intentionally create a NEW reference for every
     * completed booking.
     *
     * This prevents Booking #2 and Booking #3 from being
     * treated as the same booking.
     */

    let bookingReference =
        sessionStorage.getItem(
            "currentBookingReference"
        );


    if (!bookingReference) {

        bookingReference =
            "GG-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        sessionStorage.setItem(
            "currentBookingReference",
            bookingReference
        );
    }


    /*
     * =========================================================
     * QR DATA
     * =========================================================
     */

    const qrData = `
GUIMARASGO TEST PAYMENT

Booking Reference:
${bookingReference}

Passenger:
${normalizedTrip.passengerName || "N/A"}

Age:
${normalizedTrip.passengerAge || "N/A"}

Gender:
${normalizedTrip.passengerGender || "N/A"}

Passengers:
${passengers}

Route:
${normalizedTrip.origin} to ${normalizedTrip.destination}

Date:
${normalizedTrip.date}

Departure:
${normalizedTrip.time}

Vehicle:
${normalizedTrip.vehicleType}

Plate Number:
${normalizedTrip.plateNumber || "N/A"}

Amount:
PHP ${totalFare.toFixed(2)}
    `.trim();


    /*
     * =========================================================
     * QR IMAGE
     * =========================================================
     */

    const qrCodeUrl =
        `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
            qrData
        )}`;


    /*
     * =========================================================
     * COMPLETE PAYMENT
     * =========================================================
     */

    const handleCompletedPayment = () => {

        /*
         * =====================================================
         * CREATE THE COMPLETE BOOKING OBJECT
         * =====================================================
         */

        const completedBooking = {

            /*
             * Booking reference
             */
            bookingReference,

            /*
             * Route
             */
            origin:
                normalizedTrip.origin,

            destination:
                normalizedTrip.destination,

            /*
             * Schedule
             */
            date:
                normalizedTrip.date,

            time:
                normalizedTrip.time,

            /*
             * Passenger details
             */
            passengerName:
                normalizedTrip.passengerName,

            passengerAge:
                normalizedTrip.passengerAge,

            passengerGender:
                normalizedTrip.passengerGender,

            passengers,

            /*
             * Vehicle details
             */
            vehicleType:
                normalizedTrip.vehicleType,

            plateNumber:
                normalizedTrip.plateNumber,

            /*
             * Fare
             */
            passengerFare,

            motorcycleFare,

            ppaFee,

            totalFare,

            totalPaid:
                totalFare,

            /*
             * Payment
             */
            paymentMethod:
                "GCash",

            paymentStatus:
                "PAID",

            status:
                "CONFIRMED",

            /*
             * QR
             */
            qrCodeUrl,

            /*
             * Timestamp
             */
            bookedAt:
                new Date().toISOString()
        };


        /*
         * =====================================================
         * SAVE PAYMENT STATUS
         * =====================================================
         */

        sessionStorage.setItem(
            "paymentStatus",
            "TEST PAYMENT COMPLETED"
        );


        sessionStorage.setItem(
            "paymentMethod",
            "GCash"
        );


        /*
         * =====================================================
         * SAVE COMPLETE BOOKING
         * =====================================================
         *
         * Confirmation reads this object.
         */

        sessionStorage.setItem(
            "confirmedBooking",
            JSON.stringify(
                completedBooking
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
                completedBooking
            )
        );


        /*
         * =====================================================
         * SAVE COMPLETE BOOKING HISTORY
         * =====================================================
         */

        let allBookings = [];

        try {

            const savedAllBookings =
                sessionStorage.getItem(
                    "allBookings"
                );

            if (savedAllBookings) {

                const parsed =
                    JSON.parse(
                        savedAllBookings
                    );

                if (Array.isArray(parsed)) {

                    allBookings =
                        parsed;
                }
            }

        } catch (error) {

            console.error(
                "Unable to load booking history:",
                error
            );

            allBookings = [];
        }


        /*
         * =====================================================
         * CHECK REFERENCE
         * =====================================================
         *
         * Normally this will always be a new reference.
         */

        const existingIndex =
            allBookings.findIndex(
                (item) =>
                    item.bookingReference ===
                    completedBooking.bookingReference
            );


        if (existingIndex === -1) {

            /*
             * NEW BOOKING
             */
            allBookings.push(
                completedBooking
            );

        } else {

            /*
             * UPDATE SAME BOOKING
             */
            allBookings[
                existingIndex
            ] = {
                ...allBookings[
                    existingIndex
                ],
                ...completedBooking
            };
        }


        /*
         * =====================================================
         * SAVE ALL BOOKINGS
         * =====================================================
         */

        sessionStorage.setItem(
            "allBookings",
            JSON.stringify(
                allBookings
            )
        );


        /*
         * =====================================================
         * SAVE RECENT BOOKINGS
         * =====================================================
         *
         * Newest booking first.
         *
         * Dashboard displays the newest 3.
         */

        const recentBookings =
            [...allBookings]
                .reverse()
                .slice(0, 3);


        sessionStorage.setItem(
            "recentBookings",
            JSON.stringify(
                recentBookings
            )
        );


        /*
         * =====================================================
         * PAYMENT DETAILS
         * =====================================================
         */

        const paymentDetails = {

            paymentMethod:
                "gcash",

            amount:
                totalFare,

            currency:
                "PHP",

            status:
                "PAID",

            bookingReference,

            trip:
                normalizedTrip
        };


        sessionStorage.setItem(
            "paymentDetails",
            JSON.stringify(
                paymentDetails
            )
        );


        /*
         * =====================================================
         * CLEAN CURRENT REFERENCE
         * =====================================================
         *
         * The next booking will receive a new reference.
         */

        sessionStorage.removeItem(
            "currentBookingReference"
        );

        /*
         * Also remove the old generic reference used
         * by previous versions.
         */

        sessionStorage.removeItem(
            "bookingReference"
        );


        /*
         * =====================================================
         * GO TO CONFIRMATION
         * =====================================================
         */

        navigate(
            "/confirmation",
            {
                replace: true
            }
        );
    };


    /*
     * =========================================================
     * FORMAT TIME
     * =========================================================
     */

    const formatTime = (time) => {

        if (!time) {
            return "N/A";
        }

        const stringTime =
            String(time);

        if (
            stringTime
                .toUpperCase()
                .includes("AM") ||
            stringTime
                .toUpperCase()
                .includes("PM")
        ) {
            return stringTime;
        }

        const parts =
            stringTime.split(":");

        if (parts.length < 2) {
            return stringTime;
        }

        const hours =
            Number(parts[0]);

        const minutes =
            parts[1];

        const suffix =
            hours >= 12
                ? "PM"
                : "AM";

        const displayHour =
            hours % 12 || 12;

        return `${displayHour}:${minutes} ${suffix}`;
    };


    return (

        <main className="gcash-page">

            <div className="gcash-container">

                {/* BACK */}

                <button
                    type="button"
                    className="gcash-back"
                    onClick={() =>
                        navigate("/payment")
                    }
                >
                    ← Back to Payment Method
                </button>


                {/* LOGO */}

                <div className="gcash-logo">

                    <img
                        src={LOGO_URL}
                        alt="GuimarasGo Logo"
                    />

                </div>


                {/* TITLE */}

                <div className="gcash-heading">

                    <div className="gcash-icon">
                        G
                    </div>

                    <div>

                        <h1>
                            GCash Payment
                        </h1>

                        <p>
                            Scan the QR code to continue
                            your test payment.
                        </p>

                    </div>

                </div>


                {/* TEST NOTICE */}

                <div className="test-notice">

                    <strong>
                        TEST PAYMENT
                    </strong>

                    <p>
                        This is a testing payment flow
                        for the GuimarasGo student project.
                    </p>

                </div>


                {/* QR CODE */}

                <div className="qr-section">

                    <img
                        className="qr-code"
                        src={qrCodeUrl}
                        alt="GCash Payment QR Code"
                    />

                    <p>
                        Scan this QR code for
                        your test payment.
                    </p>

                </div>


                {/* PAYMENT DETAILS */}

                <div className="payment-details">

                    <h2>
                        Payment Details
                    </h2>


                    <div className="detail-row">

                        <span>
                            Booking Reference
                        </span>

                        <strong>
                            {bookingReference}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Passenger
                        </span>

                        <strong>
                            {normalizedTrip.passengerName ||
                                "N/A"}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Age
                        </span>

                        <strong>
                            {normalizedTrip.passengerAge ||
                                "N/A"}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Gender
                        </span>

                        <strong>
                            {normalizedTrip.passengerGender ||
                                "N/A"}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Passengers
                        </span>

                        <strong>
                            {passengers}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Route
                        </span>

                        <strong>
                            {normalizedTrip.origin}
                            {" → "}
                            {normalizedTrip.destination}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Departure
                        </span>

                        <strong>
                            {formatTime(
                                normalizedTrip.time
                            )}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Vehicle
                        </span>

                        <strong>
                            {normalizedTrip.vehicleType}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Plate Number
                        </span>

                        <strong>
                            {normalizedTrip.plateNumber ||
                                "N/A"}
                        </strong>

                    </div>

                </div>


                {/* FARE */}

                <div className="fare-card">

                    <h2>
                        Fare Summary
                    </h2>


                    <div className="fare-row">

                        <span>
                            Passenger Fare
                        </span>

                        <span>
                            ₱
                            {passengerFare.toFixed(2)}
                        </span>

                    </div>


                    <div className="fare-row">

                        <span>
                            Motorcycle
                        </span>

                        <span>
                            ₱
                            {motorcycleFare.toFixed(2)}
                        </span>

                    </div>


                    <div className="fare-row">

                        <span>
                            PPA Fee
                        </span>

                        <span>
                            ₱
                            {ppaFee.toFixed(2)}
                        </span>

                    </div>


                    <div className="fare-divider" />


                    <div className="total-row">

                        <strong>
                            Total
                        </strong>

                        <strong>
                            ₱
                            {totalFare.toFixed(2)}
                        </strong>

                    </div>

                </div>


                {/* COMPLETE PAYMENT */}

                <button
                    type="button"
                    className="complete-payment-button"
                    onClick={
                        handleCompletedPayment
                    }
                >
                    Complete Test Payment
                </button>


                <p className="bottom-note">

                    This is a simulated GCash
                    payment for demonstration purposes.

                </p>

            </div>


            <style>{`

                * {
                    box-sizing: border-box;
                }


                .gcash-page {

                    min-height: 100vh;

                    background:
                        linear-gradient(
                            180deg,
                            #fff8f2 0%,
                            #f7f8fa 100%
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    padding:
                        30px
                        20px;
                }


                .gcash-container {

                    width: 100%;

                    max-width: 650px;

                    margin: 0 auto;

                    padding:
                        25px
                        25px
                        35px;

                    background:
                        #ffffff;

                    border-radius:
                        24px;

                    box-shadow:
                        0 10px 35px
                        rgba(
                            0,
                            0,
                            0,
                            0.08
                        );
                }


                .gcash-back {

                    border: none;

                    background:
                        transparent;

                    color:
                        #777777;

                    font-size:
                        13px;

                    cursor:
                        pointer;

                    margin-bottom:
                        20px;
                }


                .gcash-back:hover {

                    color:
                        #f28c28;
                }


                .gcash-logo {

                    display:
                        flex;

                    justify-content:
                        center;

                    margin-bottom:
                        15px;
                }


                .gcash-logo img {

                    width:
                        110px;

                    height:
                        auto;

                    max-height:
                        90px;

                    object-fit:
                        contain;
                }


                .gcash-heading {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        15px;

                    margin-bottom:
                        20px;
                }


                .gcash-icon {

                    width:
                        48px;

                    height:
                        48px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        12px;

                    background:
                        #e8f4ff;

                    color:
                        #1685d8;

                    font-size:
                        24px;

                    font-weight:
                        900;
                }


                .gcash-heading h1 {

                    margin:
                        0;

                    color:
                        #111111;

                    font-size:
                        25px;

                    font-weight:
                        800;
                }


                .gcash-heading p {

                    margin:
                        5px
                        0
                        0;

                    color:
                        #777777;

                    font-size:
                        13px;
                }


                .test-notice {

                    padding:
                        15px;

                    margin-bottom:
                        20px;

                    border-radius:
                        12px;

                    background:
                        #fff8ed;

                    border:
                        1px solid
                        #ffe0b7;

                    text-align:
                        center;
                }


                .test-notice strong {

                    color:
                        #e87911;

                    font-size:
                        13px;
                }


                .test-notice p {

                    margin:
                        6px
                        0
                        0;

                    color:
                        #777777;

                    font-size:
                        11px;

                    line-height:
                        1.5;
                }


                .qr-section {

                    text-align:
                        center;

                    padding:
                        15px
                        0
                        25px;
                }


                .qr-code {

                    width:
                        240px;

                    height:
                        240px;

                    display:
                        block;

                    margin:
                        0
                        auto
                        12px;

                    border:
                        8px
                        solid
                        #ffffff;

                    box-shadow:
                        0 5px 20px
                        rgba(
                            0,
                            0,
                            0,
                            0.08
                        );
                }


                .qr-section p {

                    margin:
                        0;

                    color:
                        #888888;

                    font-size:
                        12px;
                }


                .payment-details,
                .fare-card {

                    border:
                        1px
                        solid
                        #eeeeee;

                    border-radius:
                        13px;

                    padding:
                        18px;

                    margin-bottom:
                        16px;
                }


                .payment-details h2,
                .fare-card h2 {

                    margin:
                        0
                        0
                        15px;

                    font-size:
                        17px;

                    color:
                        #222222;
                }


                .detail-row,
                .fare-row {

                    display:
                        flex;

                    justify-content:
                        space-between;

                    gap:
                        15px;

                    padding:
                        9px
                        0;

                    font-size:
                        13px;
                }


                .detail-row span,
                .fare-row span:first-child {

                    color:
                        #777777;
                }


                .detail-row strong {

                    color:
                        #222222;

                    text-align:
                        right;

                    max-width:
                        60%;
                }


                .fare-row span:last-child {

                    color:
                        #222222;

                    font-weight:
                        600;
                }


                .fare-divider {

                    height:
                        1px;

                    background:
                        #dddddd;

                    margin:
                        7px
                        0;
                }


                .total-row {

                    display:
                        flex;

                    justify-content:
                        space-between;

                    padding-top:
                        5px;

                    font-size:
                        17px;

                    color:
                        #222222;
                }


                .complete-payment-button {

                    width:
                        100%;

                    height:
                        54px;

                    border:
                        none;

                    border-radius:
                        11px;

                    background:
                        #f28c28;

                    color:
                        #ffffff;

                    font-size:
                        15px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        0.2s ease;
                }


                .complete-payment-button:hover {

                    transform:
                        translateY(-1px);

                    opacity:
                        0.93;
                }


                .complete-payment-button:active {

                    transform:
                        translateY(0);
                }


                .bottom-note {

                    text-align:
                        center;

                    color:
                        #888888;

                    font-size:
                        11px;

                    margin:
                        15px
                        0
                        0;
                }


                @media (max-width: 600px) {

                    .gcash-page {

                        padding:
                            15px
                            10px;
                    }


                    .gcash-container {

                        padding:
                            22px
                            18px;

                        border-radius:
                            20px;
                    }


                    .gcash-heading h1 {

                        font-size:
                            22px;
                    }


                    .qr-code {

                        width:
                            210px;

                        height:
                            210px;
                    }


                    .detail-row {

                        flex-direction:
                            column;

                        gap:
                            3px;
                    }


                    .detail-row strong {

                        max-width:
                            100%;

                        text-align:
                            left;
                    }

                }

            `}</style>

        </main>
    );
};

export default GCashPayment;