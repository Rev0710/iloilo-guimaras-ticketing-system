import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /*
     * Get trip information from navigation state.
     * If state is unavailable, recover it from sessionStorage.
     */
    const savedTrip =
        sessionStorage.getItem("tripDetails");

    const trip =
        location.state?.trip ||
        (savedTrip ? JSON.parse(savedTrip) : null);

    const [paymentMethod, setPaymentMethod] =
        useState("gcash");

    /*
     * If no trip information exists,
     * return the user to Book Trip.
     */
    if (!trip) {
        return (
            <main className="payment-page">

                <div className="payment-container">

                    <h2>
                        No trip details found.
                    </h2>

                    <button
                        className="continue-button"
                        onClick={() =>
                            navigate("/book-trip")
                        }
                    >
                        Back to Trip Details
                    </button>

                </div>

            </main>
        );
    }

    /*
     * Get the actual passenger count
     * selected on the Trip Details page.
     */
    const passengers = Number(
        trip.passengers || 1
    );

    /*
     * Fare per passenger.
     */
    const passengerRate = 40;

    /*
     * Motorcycle fare.
    /*
 * Motorcycle fare.
 */
const motorcycleFare = 150;

/*
 * PPA / Philippine Ports Authority fee.
 */
const ppaFee = 65;

/*
 * Calculate passenger fare dynamically.
 */
const passengerFare =
    passengers * passengerRate;

/*
 * Calculate total fare.
 */
const totalFare =
    passengerFare + motorcycleFare + ppaFee;

    /*
     * Format date for display.
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
     * Convert 24-hour time into a readable
     * AM/PM format.
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
     * Go back to Trip Details.
     *
     * The information is already stored in
     * sessionStorage, so the form will recover
     * the previous values instead of starting over.
     */
    const handleBackToTripDetails = () => {
        navigate("/book-trip");
    };

    /*
     * Book Now
     */
    const handleBookNow = () => {

        if (!paymentMethod) {
            alert(
                "Please select a payment method."
            );
            return;
        }

        /*
         * For now, this is only a demonstration.
         *
         * Later we will connect this button to
         * the actual GCash / Maya / Card payment
         * gateway and backend booking system.
         */
        alert(
            `Booking confirmed for ${passengers} passenger${
                passengers > 1 ? "s" : ""
            }.\n\nTotal Fare: ₱${totalFare.toFixed(
                2
            )}`
        );
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
                            setPaymentMethod(
                                "gcash"
                            )
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

                        {paymentMethod ===
                            "gcash" && (
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
                            setPaymentMethod(
                                "maya"
                            )
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

                        {paymentMethod ===
                            "maya" && (
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
                            setPaymentMethod(
                                "card"
                            )
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

                        {paymentMethod ===
                            "card" && (
                            <div className="selected-dot">
                                ●
                            </div>
                        )}

                    </button>

                </div>

                {/* SECURE PAYMENT NOTICE */}
                <div className="secure-payment">

                    <div className="secure-icon">
                        🔒
                    </div>

                    <div>

                        <strong>
                            Secure Payment
                        </strong>

                        <p>
                            You will be redirected to{" "}
                            {paymentMethod ===
                            "gcash"
                                ? "GCash"
                                : paymentMethod ===
                                  "maya"
                                ? "Maya"
                                : "your card provider"}{" "}
                            to complete your payment
                            securely.
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
                            {formatTime(
                                trip.time
                            )}
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
                            {passengerFare.toFixed(
                                2
                            )}
                        </span>

                    </div>

                    {/* MOTORCYCLE */}
<div className="fare-row">

    <span>
        Motorcycle
    </span>

    <span>
        ₱
        {motorcycleFare.toFixed(
            2
        )}
    </span>

</div>

{/* PPA FEE */}
<div className="fare-row">

    <span>
        PPA Fee
    </span>

    <span>
        ₱
        {ppaFee.toFixed(
            2
        )}
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
                            {totalFare.toFixed(
                                2
                            )}
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

                {/* BACK */}
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
                    padding: 0 0 35px;
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
    margin-bottom: 20px;
}

.payment-logo img {
    width: 110px;
    height: auto;
    max-height: 90px;
    object-fit: contain;
    display: block;
}
                .logo-orange {
                    color: #f28c28;
                }

                .logo-green {
                    color: #2bb673;
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
                    margin-top: 10px;
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
                }

                .gcash-icon {
                    background: #e8f4ff;
                    color: #1685d8;
                }

                .maya-icon {
                    background: #e9f8ef;
                    color: #16a05a;
                }

                .card-icon {
                    background: #eeeeee;
                    font-size: 18px;
                }

                .payment-info {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    flex: 1;
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
                    margin: 22px 34px 12px;
                    padding: 18px;
                    display: flex;
                    gap: 14px;
                    background: #f5f8fb;
                    border-radius: 14px;
                }

                .secure-icon {
                    font-size: 18px;
                }

                .secure-payment strong {
                    color: #111111;
                    font-size: 14px;
                }

                .secure-payment p {
                    margin: 8px 0 0;
                    color: #666666;
                    font-size: 12px;
                    line-height: 1.6;
                }

                .secure-text {
                    margin: 15px 34px 25px;
                    text-align: center;
                    color: #777777;
                    font-size: 11px;
                }

                /* TRIP SUMMARY */

                .trip-summary {
                    margin: 0 34px 25px;
                    padding: 18px;
                    background: #fafafa;
                    border-radius: 12px;
                }

                .trip-summary h2 {
                    margin: 0 0 15px;
                    font-size: 17px;
                    color: #111111;
                }

                .trip-row {
                    display: flex;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 7px 0;
                    font-size: 13px;
                }

                .trip-row span {
                    color: #777777;
                }

                .trip-row strong {
                    color: #222222;
                    text-align: right;
                }

                /* FARE */

                .fare-section {
                    margin: 0 34px;
                }

                .fare-section h2 {
                    margin: 0 0 22px;
                    font-size: 17px;
                    color: #111111;
                }

                .fare-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 9px 0;
                    color: #555555;
                    font-size: 14px;
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
                    padding: 10px 0 18px;
                    color: #111111;
                    font-size: 16px;
                }

                /* BOOK NOW */

                .book-now-button {
                    width: calc(100% - 68px);
                    height: 54px;
                    margin: 0 34px;
                    border: none;
                    border-radius: 11px;
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
                    margin: 20px auto 0;
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

                }

            `}</style>

        </main>
    );
};

export default Payment;