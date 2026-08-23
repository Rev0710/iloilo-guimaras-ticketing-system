import React from "react";
import { useNavigate } from "react-router-dom";

const GCashPayment = () => {
    const navigate = useNavigate();

    // Get saved trip details
    const savedTrip = sessionStorage.getItem("tripDetails");

    const trip = savedTrip
        ? JSON.parse(savedTrip)
        : null;

    // If there is no trip information
    if (!trip) {
        return (
            <main className="gcash-page">
                <div className="gcash-container">
                    <h2>Trip Details Not Found</h2>

                    <p>
                        Please return to the booking page and
                        select your trip again.
                    </p>

                    <button
                        className="gcash-primary-button"
                        onClick={() => navigate("/book-trip")}
                    >
                        Back to Book Trip
                    </button>
                </div>
            </main>
        );
    }

    // Prices
    const passengerFare = trip.passengers * 40;
    const motorcycleFare = 150;
    const ppaFee = 65;

    const totalFare =
        passengerFare +
        motorcycleFare +
        ppaFee;

    // Test booking reference
    let bookingReference =
        sessionStorage.getItem("bookingReference");

    if (!bookingReference) {
        bookingReference =
            "GG-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        sessionStorage.setItem(
            "bookingReference",
            bookingReference
        );
    }

    // QR data
    const qrData = `GUIMARASGO TEST PAYMENT
Reference: ${bookingReference}
Amount: PHP ${totalFare.toFixed(2)}
Passengers: ${trip.passengers}
Vehicle: Motorcycle
Route: ${trip.origin} to ${trip.destination}`;

    // QR image
    const qrCodeUrl =
        `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
            qrData
        )}`;

    // Payment completed
    const handleCompletedPayment = () => {

        sessionStorage.setItem(
            "paymentStatus",
            "TEST PAYMENT COMPLETED"
        );

        sessionStorage.setItem(
            "paymentMethod",
            "GCash"
        );

        navigate("/confirmation");
    };

    return (
        <main className="gcash-page">

            <div className="gcash-container">

                {/* BACK */}
                <button
                    type="button"
                    className="gcash-back"
                    onClick={() => navigate("/payment")}
                >
                    ← Back to Payment Method
                </button>

                {/* LOGO */}
                <div className="gcash-logo">
                    <img
                        src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956"
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
                        No real GCash money will be deducted.
                    </p>
                </div>

                {/* QR */}
                <div className="qr-section">

                    <div className="qr-card">

                        <img
                            src={qrCodeUrl}
                            alt="GCash Test Payment QR Code"
                            className="qr-code"
                        />

                        <p className="scan-text">
                            Scan this QR code
                        </p>

                    </div>

                </div>

                {/* PAYMENT INFORMATION */}
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
                            {trip.passengers}
                            {" "}
                            {trip.passengers === 1
                                ? "Passenger"
                                : "Passengers"}
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span>
                            Vehicle
                        </span>

                        <strong>
                            Motorcycle
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span>
                            Route
                        </span>

                        <strong>
                            {trip.origin}
                            {" → "}
                            {trip.destination}
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span>
                            Date
                        </span>

                        <strong>
                            {trip.date}
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span>
                            Time
                        </span>

                        <strong>
                            {trip.time}
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
                            Passenger Fare ({trip.passengers}x)
                        </span>

                        <span>
                            ₱{passengerFare.toFixed(2)}
                        </span>
                    </div>

                    <div className="fare-row">
                        <span>
                            Motorcycle
                        </span>

                        <span>
                            ₱{motorcycleFare.toFixed(2)}
                        </span>
                    </div>

                    <div className="fare-row">
                        <span>
                            PPA Fee
                        </span>

                        <span>
                            ₱{ppaFee.toFixed(2)}
                        </span>
                    </div>

                    <div className="fare-divider"></div>

                    <div className="total-row">
                        <strong>
                            Total Amount
                        </strong>

                        <strong>
                            ₱{totalFare.toFixed(2)}
                        </strong>
                    </div>

                </div>

                {/* COMPLETE PAYMENT */}
                <button
                    type="button"
                    className="complete-payment-button"
                    onClick={handleCompletedPayment}
                >
                    ✓ I Completed Payment / Book Now
                </button>

                {/* TEST MESSAGE */}
                <p className="bottom-note">
                    🔒 Test payment only • No real money
                    is processed
                </p>

            </div>

            <style>{`

                * {
                    box-sizing: border-box;
                }

                .gcash-page {
                    min-height: 100vh;
                    background: #f5f7fa;
                    padding: 30px 16px;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                }

                .gcash-container {
                    width: 100%;
                    max-width: 520px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 28px;
                    box-shadow:
                        0 12px 35px
                        rgba(0, 0, 0, 0.08);
                }

                /* BACK */

                .gcash-back {
                    border: none;
                    background: transparent;
                    color: #666;
                    font-size: 14px;
                    cursor: pointer;
                    padding: 0;
                    margin-bottom: 20px;
                }

                .gcash-back:hover {
                    color: #f28c28;
                }

                /* LOGO */

                .gcash-logo {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .gcash-logo img {
                    width: 55px;
                    height: 48px;
                    object-fit: contain;
                    display: inline-block;
                }

                /* HEADING */

                .gcash-heading {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 20px;
                }

                .gcash-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: #e8f4ff;
                    color: #1685e5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 25px;
                    font-weight: 800;
                }

                .gcash-heading h1 {
                    margin: 0;
                    color: #171717;
                    font-size: 26px;
                }

                .gcash-heading p {
                    margin: 5px 0 0;
                    color: #777;
                    font-size: 14px;
                }

                /* NOTICE */

                .test-notice {
                    background: #fff8ed;
                    border: 1px solid #ffe0b2;
                    border-radius: 12px;
                    padding: 14px 16px;
                    margin-bottom: 22px;
                }

                .test-notice strong {
                    color: #e57d00;
                    font-size: 13px;
                }

                .test-notice p {
                    margin: 6px 0 0;
                    color: #666;
                    font-size: 12px;
                    line-height: 1.5;
                }

                /* QR */

                .qr-section {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .qr-card {
                    text-align: center;
                }

                .qr-code {
                    width: 220px;
                    height: 220px;
                    display: block;
                    border-radius: 8px;
                }

                .scan-text {
                    margin: 10px 0 0;
                    color: #555;
                    font-size: 13px;
                }

                /* DETAILS */

                .payment-details,
                .fare-card {
                    border: 1px solid #e5e5e5;
                    border-radius: 14px;
                    padding: 18px;
                    margin-bottom: 16px;
                }

                .payment-details h2,
                .fare-card h2 {
                    margin: 0 0 15px;
                    font-size: 17px;
                    color: #222;
                }

                .detail-row,
                .fare-row {
                    display: flex;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 9px 0;
                    font-size: 13px;
                }

                .detail-row span,
                .fare-row span:first-child {
                    color: #777;
                }

                .detail-row strong {
                    color: #222;
                    text-align: right;
                    max-width: 60%;
                }

                .fare-row span:last-child {
                    color: #222;
                    font-weight: 600;
                }

                .fare-divider {
                    height: 1px;
                    background: #ddd;
                    margin: 7px 0;
                }

                .total-row {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 5px;
                    font-size: 17px;
                    color: #222;
                }

                /* BUTTON */

                .complete-payment-button {
                    width: 100%;
                    height: 54px;
                    border: none;
                    border-radius: 11px;
                    background: #f28c28;
                    color: #ffffff;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.2s ease;
                }

                .complete-payment-button:hover {
                    transform: translateY(-1px);
                    opacity: 0.93;
                }

                .complete-payment-button:active {
                    transform: translateY(0);
                }

                /* FOOTER */

                .bottom-note {
                    text-align: center;
                    color: #888;
                    font-size: 11px;
                    margin: 15px 0 0;
                }

                /* MOBILE */

                @media (max-width: 600px) {

                    .gcash-page {
                        padding: 15px 10px;
                    }

                    .gcash-container {
                        padding: 22px 18px;
                        border-radius: 20px;
                    }

                    .gcash-heading h1 {
                        font-size: 22px;
                    }

                    .qr-code {
                        width: 210px;
                        height: 210px;
                    }

                }

            `}</style>

        </main>
    );
};

export default GCashPayment;