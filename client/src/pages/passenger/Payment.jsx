import React,{ useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /*
     * GET TRIP DETAILS
     *
     * First get data from navigation state.
     * If unavailable, recover it from sessionStorage.
     */
    const savedTrip = sessionStorage.getItem("tripDetails");

    const trip =
        location.state?.trip ||
        (savedTrip ? JSON.parse(savedTrip) : null);

    /*
     * Default payment method
     */
    const [paymentMethod, setPaymentMethod] =
        useState("gcash");

    /*
     * If trip information is missing
     */
    if (!trip) {
        return (
            <main className="payment-page">

                <div className="payment-container">

                    <h2>
                        No trip details found.
                    </h2>

                    <button
                        type="button"
                        className="back-trip-button"
                        onClick={() =>
                            navigate("/book-trip")
                        }
                    >
                        ← Back to Trip Details
                    </button>

                </div>

            </main>
        );
    }

    /*
     * PASSENGERS
     *
     * This comes directly from the Trip Details page.
     */
    const passengers = Number(
        trip.passengers || 1
    );

    /*
     * FARES
     */
    const passengerRate = 40;
    const motorcycleFare = 150;
    const ppaFee = 65;

    /*
     * Passenger fare changes automatically
     * depending on passenger count.
     */
    const passengerFare =
        passengers * passengerRate;

    /*
     * TOTAL FARE
     */
    const totalFare =
        passengerFare +
        motorcycleFare +
        ppaFee;

    /*
     * FORMAT DATE
     */
    const formattedDate = trip.date
        ? new Date(
            `${trip.date}T00:00:00`
        ).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        )
        : "";

    /*
     * FORMAT TIME
     */
    const formatTime = (time) => {

        if (!time) {
            return "";
        }

        const [hours, minutes] =
            time.split(":");

        const hour = Number(hours);

        const suffix =
            hour >= 12 ? "PM" : "AM";

        const displayHour =
            hour % 12 || 12;

        return `${displayHour}:${minutes} ${suffix}`;
    };

    /*
     * BACK TO TRIP DETAILS
     *
     * The existing trip information is preserved.
     */
    const handleBackToTripDetails = () => {

        navigate("/book-trip", {
            state: {
                trip: trip,
            },
        });
    };

    /*
     * BOOK NOW
     *
     * Payment page stops here.
     * The Confirmation page handles the next step.
     */
    const handleBookNow = () => {

        if (!paymentMethod) {
            alert(
                "Please select a payment method."
            );
            return;
        }

        /*
         * For the current student demonstration,
         * GCash is the available payment method.
         */
        if (paymentMethod !== "gcash") {

            alert(
                "For the current student demo, please select GCash."
            );

            return;
        }

        /*
         * Create payment information.
         */
        const paymentDetails = {
            paymentMethod,
            amount: totalFare,
            currency: "PHP",
            status: "PENDING",
        };

        /*
         * Save payment details temporarily.
         */
        sessionStorage.setItem(
            "paymentDetails",
            JSON.stringify(paymentDetails)
        );

        /*
         * Save the latest trip information too.
         */
        sessionStorage.setItem(
            "tripDetails",
            JSON.stringify(trip)
        );

        /*
         * Go to the SEPARATE confirmation page.
         */
        navigate("/gcash-payment",{
            state: {
                trip: trip,
                payment: paymentDetails,
                totalFare: totalFare,
            },
        });
    };

    return (
        <main className="payment-page">

            <div className="payment-container">

                {/* LOGO */}
                <div className="payment-logo">

                    <img
                        src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956"
                        alt="GuimarasGo Logo"
                    />

                </div>

                {/* HEADING */}
                <div className="payment-heading">

                    <h1>
                        Payment Method
                    </h1>

                    <p>
                        Choose your preferred payment
                        method
                    </p>

                </div>

                {/* PAYMENT METHODS */}
                <div className="payment-methods">

                    {/* GCASH */}
                    <button
                        type="button"
                        className={`payment-option ${
                            paymentMethod === "gcash"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() =>
                            setPaymentMethod("gcash")
                        }
                    >

                        <div className="payment-icon gcash-icon">
                            G
                        </div>

                        <div className="payment-info">

                            <strong>
                                GCash
                            </strong>

                            <span>
                                E-wallet payment
                            </span>

                        </div>

                        {paymentMethod === "gcash" && (
                            <div className="selected-dot">
                                ●
                            </div>
                        )}

                    </button>

                    {/* MAYA */}
                    <button
                        type="button"
                        className={`payment-option ${
                            paymentMethod === "maya"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() =>
                            setPaymentMethod("maya")
                        }
                    >

                        <div className="payment-icon maya-icon">
                            M
                        </div>

                        <div className="payment-info">

                            <strong>
                                Maya
                            </strong>

                            <span>
                                E-wallet payment
                            </span>

                        </div>

                        {paymentMethod === "maya" && (
                            <div className="selected-dot">
                                ●
                            </div>
                        )}

                    </button>

                    {/* CARD */}
                    <button
                        type="button"
                        className={`payment-option ${
                            paymentMethod === "card"
                                ? "selected"
                                : ""
                        }`}
                        onClick={() =>
                            setPaymentMethod("card")
                        }
                    >

                        <div className="payment-icon card-icon">
                            💳
                        </div>

                        <div className="payment-info">

                            <strong>
                                Debit/Credit Card
                            </strong>

                            <span>
                                Visa, Mastercard, etc.
                            </span>

                        </div>

                        {paymentMethod === "card" && (
                            <div className="selected-dot">
                                ●
                            </div>
                        )}

                    </button>

                </div>

                {/* SECURE PAYMENT */}
                <div className="secure-payment">

                    <div className="secure-icon">
                        🔒
                    </div>

                    <div>

                        <strong>
                            Secure Payment
                        </strong>

                        <p>
                            {paymentMethod === "gcash"
                                ? "You will continue to the GCash testing payment."
                                : paymentMethod === "maya"
                                ? "Maya payment will be available in a future integration."
                                : "Card payment will be available in a future integration."
                            }
                        </p>

                    </div>

                </div>

                <div className="secure-text">
                    🔐 Secure Payment powered by
                    encrypted technology
                </div>

                {/* TRIP SUMMARY */}
                <div className="trip-summary">

                    <h2>
                        Trip Details
                    </h2>

                    <div className="trip-row">

                        <span>
                            Route
                        </span>

                        <strong>
                            {trip.origin} →{" "}
                            {trip.destination}
                        </strong>

                    </div>

                    <div className="trip-row">

                        <span>
                            Date
                        </span>

                        <strong>
                            {formattedDate}
                        </strong>

                    </div>

                    <div className="trip-row">

                        <span>
                            Time
                        </span>

                        <strong>
                            {formatTime(trip.time)}
                        </strong>

                    </div>

                    <div className="trip-row">

                        <span>
                            Passengers
                        </span>

                        <strong>
                            {passengers}
                        </strong>

                    </div>

                    <div className="trip-row">

                        <span>
                            Vehicle
                        </span>

                        <strong>
                            {trip.vehicleType ||
                                "Motorcycle"}
                        </strong>

                    </div>

                    <div className="trip-row">

                        <span>
                            Plate Number
                        </span>

                        <strong>
                            {trip.plateNumber ||
                                "N/A"}
                        </strong>

                    </div>

                </div>

                {/* FARE ESTIMATION */}
                <div className="fare-section">

                    <h2>
                        Fare Estimation
                    </h2>

                    {/* PASSENGER */}
                    <div className="fare-row">

                        <span>
                            Passenger ({passengers}x)
                        </span>

                        <span>
                            ₱
                            {passengerFare.toFixed(2)}
                        </span>

                    </div>

                    {/* MOTORCYCLE */}
                    <div className="fare-row">

                        <span>
                            Motorcycle
                        </span>

                        <span>
                            ₱
                            {motorcycleFare.toFixed(2)}
                        </span>

                    </div>

                    {/* PPA */}
                    <div className="fare-row">

                        <span>
                            PPA Fee
                        </span>

                        <span>
                            ₱
                            {ppaFee.toFixed(2)}
                        </span>

                    </div>

                    <div className="fare-divider"></div>

                    {/* TOTAL */}
                    <div className="fare-total">

                        <strong>
                            Total Fare
                        </strong>

                        <strong>
                            ₱
                            {totalFare.toFixed(2)}
                        </strong>

                    </div>

                </div>

                {/* BOOK NOW */}
                <button
                    type="button"
                    className="book-now-button"
                    onClick={handleBookNow}
                >
                    Book NOW
                </button>

                {/* BACK TO TRIP */}
                <button
                    type="button"
                    className="back-trip-button"
                    onClick={
                        handleBackToTripDetails
                    }
                >
                    ← Back to Trip Details
                </button>

            </div>

            {/* CSS */}
            <style>{`

                * {
                    box-sizing: border-box;
                }

                .payment-page {
                    min-height: 100vh;
                    background: #f7f8fa;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    padding: 30px 20px;
                }

                .payment-container {
                    width: 100%;
                    max-width: 650px;
                    margin: 0 auto;
                    padding: 25px 0 35px;
                    background: #ffffff;
                    border-radius: 24px;
                    box-shadow:
                        0 10px 35px
                        rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                }

                /* LOGO */

                .payment-logo {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 18px;
                }

                .payment-logo img {
                    width: 70px;
                    height: 55px;
                    object-fit: contain;
                    display: block;
                }

                /* HEADING */

                .payment-heading {
                    text-align: center;
                    padding: 0 30px;
                    margin-bottom: 28px;
                }

                .payment-heading h1 {
                    margin: 0;
                    color: #111111;
                    font-size: 28px;
                    font-weight: 800;
                }

                .payment-heading p {
                    margin: 10px 0 0;
                    color: #777777;
                    font-size: 15px;
                }

                /* PAYMENT METHODS */

                .payment-methods {
                    padding: 0 34px;
                }

                .payment-option {
                    width: 100%;
                    min-height: 74px;
                    margin-bottom: 12px;
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    text-align: left;
                    border: 1px solid #dddddd;
                    border-radius: 14px;
                    background: #ffffff;
                    cursor: pointer;
                    transition: 0.2s ease;
                }

                .payment-option:hover {
                    border-color: #f28c28;
                }

                .payment-option.selected {
                    border-color: #f28c28;
                    background: #fffaf5;
                }

                .payment-icon {
                    width: 42px;
                    height: 42px;
                    margin-right: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    font-size: 20px;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                .gcash-icon {
                    background: #e9f4ff;
                    color: #087ee8;
                }

                .maya-icon {
                    background: #eaf8ef;
                    color: #16a34a;
                }

                .card-icon {
                    background: #f0f0f0;
                    color: #2185c5;
                    font-size: 18px;
                }

                .payment-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .payment-info strong {
                    color: #111111;
                    font-size: 15px;
                }

                .payment-info span {
                    color: #777777;
                    font-size: 12px;
                }

                .selected-dot {
                    color: #000000;
                    font-size: 14px;
                }

                /* SECURE PAYMENT */

                .secure-payment {
                    margin: 22px 34px 0;
                    padding: 18px;
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    background: #f5f7fa;
                    border-radius: 14px;
                }

                .secure-icon {
                    font-size: 18px;
                }

                .secure-payment strong {
                    display: block;
                    color: #111111;
                    font-size: 14px;
                    margin-bottom: 6px;
                }

                .secure-payment p {
                    margin: 0;
                    color: #666666;
                    font-size: 12px;
                    line-height: 1.5;
                }

                .secure-text {
                    margin: 18px 34px 0;
                    text-align: center;
                    color: #777777;
                    font-size: 11px;
                }

                /* TRIP SUMMARY */

                .trip-summary {
                    margin: 28px 34px 0;
                    padding: 20px;
                    border: 1px solid #eeeeee;
                    border-radius: 14px;
                    background: #ffffff;
                }

                .trip-summary h2 {
                    margin: 0 0 18px;
                    color: #111111;
                    font-size: 18px;
                }

                .trip-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    padding: 10px 0;
                    border-bottom: 1px solid #f0f0f0;
                }

                .trip-row:last-child {
                    border-bottom: none;
                }

                .trip-row span {
                    color: #777777;
                    font-size: 13px;
                }

                .trip-row strong {
                    color: #222222;
                    font-size: 13px;
                    text-align: right;
                }

                /* FARE */

                .fare-section {
                    margin: 24px 34px 0;
                }

                .fare-section h2 {
                    margin: 0 0 16px;
                    color: #111111;
                    font-size: 18px;
                }

                .fare-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 9px 0;
                    color: #555555;
                    font-size: 14px;
                }

                .fare-row span:last-child {
                    color: #333333;
                }

                .fare-divider {
                    width: 100%;
                    height: 1px;
                    margin: 10px 0;
                    background: #dddddd;
                }

                .fare-total {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 8px;
                    color: #111111;
                    font-size: 16px;
                }

                /* BOOK NOW */

                .book-now-button {
                    width: calc(100% - 68px);
                    height: 54px;
                    margin: 26px 34px 0;
                    border: none;
                    border-radius: 10px;
                    background: #333333;
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.2s ease;
                }

                .book-now-button:hover {
                    background: #222222;
                    transform: translateY(-1px);
                }

                /* BACK */

                .back-trip-button {
                    display: block;
                    margin: 18px auto 0;
                    padding: 5px 10px;
                    border: none;
                    background: transparent;
                    color: #777777;
                    font-size: 13px;
                    cursor: pointer;
                }

                .back-trip-button:hover {
                    color: #f28c28;
                }

                /* MOBILE */

                @media (max-width: 600px) {

                    .payment-page {
                        padding: 15px;
                    }

                    .payment-container {
                        border-radius: 18px;
                        padding-bottom: 30px;
                    }

                    .payment-methods {
                        padding: 0 20px;
                    }

                    .secure-payment {
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .secure-text {
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .trip-summary {
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .fare-section {
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .book-now-button {
                        width: calc(100% - 40px);
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .payment-heading h1 {
                        font-size: 25px;
                    }

                    .trip-row {
                        align-items: flex-start;
                    }

                    .trip-row strong {
                        max-width: 55%;
                    }

                }

            `}</style>

        </main>
    );
};

export default Payment;