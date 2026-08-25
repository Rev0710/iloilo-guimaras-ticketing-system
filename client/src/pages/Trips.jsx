import React from "react";
import { useNavigate } from "react-router-dom";

const Trips = () => {
    const navigate = useNavigate();

    // =========================================================
    // AVAILABLE TRIPS
    // =========================================================

    const availableTrips = [
        {
            id: "MV-ISLAND-PRINCESS",
            vesselName: "MV Island Princess",
            departureTime: "6:00 AM",
            passengers: 45,
            passengerCapacity: 50,
            vehicles: 8,
            vehicleCapacity: 10,
        },
        {
            id: "MV-SEA-EXPLORER",
            vesselName: "MV Sea Explorer",
            departureTime: "8:00 AM",
            passengers: 32,
            passengerCapacity: 50,
            vehicles: 5,
            vehicleCapacity: 10,
        },
    ];

    // =========================================================
    // SELECT TRIP
    // =========================================================

    const selectTrip = (trip) => {
        // Save selected vessel/trip
        sessionStorage.setItem(
            "selectedTrip",
            JSON.stringify(trip)
        );

        // Go to booking page
        navigate("/book-trip");
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
                        "Poppins",
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;

                    background: #fffaf7;
                    color: #171717;
                }

                button {
                    font-family: inherit;
                }

                /* =================================================
                   PAGE
                ================================================= */

                .trips-page {
                    min-height: 100vh;
                    min-height: 100dvh;

                    background:
                        linear-gradient(
                            180deg,
                            #fffaf7 0%,
                            #ffffff 45%,
                            #fff8f2 100%
                        );

                    padding: 40px 30px 60px;
                }

                .trips-container {
                    width: 100%;
                    max-width: 1100px;

                    margin: 0 auto;
                }

                /* =================================================
                   HEADER
                ================================================= */

                .trips-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;

                    margin-bottom: 35px;
                }

                .trips-back-button {
                    width: 44px;
                    height: 44px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border: 1px solid #e8e8e8;
                    border-radius: 12px;

                    background: #ffffff;

                    color: #333;
                    font-size: 20px;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .trips-back-button:hover {
                    border-color: #ff7818;
                    color: #ff7818;
                    background: #fff7f1;
                    transform: translateX(-2px);
                }

                .trips-heading h1 {
                    margin: 0;

                    font-size: 28px;
                    font-weight: 700;

                    color: #171717;
                }

                .trips-heading p {
                    margin: 5px 0 0;

                    font-size: 12px;
                    font-weight: 400;

                    color: #858585;
                }

                /* =================================================
                   AVAILABLE TRIPS
                ================================================= */

                .trips-section-title {
                    margin: 0 0 16px;

                    font-size: 15px;
                    font-weight: 600;

                    color: #242424;
                }

                .trips-list {
                    display: grid;

                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));

                    gap: 18px;
                }

                /* =================================================
                   TRIP CARD
                ================================================= */

                .trip-card {
                    position: relative;

                    padding: 22px;

                    background: #ffffff;

                    border: 1px solid #e6e6e6;

                    border-radius: 16px;

                    cursor: pointer;

                    transition:
                        transform 0.2s ease,
                        border-color 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .trip-card:hover {
                    transform: translateY(-3px);

                    border-color: #ffb887;

                    box-shadow:
                        0 12px 30px
                        rgba(255, 120, 24, 0.10);
                }

                /* =================================================
                   CARD HEADER
                ================================================= */

                .trip-card-header {
                    display: flex;

                    align-items: flex-start;

                    justify-content: space-between;

                    gap: 20px;

                    padding-bottom: 18px;

                    border-bottom: 1px solid #eeeeee;
                }

                .vessel-info {
                    display: flex;

                    align-items: center;

                    gap: 13px;
                }

                .vessel-icon {
                    width: 48px;
                    height: 48px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 13px;

                    background: #fff1e7;

                    font-size: 23px;
                }

                .vessel-name {
                    margin: 0;

                    font-size: 16px;
                    font-weight: 600;

                    color: #191919;
                }

                .vessel-route {
                    margin: 4px 0 0;

                    font-size: 10px;

                    color: #999999;
                }

                /* =================================================
                   TIME
                ================================================= */

                .departure-time {
                    padding:
                        9px
                        13px;

                    border-radius: 9px;

                    background: #fff4ec;

                    color: #ff7818;

                    font-size: 13px;
                    font-weight: 700;

                    white-space: nowrap;
                }

                /* =================================================
                   CAPACITY
                ================================================= */

                .trip-capacity {
                    display: grid;

                    grid-template-columns:
                        1fr
                        1fr;

                    gap: 15px;

                    padding-top: 18px;
                }

                .capacity-item {
                    display: flex;

                    align-items: center;

                    gap: 10px;
                }

                .capacity-icon {
                    width: 36px;
                    height: 36px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 10px;

                    background: #f7f7f7;

                    font-size: 17px;
                }

                .capacity-label {
                    display: block;

                    font-size: 10px;

                    color: #999999;
                }

                .capacity-value {
                    display: block;

                    margin-top: 2px;

                    font-size: 12px;
                    font-weight: 600;

                    color: #333333;
                }

                /* =================================================
                   SELECT BUTTON
                ================================================= */

                .select-trip-button {
                    width: 100%;

                    height: 42px;

                    margin-top: 20px;

                    border: none;

                    border-radius: 9px;

                    background: #ff7818;

                    color: #ffffff;

                    font-size: 11px;
                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        background 0.2s ease,
                        transform 0.15s ease;
                }

                .select-trip-button:hover {
                    background: #ed690d;

                    transform: translateY(-1px);
                }

                .select-trip-button:active {
                    transform: translateY(0);
                }

                /* =================================================
                   INFO
                ================================================= */

                .trips-info {
                    margin-top: 22px;

                    padding: 14px 16px;

                    border: 1px solid #ffe0cc;

                    border-radius: 11px;

                    background: #fff9f5;

                    color: #777777;

                    font-size: 10px;

                    line-height: 1.6;
                }

                .trips-info strong {
                    color: #ff7818;
                }

                /* =================================================
                   TABLET
                ================================================= */

                @media (max-width: 800px) {

                    .trips-page {
                        padding:
                            28px
                            20px
                            45px;
                    }

                    .trips-list {
                        grid-template-columns: 1fr;
                    }

                }

                /* =================================================
                   MOBILE
                ================================================= */

                @media (max-width: 480px) {

                    .trips-page {
                        padding:
                            20px
                            15px
                            35px;
                    }

                    .trips-header {
                        margin-bottom: 25px;
                    }

                    .trips-back-button {
                        width: 40px;
                        height: 40px;
                    }

                    .trips-heading h1 {
                        font-size: 23px;
                    }

                    .trips-heading p {
                        font-size: 10px;
                    }

                    .trip-card {
                        padding: 17px;
                    }

                    .trip-card-header {
                        gap: 10px;
                    }

                    .vessel-icon {
                        width: 42px;
                        height: 42px;
                    }

                    .vessel-name {
                        font-size: 14px;
                    }

                    .departure-time {
                        font-size: 11px;
                        padding:
                            8px
                            10px;
                    }

                    .trip-capacity {
                        gap: 10px;
                    }

                }

            `}</style>

            <main className="trips-page">

                <div className="trips-container">

                    {/* HEADER */}

                    <header className="trips-header">

                        <button
                            type="button"
                            className="trips-back-button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            aria-label="Back to dashboard"
                        >
                            ←
                        </button>

                        <div className="trips-heading">

                            <h1>
                                Available Trips
                            </h1>

                            <p>
                                Select a vessel and departure time
                                for your trip.
                            </p>

                        </div>

                    </header>


                    {/* TITLE */}

                    <h2 className="trips-section-title">
                        Available Ferries
                    </h2>


                    {/* TRIPS */}

                    <div className="trips-list">

                        {availableTrips.map((trip) => (

                            <article
                                className="trip-card"
                                key={trip.id}
                                onClick={() =>
                                    selectTrip(trip)
                                }
                            >

                                <div className="trip-card-header">

                                    <div className="vessel-info">

                                        <div className="vessel-icon">
                                            ⛴️
                                        </div>

                                        <div>

                                            <h3 className="vessel-name">
                                                {trip.vesselName}
                                            </h3>

                                            <p className="vessel-route">
                                                Iloilo → Guimaras
                                            </p>

                                        </div>

                                    </div>

                                    <div className="departure-time">
                                        {trip.departureTime}
                                    </div>

                                </div>


                                <div className="trip-capacity">

                                    <div className="capacity-item">

                                        <div className="capacity-icon">
                                            👤
                                        </div>

                                        <div>

                                            <span className="capacity-label">
                                                Passengers
                                            </span>

                                            <span className="capacity-value">
                                                {trip.passengers}/
                                                {trip.passengerCapacity}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="capacity-item">

                                        <div className="capacity-icon">
                                            🚗
                                        </div>

                                        <div>

                                            <span className="capacity-label">
                                                Vehicles
                                            </span>

                                            <span className="capacity-value">
                                                {trip.vehicles}/
                                                {trip.vehicleCapacity}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    className="select-trip-button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        selectTrip(trip);
                                    }}
                                >
                                    Select This Trip
                                </button>

                            </article>

                        ))}

                    </div>


                    <div className="trips-info">
                        <strong>Note:</strong>{" "}
                        Select your preferred vessel first.
                        The selected vessel and departure time
                        will automatically be carried into your
                        booking and receipt.
                    </div>

                </div>

            </main>
        </>
    );
};

export default Trips;