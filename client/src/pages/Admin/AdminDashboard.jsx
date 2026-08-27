import React, {
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";


const API_URL =
    "http://localhost:5000";


const AdminDashboard = () => {

    const navigate =
        useNavigate();


    // =========================================================
    // ADMIN
    // =========================================================

    const [admin, setAdmin] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    // =========================================================
    // PAGE
    // =========================================================

    const [activePage, setActivePage] =
        useState("dashboard");


    // =========================================================
    // STATISTICS
    // =========================================================

    const [statistics, setStatistics] =
        useState({
            totalBookings: 0,
            pendingPayments: 0,
            verifiedPayments: 0,
            rejectedPayments: 0
        });


    // =========================================================
    // PAYMENTS
    // =========================================================

    const [pendingPayments, setPendingPayments] =
        useState([]);

    const [paymentLoading, setPaymentLoading] =
        useState(false);


    const [actionLoading, setActionLoading] =
        useState(null);


    // =========================================================
    // NOTIFICATION
    // =========================================================

    const [notification, setNotification] =
        useState({
            show: false,
            type: "",
            message: ""
        });


    // =========================================================
    // CONFIRMATION MODAL
    // =========================================================

    const [showConfirmModal, setShowConfirmModal] =
        useState(false);

    const [selectedPayment, setSelectedPayment] =
        useState(null);

    const [confirmAction, setConfirmAction] =
        useState(null);


    // =========================================================
    // TOKEN
    // =========================================================

    const getToken = () => {

        return localStorage.getItem(
            "adminToken"
        );

    };


    // =========================================================
    // NOTIFICATION
    // =========================================================

    const showNotification = (
        message,
        type = "info"
    ) => {

        setNotification({
            show: true,
            type,
            message
        });


        setTimeout(() => {

            setNotification({
                show: false,
                type: "",
                message: ""
            });

        }, 4000);

    };


    const closeNotification = () => {

        setNotification({
            show: false,
            type: "",
            message: ""
        });

    };


    // =========================================================
    // SAFE RESPONSE READER
    // =========================================================
    //
    // IMPORTANT:
    // This prevents:
    //
    // Unexpected token '<'
    //
    // when Express returns an HTML 404 page.
    //
    // =========================================================

    const getResponseData = async (
        response
    ) => {

        const contentType =
            response.headers.get(
                "content-type"
            );


        if (
            contentType &&
            contentType.includes(
                "application/json"
            )
        ) {

            return await response.json();

        }


        const text =
            await response.text();


        console.error(
            "Server returned non-JSON response:",
            text
        );


        if (
            response.status === 404
        ) {

            throw new Error(
                "The payment API route was not found. Check your backend booking routes."
            );

        }


        if (
            response.status === 401
        ) {

            throw new Error(
                "Your admin session has expired. Please login again."
            );

        }


        if (
            response.status === 403
        ) {

            throw new Error(
                "You do not have permission to perform this action."
            );

        }


        throw new Error(
            `Server returned an invalid response (${response.status}).`
        );

    };


    // =========================================================
    // LOAD ADMIN
    // =========================================================

    useEffect(() => {

        const token =
            getToken();


        if (!token) {

            navigate(
                "/admin-login",
                {
                    replace: true
                }
            );

            return;

        }


        const loadAdmin =
            async () => {

                try {

                    const response =
                        await fetch(
                            `${API_URL}/api/admin/me`,
                            {
                                method: "GET",

                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );


                    const data =
                        await getResponseData(
                            response
                        );


                    if (
                        !response.ok
                    ) {

                        throw new Error(
                            data.message ||
                            "Unable to load administrator."
                        );

                    }


                    setAdmin(
                        data.admin
                    );


                } catch (error) {

                    console.error(
                        "Load admin error:",
                        error
                    );


                    localStorage.removeItem(
                        "adminToken"
                    );

                    localStorage.removeItem(
                        "adminData"
                    );


                    navigate(
                        "/admin-login",
                        {
                            replace: true
                        }
                    );

                } finally {

                    setLoading(
                        false
                    );

                }

            };


        loadAdmin();

    }, [navigate]);


    // =========================================================
    // LOAD STATISTICS
    // =========================================================

    const loadStatistics =
        async () => {

            const token =
                getToken();


            if (!token) {
                return;
            }


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/bookings/statistics`,
                        {
                            method: "GET",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                const data =
                    await getResponseData(
                        response
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to load statistics."
                    );

                }


                if (
                    data.statistics
                ) {

                    setStatistics(
                        data.statistics
                    );

                }


            } catch (error) {

                console.error(
                    "Statistics error:",
                    error
                );

            }

        };


    // =========================================================
    // LOAD PENDING PAYMENTS
    // =========================================================

    const loadPendingPayments =
        async () => {

            const token =
                getToken();


            if (!token) {
                return;
            }


            setPaymentLoading(
                true
            );


            try {

                /*
                 * IMPORTANT:
                 *
                 * We use:
                 *
                 * /api/bookings/pending-payments
                 *
                 * NOT:
                 *
                 * /api/admin/bookings/pending-payments
                 *
                 * because your current backend is returning:
                 *
                 * Cannot GET /api/admin/bookings/pending-payments
                 */

                const response =
                    await fetch(
                        `${API_URL}/api/bookings/pending-payments`,
                        {
                            method: "GET",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                const data =
                    await getResponseData(
                        response
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to load payment submissions."
                    );

                }


                setPendingPayments(
                    Array.isArray(
                        data.bookings
                    )
                        ? data.bookings
                        : []
                );


            } catch (error) {

                console.error(
                    "Payment loading error:",
                    error
                );


                setPendingPayments(
                    []
                );


                showNotification(
                    error.message ||
                    "Unable to load payment submissions.",
                    "error"
                );

            } finally {

                setPaymentLoading(
                    false
                );

            }

        };


    // =========================================================
    // LOAD INITIAL DATA
    // =========================================================

    useEffect(() => {

        if (!loading) {

            loadStatistics();

        }

    }, [loading]);


    // =========================================================
    // CHANGE PAGE
    // =========================================================

    const handleViewChange =
        (page) => {

            setActivePage(
                page
            );


            if (
                page === "payments"
            ) {

                loadPendingPayments();

            }

        };


    // =========================================================
    // DASHBOARD VIEW
    // =========================================================

    const handleDashboard =
        () => {

            setActivePage(
                "dashboard"
            );

            loadStatistics();

        };


    // =========================================================
    // OPEN CONFIRM MODAL
    // =========================================================

    const openConfirmModal =
        (
            payment,
            action
        ) => {

            setSelectedPayment(
                payment
            );

            setConfirmAction(
                action
            );

            setShowConfirmModal(
                true
            );

        };


    // =========================================================
    // CLOSE CONFIRM MODAL
    // =========================================================

    const closeConfirmModal =
        () => {

            setShowConfirmModal(
                false
            );

            setSelectedPayment(
                null
            );

            setConfirmAction(
                null
            );

        };


    // =========================================================
    // VERIFY PAYMENT
    // =========================================================

    const handleVerifyPayment =
        async (
            bookingId
        ) => {

            const token =
                getToken();


            if (!token) {
                return;
            }


            try {

                setActionLoading(
                    bookingId
                );


                /*
                 * Current booking API structure.
                 */

                const response =
                    await fetch(
                        `${API_URL}/api/bookings/${bookingId}/verify-payment`,
                        {
                            method: "PUT",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "application/json"
                            }
                        }
                    );


                const data =
                    await getResponseData(
                        response
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to verify payment."
                    );

                }


                showNotification(
                    "Payment verified successfully.",
                    "success"
                );


                await loadPendingPayments();

                await loadStatistics();


            } catch (error) {

                console.error(
                    "Verify payment error:",
                    error
                );


                showNotification(
                    error.message ||
                    "Unable to verify payment.",
                    "error"
                );

            } finally {

                setActionLoading(
                    null
                );

            }

        };


    // =========================================================
    // REJECT PAYMENT
    // =========================================================

    const handleRejectPayment =
        async (
            bookingId
        ) => {

            const token =
                getToken();


            if (!token) {
                return;
            }


            try {

                setActionLoading(
                    bookingId
                );


                /*
                 * Current booking API structure.
                 */

                const response =
                    await fetch(
                        `${API_URL}/api/bookings/${bookingId}/reject-payment`,
                        {
                            method: "PUT",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "application/json"
                            }
                        }
                    );


                const data =
                    await getResponseData(
                        response
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to reject payment."
                    );

                }


                showNotification(
                    "Payment rejected successfully.",
                    "success"
                );


                await loadPendingPayments();

                await loadStatistics();


            } catch (error) {

                console.error(
                    "Reject payment error:",
                    error
                );


                showNotification(
                    error.message ||
                    "Unable to reject payment.",
                    "error"
                );

            } finally {

                setActionLoading(
                    null
                );

            }

        };


    // =========================================================
    // EXECUTE CONFIRM ACTION
    // =========================================================

    const executeConfirmAction =
        async () => {

            if (
                !selectedPayment
            ) {

                return;

            }


            const bookingId =
                selectedPayment._id;


            const action =
                confirmAction;


            closeConfirmModal();


            if (
                action === "verify"
            ) {

                await handleVerifyPayment(
                    bookingId
                );

            }


            if (
                action === "reject"
            ) {

                await handleRejectPayment(
                    bookingId
                );

            }

        };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate =
        (date) => {

            if (!date) {
                return "—";
            }


            const parsedDate =
                new Date(date);


            if (
                Number.isNaN(
                    parsedDate.getTime()
                )
            ) {

                return "—";

            }


            return parsedDate.toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            );

        };


    // =========================================================
    // FORMAT AMOUNT
    // =========================================================

    const formatAmount =
        (amount) => {

            if (
                amount === null ||
                amount === undefined
            ) {

                return "₱0.00";

            }


            return `₱${Number(
                amount
            ).toLocaleString(
                "en-PH",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )}`;

        };


    // =========================================================
    // GET PAYMENT PROOF
    // =========================================================

    const getPaymentProof =
        (payment) => {

            return (
                payment?.paymentProof?.url ||
                payment?.paymentProof?.fileUrl ||
                payment?.paymentReceipt ||
                payment?.receiptUrl ||
                payment?.proofOfPayment ||
                ""
            );

        };


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout =
        () => {

            localStorage.removeItem(
                "adminToken"
            );

            localStorage.removeItem(
                "adminData"
            );


            navigate(
                "/",
                {
                    replace: true
                }
            );

        };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="dashboard-loading">

                <div className="loading-spinner">
                </div>

                <p>
                    Loading Admin Dashboard...
                </p>

            </div>

        );

    }


    // =========================================================
    // MAIN UI
    // =========================================================

    return (

        <main className="admin-dashboard">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="sidebar">


                <div className="brand-section">

                    <div className="sidebar-title">
                        GuimarasGo
                    </div>

                    <div className="admin-label">
                        ADMINISTRATOR
                    </div>

                </div>


                <nav className="sidebar-navigation">


                    {/* DASHBOARD */}

                    <button
                        className={
                            `side-item ${
                                activePage ===
                                "dashboard"
                                    ? "active"
                                    : ""
                            }`
                        }

                        onClick={
                            handleDashboard
                        }
                    >

                        <span>
                            Dashboard
                        </span>

                    </button>


                    {/* PAYMENT */}

                    <button
                        className={
                            `side-item ${
                                activePage ===
                                "payments"
                                    ? "active"
                                    : ""
                            }`
                        }

                        onClick={() =>
                            handleViewChange(
                                "payments"
                            )
                        }
                    >

                        <span>
                            Payment Verification
                        </span>


                        {pendingPayments.length >
                            0 && (

                            <span className="payment-count">
                                {
                                    pendingPayments.length
                                }
                            </span>

                        )}

                    </button>


                </nav>


                <div className="sidebar-spacer">
                </div>


                {/* LOGOUT */}

                <button
                    className="logout-button"

                    onClick={
                        handleLogout
                    }
                >
                    Logout
                </button>


            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <section className="dashboard-content">


                {/* HEADER */}

                <header className="dashboard-header">

                    <div>

                        <h1>
                            Administrator Dashboard
                        </h1>

                        <p>
                            Welcome back,{" "}

                            <strong>
                                {
                                    admin?.fullName ||
                                    "Admin"
                                }
                            </strong>

                        </p>

                    </div>


                    <div className="admin-badge">
                        ADMIN
                    </div>

                </header>


                {/* =================================================
                    DASHBOARD PAGE
                ================================================= */}

                {activePage ===
                    "dashboard" && (

                    <div className="dashboard-body">


                        <h2>
                            Dashboard Overview
                        </h2>


                        <p className="dashboard-description">
                            Here's what's happening
                            with your GuimarasGo
                            system.
                        </p>


                        {/* STATISTICS */}

                        <div className="cards">


                            <div className="stat-card">

                                <span>
                                    Total Bookings
                                </span>

                                <strong>
                                    {
                                        statistics.totalBookings
                                    }
                                </strong>

                                <small>
                                    Current records
                                </small>

                            </div>


                            <div className="stat-card">

                                <span>
                                    Pending Payments
                                </span>

                                <strong>
                                    {
                                        statistics.pendingPayments
                                    }
                                </strong>

                                <small>
                                    Awaiting verification
                                </small>

                            </div>


                            <div className="stat-card">

                                <span>
                                    Verified Payments
                                </span>

                                <strong>
                                    {
                                        statistics.verifiedPayments
                                    }
                                </strong>

                                <small>
                                    Verified transactions
                                </small>

                            </div>


                        </div>


                        {/* PAYMENT VERIFICATION */}

                        <div className="welcome-card">


                            <div className="welcome-card-info">

                                <div className="payment-icon">
                                    ₱
                                </div>


                                <div>

                                    <h3>
                                        Payment Verification
                                    </h3>

                                    <p>
                                        Review customer
                                        payment receipts
                                        and verify or
                                        reject pending
                                        bookings.
                                    </p>

                                </div>

                            </div>


                            <button
                                className="view-payment-button"

                                onClick={() =>
                                    handleViewChange(
                                        "payments"
                                    )
                                }
                            >
                                View Payments
                            </button>


                        </div>


                        {/* ADMIN ACCOUNT */}

                        <div className="system-card">

                            <h3>
                                Administrator Account
                            </h3>


                            <div className="account-row">

                                <span>
                                    Name
                                </span>

                                <strong>
                                    {
                                        admin?.fullName ||
                                        "Admin"
                                    }
                                </strong>

                            </div>


                            <div className="account-row">

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {
                                        admin?.email ||
                                        "—"
                                    }
                                </strong>

                            </div>


                            <div className="account-row">

                                <span>
                                    Role
                                </span>

                                <strong>
                                    {
                                        admin?.role ||
                                        "ADMIN"
                                    }
                                </strong>

                            </div>


                        </div>


                    </div>

                )}


                {/* =================================================
                    PAYMENT PAGE
                ================================================= */}

                {activePage ===
                    "payments" && (

                    <div className="payments-page">


                        {/* PAGE HEADER */}

                        <div className="payment-page-header">


                            <div>

                                <h2>
                                    Payment Verification
                                </h2>

                                <p>
                                    Review and process
                                    customer payment
                                    submissions.
                                </p>

                            </div>


                            <div className="payment-summary">

                                <strong>
                                    {
                                        pendingPayments.length
                                    }
                                </strong>

                                <span>
                                    Pending
                                </span>

                            </div>


                        </div>


                        {/* ACTION BAR */}

                        <div className="payment-toolbar">

                            <button
                                className="back-button"

                                onClick={
                                    handleDashboard
                                }
                            >
                                ← Back to Dashboard
                            </button>


                            <button
                                className="refresh-button"

                                onClick={
                                    loadPendingPayments
                                }

                                disabled={
                                    paymentLoading
                                }
                            >

                                {paymentLoading
                                    ? "Refreshing..."
                                    : "↻ Refresh"
                                }

                            </button>

                        </div>


                        {/* LOADING */}

                        {paymentLoading && (

                            <div className="payment-loading">

                                <div className="loading-spinner">
                                </div>

                                <p>
                                    Loading payment
                                    submissions...
                                </p>

                            </div>

                        )}


                        {/* EMPTY */}

                        {!paymentLoading &&
                            pendingPayments.length ===
                                0 && (

                            <div className="empty-payment-card">


                                <div className="empty-icon">
                                    ✓
                                </div>


                                <h3>
                                    No Pending Payments
                                </h3>


                                <p>
                                    There are currently
                                    no payment submissions
                                    waiting for
                                    verification.
                                </p>


                                <button
                                    className="secondary-button"

                                    onClick={
                                        loadPendingPayments
                                    }
                                >
                                    Refresh
                                </button>


                            </div>

                        )}


                        {/* PAYMENT LIST */}

                        {!paymentLoading &&
                            pendingPayments.length >
                                0 && (

                            <div className="payment-list">


                                {pendingPayments.map(
                                    (payment) => {

                                    const proof =
                                        getPaymentProof(
                                            payment
                                        );


                                    const passenger =
                                        payment.passengerName ||
                                        payment.passenger?.fullName ||
                                        payment.user?.fullName ||
                                        "—";


                                    const route =
                                        payment.route ||
                                        (
                                            payment.origin &&
                                            payment.destination
                                                ? `${payment.origin} → ${payment.destination}`
                                                : "—"
                                        );


                                    const date =
                                        payment.date ||
                                        payment.travelDate ||
                                        payment.departureDate;


                                    const time =
                                        payment.time ||
                                        payment.departureTime ||
                                        "—";


                                    const amount =
                                        payment.requiredAmount ??
                                        payment.totalAmount ??
                                        payment.amount ??
                                        payment.totalFare ??
                                        0;


                                    const method =
                                        payment.paymentMethod ||
                                        "Maya / QRPh";


                                    return (

                                        <div
                                            className="payment-card"

                                            key={
                                                payment._id
                                            }
                                        >


                                            {/* CARD HEADER */}

                                            <div className="payment-card-header">


                                                <div>

                                                    <span className="booking-label">
                                                        BOOKING REFERENCE
                                                    </span>


                                                    <h3>
                                                        {
                                                            payment.bookingReference ||
                                                            payment.referenceNumber ||
                                                            payment._id
                                                        }
                                                    </h3>

                                                </div>


                                                <span className="pending-badge">
                                                    PENDING VERIFICATION
                                                </span>


                                            </div>


                                            {/* DETAILS */}

                                            <div className="payment-details">


                                                <div className="detail-item">

                                                    <span>
                                                        Passenger
                                                    </span>

                                                    <strong>
                                                        {
                                                            passenger
                                                        }
                                                    </strong>

                                                </div>


                                                <div className="detail-item">

                                                    <span>
                                                        Route
                                                    </span>

                                                    <strong>
                                                        {
                                                            route
                                                        }
                                                    </strong>

                                                </div>


                                                <div className="detail-item">

                                                    <span>
                                                        Date
                                                    </span>

                                                    <strong>
                                                        {
                                                            formatDate(
                                                                date
                                                            )
                                                        }
                                                    </strong>

                                                </div>


                                                <div className="detail-item">

                                                    <span>
                                                        Time
                                                    </span>

                                                    <strong>
                                                        {
                                                            time
                                                        }
                                                    </strong>

                                                </div>


                                                <div className="detail-item">

                                                    <span>
                                                        Required Amount
                                                    </span>

                                                    <strong>
                                                        {
                                                            formatAmount(
                                                                amount
                                                            )
                                                        }
                                                    </strong>

                                                </div>


                                                <div className="detail-item">

                                                    <span>
                                                        Payment Method
                                                    </span>

                                                    <strong>
                                                        {
                                                            method
                                                        }
                                                    </strong>

                                                </div>


                                            </div>


                                            {/* PAYMENT PROOF */}

                                            <div className="payment-proof-section">


                                                <h4>
                                                    Payment Proof
                                                </h4>


                                                {proof ? (

                                                    <a
                                                        href={
                                                            proof
                                                        }

                                                        target="_blank"

                                                        rel="noreferrer"

                                                        className="payment-proof-link"
                                                    >

                                                        <img
                                                            src={
                                                                proof
                                                            }

                                                            alt="Payment Proof"

                                                            className="payment-proof-image"
                                                        />

                                                        <span>
                                                            Click to view full receipt
                                                        </span>

                                                    </a>

                                                ) : (

                                                    <div className="no-proof">
                                                        No payment receipt uploaded.
                                                    </div>

                                                )}

                                            </div>


                                            {/* ACTIONS */}

                                            <div className="payment-actions">


                                                <button
                                                    className="reject-button"

                                                    disabled={
                                                        actionLoading ===
                                                        payment._id
                                                    }

                                                    onClick={() =>
                                                        openConfirmModal(
                                                            payment,
                                                            "reject"
                                                        )
                                                    }
                                                >

                                                    {actionLoading ===
                                                    payment._id
                                                        ? "Processing..."
                                                        : "Reject Payment"
                                                    }

                                                </button>


                                                <button
                                                    className="verify-button"

                                                    disabled={
                                                        actionLoading ===
                                                        payment._id
                                                    }

                                                    onClick={() =>
                                                        openConfirmModal(
                                                            payment,
                                                            "verify"
                                                        )
                                                    }
                                                >

                                                    {actionLoading ===
                                                    payment._id
                                                        ? "Processing..."
                                                        : "✓ Verify Payment"
                                                    }

                                                </button>


                                            </div>


                                        </div>

                                    );

                                })}


                            </div>

                        )}


                    </div>

                )}


                {/* FOOTER */}

                <footer className="dashboard-footer">

                    <span>
                        © 2026 GuimarasGo
                    </span>

                    <span>
                        Administrator System
                    </span>

                </footer>


            </section>


            {/* =================================================
                NOTIFICATION
            ================================================= */}

            {notification.show && (

                <div
                    className={
                        `notification ${
                            notification.type
                        }`
                    }
                >

                    <div className="notification-content">

                        <span className="notification-icon">

                            {notification.type ===
                            "success"
                                ? "✓"
                                : notification.type ===
                                  "error"
                                    ? "!"
                                    : "i"}

                        </span>


                        <span>
                            {
                                notification.message
                            }
                        </span>

                    </div>


                    <button
                        className="notification-close"

                        onClick={
                            closeNotification
                        }
                    >
                        ×
                    </button>

                </div>

            )}


            {/* =================================================
                CONFIRMATION MODAL
            ================================================= */}

            {showConfirmModal && (

                <div
                    className="modal-overlay"

                    onClick={
                        closeConfirmModal
                    }
                >

                    <div
                        className="confirm-modal"

                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >


                        <div
                            className={
                                `modal-icon ${
                                    confirmAction ===
                                    "reject"
                                        ? "danger-icon"
                                        : "success-icon"
                                }`
                            }
                        >

                            {confirmAction ===
                            "reject"
                                ? "!"
                                : "✓"}

                        </div>


                        <h3>

                            {confirmAction ===
                            "reject"
                                ? "Reject Payment?"
                                : "Verify Payment?"
                            }

                        </h3>


                        <p>

                            {confirmAction ===
                            "reject"

                                ? "Are you sure you want to reject this payment? This will cancel the booking."

                                : "Are you sure you want to verify this payment? This will confirm the customer's booking."
                            }

                        </p>


                        <div className="confirm-modal-actions">


                            <button
                                className="modal-cancel"

                                onClick={
                                    closeConfirmModal
                                }
                            >
                                Cancel
                            </button>


                            <button
                                className={
                                    confirmAction ===
                                    "reject"
                                        ? "modal-confirm danger"
                                        : "modal-confirm success"
                                }

                                onClick={
                                    executeConfirmAction
                                }
                            >

                                {confirmAction ===
                                "reject"
                                    ? "Reject Payment"
                                    : "Verify Payment"
                                }

                            </button>


                        </div>


                    </div>

                </div>

            )}


        </main>

    );

};


export default AdminDashboard;