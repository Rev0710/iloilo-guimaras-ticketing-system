import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

import api from "../../services/api";

import {
    getBookingReferenceFromQR,
    isValidQR
} from "../../utils/qrUtils";


// =========================================================
// STAFF SCANNER
// =========================================================

function StaffScanner() {

    const navigate = useNavigate();

    // =====================================================
    // REFERENCES
    // =====================================================

    const scannerRef = useRef(null);

    const scannerRunningRef =
        useRef(false);

    const processingQRRef =
        useRef(false);


    // =====================================================
    // STATE
    // =====================================================

    const [scanning, setScanning] =
        useState(false);

    const [booking, setBooking] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [loadingBooking, setLoadingBooking] =
        useState(false);


    // =========================================================
    // START SCANNER
    // =========================================================

    const startScanner = async () => {

        // Prevent multiple scanner instances
        if (scannerRunningRef.current) {
            return;
        }

        setError("");
        setMessage("");

        try {

            // ---------------------------------------------
            // Create scanner
            // ---------------------------------------------

            const scanner =
                new Html5Qrcode(
                    "staff-qr-reader"
                );

            scannerRef.current =
                scanner;


            // ---------------------------------------------
            // Start camera
            // ---------------------------------------------

            await scanner.start(

                {
                    facingMode: "environment"
                },

                {
                    fps: 10,

                    qrbox: {
                        width: 250,
                        height: 250
                    },

                    aspectRatio: 1.0
                },

                async (decodedText) => {

                    // Prevent multiple QR callbacks
                    // from sending multiple requests.
                    if (processingQRRef.current) {
                        return;
                    }

                    processingQRRef.current =
                        true;

                    await handleQRCode(
                        decodedText
                    );

                },

                () => {
                    // Normal QR scanning failures
                    // are ignored.
                }

            );


            scannerRunningRef.current =
                true;

            setScanning(true);

        } catch (err) {

            console.error(
                "Unable to start QR scanner:",
                err
            );

            scannerRunningRef.current =
                false;

            scannerRef.current =
                null;

            setScanning(false);

            setError(
                "Unable to access the camera. Please allow camera permission and try again."
            );

            processingQRRef.current =
                false;
        }
    };


    // =========================================================
    // STOP SCANNER
    // =========================================================

    const stopScanner = async () => {

        const scanner =
            scannerRef.current;


        try {

            if (
                scanner &&
                scannerRunningRef.current
            ) {

                await scanner.stop();

                try {

                    await scanner.clear();

                } catch (clearError) {

                    console.warn(
                        "Scanner clear warning:",
                        clearError
                    );

                }

            }

        } catch (err) {

            console.error(
                "Scanner stop error:",
                err
            );

        } finally {

            scannerRunningRef.current =
                false;

            scannerRef.current =
                null;

            setScanning(false);
        }
    };


    // =========================================================
    // HANDLE QR CODE
    // =========================================================

    const handleQRCode = async (qrText) => {

        setError("");
        setMessage("");


        // =====================================================
        // VALIDATE QR
        // =====================================================

        if (!isValidQR(qrText)) {

            setError(
                "Invalid ferry ticket QR code."
            );

            processingQRRef.current =
                false;

            return;
        }


        // =====================================================
        // GET BOOKING REFERENCE
        // =====================================================

        const bookingReference =
            getBookingReferenceFromQR(
                qrText
            );


        if (!bookingReference) {

            setError(
                "Unable to read the booking reference from the QR code."
            );

            processingQRRef.current =
                false;

            return;
        }


        // =====================================================
        // STOP CAMERA
        // =====================================================

        await stopScanner();


        // =====================================================
        // GET BOOKING
        // =========================================================
        //
        // Backend route:
        //
        // GET /api/staff/bookings/reference/:bookingReference
        //
        // IMPORTANT:
        // "bookings" is plural.
        //
        // =========================================================

        try {

            setLoadingBooking(true);


            const response =
                await api.get(
                    `/staff/bookings/reference/${encodeURIComponent(
                        bookingReference
                    )}`
                );


            // =================================================
            // VALIDATE RESPONSE
            // =================================================

            if (
                !response.data ||
                !response.data.booking
            ) {

                setError(
                    "Booking information could not be retrieved."
                );

                return;
            }


            // =================================================
            // STORE BOOKING
            // =================================================

            setBooking(
                response.data.booking
            );


            setMessage(
                "Ticket scanned successfully."
            );

        } catch (err) {

            console.error(
                "Booking lookup error:",
                err
            );


            // ===============================================
            // NOT FOUND
            // ===============================================

            if (
                err.response?.status === 404
            ) {

                setError(
                    "Booking not found. Please check the QR code."
                );

            }

            // ===============================================
            // UNAUTHORIZED
            // ===============================================

            else if (
                err.response?.status === 401
            ) {

                setError(
                    "Your staff session has expired. Please log in again."
                );

            }

            // ===============================================
            // OTHER ERROR
            // ===============================================

            else {

                setError(
                    err.response?.data?.message ||
                    "Unable to retrieve booking information."
                );
            }

        } finally {

            setLoadingBooking(false);

            processingQRRef.current =
                false;
        }
    };


    // =========================================================
    // SCAN ANOTHER TICKET
    // =========================================================

    const scanAnother = async () => {

        setBooking(null);

        setMessage("");

        setError("");

        processingQRRef.current =
            false;

        await startScanner();
    };


    // =========================================================
    // MARK PASSENGER AS BOARDED
    // =========================================================

    const markAsBoarded = async () => {

        if (!booking?._id) {

            setError(
                "Booking information is missing."
            );

            return;
        }


        try {

            setLoadingBooking(true);

            setError("");

            setMessage("");


            // =================================================
            // BACKEND ROUTE
            // =================================================
            //
            // PUT /api/staff/bookings/:id/board
            //
            // IMPORTANT:
            // "bookings" is plural.
            //
            // =================================================

            const response =
                await api.put(
                    `/staff/bookings/${booking._id}/board`
                );


            // =================================================
            // UPDATE BOOKING
            // =================================================

            if (
                response.data?.booking
            ) {

                setBooking(
                    response.data.booking
                );
            }


            // =================================================
            // SUCCESS MESSAGE
            // =================================================

            setMessage(
                response.data?.message ||
                "Passenger marked as boarded successfully."
            );

        } catch (err) {

            console.error(
                "Boarding error:",
                err
            );


            // ===============================================
            // ERROR MESSAGE
            // ===============================================

            setError(
                err.response?.data?.message ||
                "Unable to update boarding status."
            );

        } finally {

            setLoadingBooking(false);
        }
    };


    // =========================================================
    // CLEANUP CAMERA
    // =========================================================

    useEffect(() => {

        return () => {

            const scanner =
                scannerRef.current;


            if (
                scanner &&
                scannerRunningRef.current
            ) {

                scanner
                    .stop()
                    .then(() => {

                        try {

                            scanner.clear();

                        } catch (error) {

                            console.warn(
                                "Scanner cleanup warning:",
                                error
                            );

                        }

                    })
                    .catch(() => {});

            }

        };

    }, []);


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = async () => {

        await stopScanner();


        localStorage.removeItem(
            "staffToken"
        );

        localStorage.removeItem(
            "staff"
        );


        // Your App.jsx uses:
        //
        // /staff/login
        //
        navigate("/staff/login");
    };


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f5f7fb",
                padding: "25px",
                boxSizing: "border-box"
            }}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto 25px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap"
                }}
            >

                <div>

                    <h1
                        style={{
                            margin: 0,
                            color: "#111827",
                            fontSize: "28px"
                        }}
                    >
                        Staff QR Scanner
                    </h1>


                    <p
                        style={{
                            marginTop: "6px",
                            marginBottom: 0,
                            color: "#6b7280"
                        }}
                    >
                        Scan a passenger ferry ticket
                    </p>

                </div>


                {/* LOGOUT */}

                <button
                    onClick={handleLogout}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#dc2626",
                        color: "#ffffff",
                        fontWeight: "600",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>

            </div>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div
                className="staff-scanner-grid"
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns:
                        "minmax(300px, 1fr) minmax(300px, 1fr)",
                    gap: "25px"
                }}
            >


                {/* =================================================
                    SCANNER CARD
                ================================================= */}

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "25px",
                        boxShadow:
                            "0 5px 20px rgba(0,0,0,0.08)"
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0,
                            color: "#1f2937"
                        }}
                    >
                        Scan Ticket
                    </h2>


                    <p
                        style={{
                            color: "#6b7280",
                            fontSize: "14px",
                            lineHeight: "1.6"
                        }}
                    >
                        Ask the passenger to present
                        their QR ticket to the scanner.
                    </p>


                    {/* =================================================
                        QR CAMERA
                    ================================================= */}

                    <div
                        id="staff-qr-reader"
                        style={{
                            width: "100%",
                            minHeight: "300px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            marginTop: "20px"
                        }}
                    />


                    {/* =================================================
                        START CAMERA
                    ================================================= */}

                    {!scanning && !booking && (

                        <button
                            onClick={startScanner}
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                padding: "13px",
                                border: "none",
                                borderRadius: "8px",
                                background: "#2563eb",
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            Start Camera
                        </button>

                    )}


                    {/* =================================================
                        STOP CAMERA
                    ================================================= */}

                    {scanning && (

                        <button
                            onClick={stopScanner}
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                padding: "13px",
                                border: "none",
                                borderRadius: "8px",
                                background: "#6b7280",
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            Stop Camera
                        </button>

                    )}

                </div>


                {/* =================================================
                    BOOKING INFORMATION CARD
                ================================================= */}

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "25px",
                        boxShadow:
                            "0 5px 20px rgba(0,0,0,0.08)"
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0,
                            color: "#1f2937"
                        }}
                    >
                        Ticket Information
                    </h2>


                    {/* =================================================
                        SUCCESS MESSAGE
                    ================================================= */}

                    {message && (

                        <div
                            style={{
                                background: "#dcfce7",
                                color: "#166534",
                                padding: "12px",
                                borderRadius: "8px",
                                marginBottom: "15px",
                                fontSize: "14px"
                            }}
                        >
                            ✓ {message}
                        </div>

                    )}


                    {/* =================================================
                        ERROR MESSAGE
                    ================================================= */}

                    {error && (

                        <div
                            style={{
                                background: "#fee2e2",
                                color: "#b91c1c",
                                padding: "12px",
                                borderRadius: "8px",
                                marginBottom: "15px",
                                fontSize: "14px"
                            }}
                        >
                            {error}
                        </div>

                    )}


                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loadingBooking && (

                        <div
                            style={{
                                background: "#eff6ff",
                                color: "#1d4ed8",
                                padding: "12px",
                                borderRadius: "8px",
                                marginBottom: "15px",
                                fontSize: "14px"
                            }}
                        >
                            Processing ticket...
                        </div>

                    )}


                    {/* =================================================
                        NO BOOKING
                    ================================================= */}

                    {!booking &&
                        !loadingBooking && (

                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "50px 20px",
                                    color: "#9ca3af"
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "45px",
                                        marginBottom: "10px"
                                    }}
                                >
                                    📱
                                </div>


                                <p>
                                    Scan a QR ticket to
                                    view booking information.
                                </p>

                            </div>

                        )}


                    {/* =================================================
                        BOOKING DETAILS
                    ================================================= */}

                    {booking && (

                        <div>

                            {/* =================================================
                                BOOKING REFERENCE
                            ================================================= */}

                            <div
                                style={{
                                    background: "#eff6ff",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    marginBottom: "18px"
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        marginBottom: "4px"
                                    }}
                                >
                                    BOOKING REFERENCE
                                </div>


                                <strong
                                    style={{
                                        fontSize: "20px",
                                        color: "#1d4ed8"
                                    }}
                                >
                                    {booking.bookingReference}
                                </strong>

                            </div>


                            {/* =================================================
                                PASSENGER
                            ================================================= */}

                            <InfoRow
                                label="Passenger"
                                value={
                                    booking.passengerName
                                }
                            />


                            <InfoRow
                                label="Age"
                                value={
                                    booking.passengerAge
                                }
                            />


                            <InfoRow
                                label="Gender"
                                value={
                                    booking.passengerGender
                                }
                            />


                            <InfoRow
                                label="Passengers"
                                value={
                                    booking.passengers
                                }
                            />


                            {/* =================================================
                                ROUTE
                            ================================================= */}

                            <div
                                style={{
                                    marginTop: "20px",
                                    marginBottom: "20px",
                                    padding: "15px",
                                    background: "#f9fafb",
                                    borderRadius: "10px"
                                }}
                            >

                                <InfoRow
                                    label="Origin"
                                    value={
                                        booking.origin
                                    }
                                />


                                <InfoRow
                                    label="Destination"
                                    value={
                                        booking.destination
                                    }
                                />


                                <InfoRow
                                    label="Date"
                                    value={
                                        booking.date
                                    }
                                />


                                <InfoRow
                                    label="Time"
                                    value={
                                        booking.time
                                    }
                                />

                            </div>


                            {/* =================================================
                                VEHICLE
                            ================================================= */}

                            <InfoRow
                                label="Vehicle"
                                value={
                                    booking.vehicleType
                                }
                            />


                            <InfoRow
                                label="Plate Number"
                                value={
                                    booking.plateNumber ||
                                    "N/A"
                                }
                            />


                            {/* =================================================
                                PAYMENT
                            ================================================= */}

                            <InfoRow
                                label="Payment"
                                value={
                                    booking.paymentStatus
                                }
                            />


                            {/* =================================================
                                BOOKING STATUS
                            ================================================= */}

                            <div
                                style={{
                                    marginTop: "15px"
                                }}
                            >

                                <InfoRow
                                    label="Booking Status"
                                    value={
                                        booking.status
                                    }
                                />


                                <InfoRow
                                    label="Boarding Status"
                                    value={
                                        booking.boardingStatus
                                    }
                                />

                            </div>


                            {/* =================================================
                                ACTIONS
                            ================================================= */}

                            <div
                                style={{
                                    marginTop: "25px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px"
                                }}
                            >

                                {/* =================================================
                                    CAN BOARD
                                ================================================= */}

                                {booking.paymentStatus ===
                                    "VERIFIED" &&

                                    booking.status ===
                                    "CONFIRMED" &&

                                    booking.boardingStatus ===
                                    "NOT BOARDED" && (

                                        <button
                                            onClick={
                                                markAsBoarded
                                            }
                                            disabled={
                                                loadingBooking
                                            }
                                            style={{
                                                padding: "13px",
                                                border: "none",
                                                borderRadius: "8px",
                                                background:
                                                    loadingBooking
                                                        ? "#86efac"
                                                        : "#16a34a",
                                                color:
                                                    "#ffffff",
                                                fontWeight: "600",
                                                cursor:
                                                    loadingBooking
                                                        ? "not-allowed"
                                                        : "pointer"
                                            }}
                                        >
                                            {loadingBooking
                                                ? "Processing..."
                                                : "✓ Mark as Boarded"}
                                        </button>

                                    )}


                                {/* =================================================
                                    PAYMENT NOT VERIFIED
                                ================================================= */}

                                {booking.paymentStatus !==
                                    "VERIFIED" && (

                                        <div
                                            style={{
                                                background:
                                                    "#fff7ed",
                                                color:
                                                    "#c2410c",
                                                padding:
                                                    "12px",
                                                borderRadius:
                                                    "8px",
                                                fontSize:
                                                    "14px",
                                                lineHeight:
                                                    "1.5"
                                            }}
                                        >
                                            ⚠ Payment has not
                                            been verified.
                                            Passenger should
                                            not board yet.
                                        </div>

                                    )}


                                {/* =================================================
                                    BOOKING NOT CONFIRMED
                                ================================================= */}

                                {booking.paymentStatus ===
                                    "VERIFIED" &&

                                    booking.status !==
                                    "CONFIRMED" && (

                                        <div
                                            style={{
                                                background:
                                                    "#fff7ed",
                                                color:
                                                    "#c2410c",
                                                padding:
                                                    "12px",
                                                borderRadius:
                                                    "8px",
                                                fontSize:
                                                    "14px"
                                            }}
                                        >
                                            ⚠ This booking is
                                            not confirmed and
                                            cannot be boarded.
                                        </div>

                                    )}


                                {/* =================================================
                                    ALREADY BOARDED
                                ================================================= */}

                                {booking.boardingStatus ===
                                    "ON BOARD" && (

                                        <div
                                            style={{
                                                background:
                                                    "#dcfce7",
                                                color:
                                                    "#166534",
                                                padding:
                                                    "12px",
                                                borderRadius:
                                                    "8px",
                                                fontSize:
                                                    "14px",
                                                fontWeight:
                                                    "600"
                                            }}
                                        >
                                            ✓ Passenger is
                                            already marked
                                            as boarded.
                                        </div>

                                    )}


                                {/* =================================================
                                    REJECTED
                                ================================================= */}

                                {booking.boardingStatus ===
                                    "REJECTED" && (

                                        <div
                                            style={{
                                                background:
                                                    "#fee2e2",
                                                color:
                                                    "#b91c1c",
                                                padding:
                                                    "12px",
                                                borderRadius:
                                                    "8px",
                                                fontSize:
                                                    "14px",
                                                fontWeight:
                                                    "600"
                                            }}
                                        >
                                            ✕ Passenger boarding
                                            has been rejected.
                                        </div>

                                    )}


                                {/* =================================================
                                    SCAN ANOTHER
                                ================================================= */}

                                <button
                                    onClick={
                                        scanAnother
                                    }
                                    disabled={
                                        loadingBooking
                                    }
                                    style={{
                                        padding: "13px",
                                        border:
                                            "1px solid #d1d5db",
                                        borderRadius:
                                            "8px",
                                        background:
                                            "#ffffff",
                                        color:
                                            "#374151",
                                        fontWeight:
                                            "600",
                                        cursor:
                                            loadingBooking
                                                ? "not-allowed"
                                                : "pointer"
                                    }}
                                >
                                    Scan Another Ticket
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                RESPONSIVE CSS
            ================================================= */}

            <style>
                {`

                    @media (max-width: 768px) {

                        .staff-scanner-grid {
                            grid-template-columns: 1fr !important;
                        }

                        #staff-qr-reader {
                            min-height: 250px !important;
                        }

                    }

                    @media (max-width: 480px) {

                        body {
                            overflow-x: hidden;
                        }

                    }

                `}
            </style>

        </div>
    );
}


// =========================================================
// INFO ROW
// =========================================================

function InfoRow({ label, value }) {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                padding: "9px 0",
                borderBottom:
                    "1px solid #f3f4f6"
            }}
        >

            <span
                style={{
                    color: "#6b7280",
                    fontSize: "14px"
                }}
            >
                {label}
            </span>


            <strong
                style={{
                    color: "#111827",
                    fontSize: "14px",
                    textAlign: "right",
                    wordBreak: "break-word"
                }}
            >
                {value ?? "N/A"}
            </strong>

        </div>
    );
}


export default StaffScanner;