import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookTrip = () => {
    const navigate = useNavigate();

    /*
     * Recover previously entered trip information.
     * This prevents the form from restarting when
     * the user goes back from the Payment page.
     */
    const savedTrip =
        sessionStorage.getItem("tripDetails");

    const previousTrip = savedTrip
        ? JSON.parse(savedTrip)
        : {};

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

    const [passengers, setPassengers] = useState(
        previousTrip.passengers || 2
    );

    // Motorcycle is currently the only vehicle type.
    const [vehicleType] = useState(
        previousTrip.vehicleType || "Motorcycle"
    );

    const [plateNumber, setPlateNumber] = useState(
        previousTrip.plateNumber || ""
    );

    // Passenger decrease
    const handlePassengerDecrease = () => {
        if (passengers > 1) {
            setPassengers(
                (previous) => previous - 1
            );
        }
    };

    // Passenger increase
    const handlePassengerIncrease = () => {
        if (passengers < 10) {
            setPassengers(
                (previous) => previous + 1
            );
        }
    };

    // Proceed to payment
    const handleSubmit = (event) => {
        event.preventDefault();

        // Check required trip fields
        if (
            !origin ||
            !destination ||
            !date ||
            !time ||
            !plateNumber
        ) {
            alert(
                "Please complete all trip details."
            );
            return;
        }

        // Prevent same ports
        if (origin === destination) {
            alert(
                "Origin and Destination cannot be the same."
            );
            return;
        }

        // Create complete trip information
        const tripDetails = {
            origin,
            destination,
            date,
            time,
            passengers,
            vehicleType,
            plateNumber,
        };

        console.log(
            "Complete Trip Details:",
            tripDetails
        );

        /*
         * Save trip information.
         *
         * This allows the information to remain
         * available when the user goes back from
         * the Payment page.
         */
        sessionStorage.setItem(
            "tripDetails",
            JSON.stringify(tripDetails)
        );

        /*
         * Navigate to Payment page.
         *
         * The trip information is passed directly
         * to the Payment component.
         */
        navigate("/payment", {
            state: {
                trip: tripDetails,
            },
        });
    };

    // Today's date
    const today = new Date()
        .toISOString()
        .split("T")[0];

    return (
        <main className="book-trip-page">

            <div className="book-trip-container">

                {/* BACK BUTTON */}
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

                {/* LOGO */}
                <div className="book-trip-logo">

                    <img
                        src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956"
                        alt="GuimarasGo Logo"
                    />

                </div>

                {/* TITLE */}
                <div className="book-trip-heading">

                    <h1>
                        Book Your Trip
                    </h1>

                    <p>
                        Choose your trip details
                    </p>

                </div>

                {/* FORM */}
                <form
                    className="trip-form"
                    onSubmit={handleSubmit}
                >

                    {/* ORIGIN */}
                    <div className="form-group">

                        <label htmlFor="origin">
                            Origin Port
                        </label>

                        <select
                            id="origin"
                            value={origin}
                            onChange={(event) => {
                                setOrigin(
                                    event.target.value
                                );

                                // Reset destination
                                // when origin changes
                                setDestination("");
                            }}
                            required
                        >

                            <option value="">
                                Select origin port
                            </option>

                            <option value="Iloilo">
                                Iloilo
                            </option>

                            <option value="Guimaras">
                                Guimaras
                            </option>

                        </select>

                    </div>

                    {/* DESTINATION */}
                    <div className="form-group">

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
                            required
                        >

                            <option value="">
                                Select destination port
                            </option>

                            <option
                                value="Iloilo"
                                disabled={
                                    origin === "Iloilo"
                                }
                            >
                                Iloilo
                            </option>

                            <option
                                value="Guimaras"
                                disabled={
                                    origin === "Guimaras"
                                }
                            >
                                Guimaras
                            </option>

                        </select>

                    </div>

                    {/* DATE AND TIME */}
                    <div className="date-time-row">

                        {/* DATE */}
                        <div className="form-group">

                            <label htmlFor="date">
                                Date
                            </label>

                            <input
                                id="date"
                                type="date"
                                value={date}
                                min={today}
                                onChange={(event) =>
                                    setDate(
                                        event.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        {/* TIME */}
                        <div className="form-group">

                            <label htmlFor="time">
                                Time
                            </label>

                            <select
                                id="time"
                                value={time}
                                onChange={(event) =>
                                    setTime(
                                        event.target.value
                                    )
                                }
                                required
                            >

                                <option value="">
                                    Select time
                                </option>

                                <option value="03:30">
                                    3:30 AM
                                </option>

                                <option value="04:00">
                                    4:00 AM
                                </option>

                                <option value="04:30">
                                    4:30 AM
                                </option>

                                <option value="05:00">
                                    5:00 AM
                                </option>

                                <option value="05:30">
                                    5:30 AM
                                </option>

                                <option value="06:00">
                                    6:00 AM
                                </option>

                                <option value="06:30">
                                    6:30 AM
                                </option>

                                <option value="07:00">
                                    7:00 AM
                                </option>

                                <option value="07:30">
                                    7:30 AM
                                </option>

                                <option value="08:00">
                                    8:00 AM
                                </option>

                                <option value="08:30">
                                    8:30 AM
                                </option>

                                <option value="09:00">
                                    9:00 AM
                                </option>

                                <option value="09:30">
                                    9:30 AM
                                </option>

                                <option value="10:00">
                                    10:00 AM
                                </option>

                                <option value="10:30">
                                    10:30 AM
                                </option>

                                <option value="11:00">
                                    11:00 AM
                                </option>

                                <option value="11:30">
                                    11:30 AM
                                </option>

                                <option value="12:00">
                                    12:00 PM
                                </option>

                                <option value="12:30">
                                    12:30 PM
                                </option>

                                <option value="13:00">
                                    1:00 PM
                                </option>

                                <option value="13:30">
                                    1:30 PM
                                </option>

                                <option value="14:00">
                                    2:00 PM
                                </option>

                                <option value="14:30">
                                    2:30 PM
                                </option>

                                <option value="15:00">
                                    3:00 PM
                                </option>

                                <option value="15:30">
                                    3:30 PM
                                </option>

                                <option value="16:00">
                                    4:00 PM
                                </option>

                                <option value="16:30">
                                    4:30 PM
                                </option>

                                <option value="17:00">
                                    5:00 PM
                                </option>

                                <option value="17:30">
                                    5:30 PM
                                </option>

                                <option value="18:00">
                                    6:00 PM
                                </option>

                                <option value="18:30">
                                    6:30 PM
                                </option>

                                <option value="19:00">
                                    7:00 PM
                                </option>

                                <option value="19:30">
                                    7:30 PM
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* PASSENGERS */}
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
                            >
                                −
                            </button>

                            <span>
                                {passengers}
                            </span>

                            <button
                                type="button"
                                onClick={
                                    handlePassengerIncrease
                                }
                                disabled={
                                    passengers >= 10
                                }
                            >
                                +
                            </button>

                        </div>

                        <small className="passenger-help">
                            Maximum of 10 passengers
                        </small>

                    </div>

                    {/* VEHICLE TYPE */}
                    <div className="form-group">

                        <label htmlFor="vehicleType">
                            Vehicle Type
                        </label>

                        <select
                            id="vehicleType"
                            value={vehicleType}
                            disabled
                        >
                            <option value="Motorcycle">
                                Motorcycle
                            </option>
                        </select>

                        <small className="field-help">
                            Motorcycle is currently the
                            available vehicle type.
                        </small>

                    </div>

                    {/* PLATE NUMBER */}
                    <div className="form-group">

                        <label htmlFor="plateNumber">
                            Plate Number
                        </label>

                        <input
                            id="plateNumber"
                            type="text"
                            placeholder="Enter motorcycle plate number"
                            value={plateNumber}
                            onChange={(event) =>
                                setPlateNumber(
                                    event.target.value
                                        .toUpperCase()
                                )
                            }
                            required
                        />

                    </div>

                    {/* PROCEED TO PAYMENT */}
                    <button
                        type="submit"
                        className="continue-button"
                    >
                        Proceed To Payment
                    </button>

                </form>

            </div>

            {/* PAGE CSS */}
            <style>{`

                * {
                    box-sizing: border-box;
                }

                .book-trip-page {
                    min-height: 100vh;
                    background: #f7f8fa;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                    padding: 30px 20px;
                }

                .book-trip-container {
                    position: relative;
                    width: 100%;
                    max-width: 650px;
                    margin: 0 auto;
                    padding: 45px 45px 50px;
                    background: #ffffff;
                    border-radius: 24px;
                    box-shadow:
                        0 10px 35px
                        rgba(0, 0, 0, 0.08);
                }

                /* BACK BUTTON */

                .back-button {
                    position: absolute;
                    top: 25px;
                    left: 25px;
                    width: 42px;
                    height: 42px;
                    border: none;
                    border-radius: 50%;
                    background: #f5f5f5;
                    color: #333333;
                    font-size: 24px;
                    cursor: pointer;
                    transition: 0.2s ease;
                }

                .back-button:hover {
                    background: #eeeeee;
                    transform: translateX(-2px);
                }

                /* LOGO */

                .book-trip-logo {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 25px;
                }

                .book-trip-logo img {
                    width: 170px;
                    height: auto;
                    object-fit: contain;
                    display: block;
                }

                /* HEADING */

                .book-trip-heading {
                    text-align: center;
                    margin-bottom: 35px;
                }

                .book-trip-heading h1 {
                    margin: 0;
                    color: #222222;
                    font-size: 34px;
                    font-weight: 800;
                }

                .book-trip-heading p {
                    margin: 10px 0 0;
                    color: #777777;
                    font-size: 16px;
                }

                /* FORM */

                .trip-form {
                    width: 100%;
                }

                .form-group {
                    margin-bottom: 22px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: #333333;
                    font-size: 15px;
                    font-weight: 700;
                }

                .form-group input,
                .form-group select {
                    width: 100%;
                    height: 52px;
                    padding: 0 15px;
                    border: 1px solid #dddddd;
                    border-radius: 10px;
                    background: #ffffff;
                    color: #333333;
                    font-size: 15px;
                    outline: none;
                    transition: 0.2s ease;
                }

                .form-group input:focus,
                .form-group select:focus {
                    border-color: #f28c28;
                    box-shadow:
                        0 0 0 3px
                        rgba(242, 140, 40, 0.12);
                }

                /* DISABLED VEHICLE */

                .form-group select:disabled {
                    background: #f5f5f5;
                    color: #555555;
                    cursor: not-allowed;
                    opacity: 1;
                }

                /* DATE AND TIME */

                .date-time-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px;
                }

                /* PASSENGER COUNTER */

                .passenger-counter {
                    width: 100%;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border: 1px solid #dddddd;
                    border-radius: 10px;
                    overflow: hidden;
                    background: #ffffff;
                }

                .passenger-counter button {
                    width: 60px;
                    height: 100%;
                    border: none;
                    background: #f7f7f7;
                    color: #333333;
                    font-size: 25px;
                    cursor: pointer;
                    transition: 0.2s ease;
                }

                .passenger-counter button:hover:not(:disabled) {
                    background: #eeeeee;
                }

                .passenger-counter button:disabled {
                    color: #bbbbbb;
                    cursor: not-allowed;
                }

                .passenger-counter span {
                    flex: 1;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 700;
                    color: #222222;
                }

                .passenger-help,
                .field-help {
                    display: block;
                    margin-top: 7px;
                    color: #888888;
                    font-size: 12px;
                }

                /* PROCEED BUTTON */

                .continue-button {
                    width: 100%;
                    height: 54px;
                    margin-top: 10px;
                    border: none;
                    border-radius: 10px;
                    background: #f28c28;
                    color: #ffffff;
                    font-size: 17px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.2s ease;
                }

                .continue-button:hover {
                    transform: translateY(-2px);
                    opacity: 0.92;
                }

                .continue-button:active {
                    transform: translateY(0);
                }

                /* MOBILE */

                @media (max-width: 600px) {

                    .book-trip-page {
                        padding: 15px;
                    }

                    .book-trip-container {
                        padding: 45px 22px 35px;
                        border-radius: 18px;
                    }

                    .book-trip-heading h1 {
                        font-size: 29px;
                    }

                    .date-time-row {
                        grid-template-columns: 1fr;
                        gap: 0;
                    }

                    .book-trip-logo img {
                        width: 145px;
                    }

                    .back-button {
                        top: 18px;
                        left: 18px;
                    }

                }

            `}</style>

        </main>
    );
};

export default BookTrip;