import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
    const navigate = useNavigate();

    // =========================================================
    // ADMIN
    // =========================================================

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================================================
    // VIEW
    // =========================================================

    const [activeView, setActiveView] = useState("dashboard");

    // =========================================================
    // PAYMENT TAB
    // =========================================================

    const [activePaymentTab, setActivePaymentTab] =
        useState("pending");

    // =========================================================
    // STATISTICS
    // =========================================================

    const [statistics, setStatistics] = useState({
        totalBookings: 0,
        pendingPayments: 0,
        verifiedPayments: 0,
        rejectedPayments: 0
    });

    // =========================================================
    // PAYMENT DATA
    // =========================================================

    const [pendingPayments, setPendingPayments] =
        useState([]);

    const [rejectedPayments, setRejectedPayments] =
        useState([]);

    const [paymentLoading, setPaymentLoading] =
        useState(false);

    // =========================================================
    // ACTION LOADING
    // =========================================================

    const [actionLoading, setActionLoading] =
        useState(null);

    // =========================================================
    // NOTIFICATION
    // =========================================================

    const [notification, setNotification] = useState({
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
    // SHOW NOTIFICATION
    // =========================================================

    const showNotification = (
        message,
        type = "error"
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

    // =========================================================
    // LOAD SAVED REJECTED PAYMENTS
    //
    // UI ONLY
    // This does NOT replace your backend.
    // It simply remembers rejected cards locally so the
    // Rejected tab does not become empty after refresh.
    // =========================================================

    useEffect(() => {
        try {
            const saved =
                localStorage.getItem(
                    "adminRejectedPayments"
                );

            if (saved) {
                const parsed =
                    JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    setRejectedPayments(parsed);
                }
            }
        } catch (error) {
            console.error(
                "Unable to load rejected payment history:",
                error
            );
        }
    }, []);

    // =========================================================
    // SAVE REJECTED PAYMENTS
    // =========================================================

    useEffect(() => {
        try {
            localStorage.setItem(
                "adminRejectedPayments",
                JSON.stringify(rejectedPayments)
            );
        } catch (error) {
            console.error(
                "Unable to save rejected payment history:",
                error
            );
        }
    }, [rejectedPayments]);

    // =========================================================
    // LOAD ADMIN
    // =========================================================

    useEffect(() => {
        const token =
            localStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin-login", {
                replace: true
            });

            return;
        }

        const loadAdmin = async () => {
            try {
                const response =
                    await fetch(
                        `${API_URL}/admin/me`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Unable to load administrator."
                    );
                }

                setAdmin(data.admin);

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

                navigate("/admin-login", {
                    replace: true
                });

            } finally {
                setLoading(false);
            }
        };

        loadAdmin();

    }, [navigate]);

    // =========================================================
    // LOAD DASHBOARD STATISTICS
    // =========================================================

    const loadStatistics = async () => {

        const token =
            localStorage.getItem("adminToken");

        if (!token) return;

        try {

            const response =
                await fetch(
                    `${API_URL}/bookings/statistics`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to load statistics."
                );
            }

            if (data.statistics) {

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

    const loadPendingPayments = async () => {

        const token =
            localStorage.getItem("adminToken");

        if (!token) return;

        setPaymentLoading(true);

        try {

            const response = await fetch(
                    `${API_URL}/bookings/pending-payments`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json"
                        }
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to load payment submissions."
                );
            }

            setPendingPayments(
                data.bookings || []
            );

        } catch (error) {

            console.error(
                "Payment loading error:",
                error
            );

            showNotification(
                error.message ||
                "Unable to load payment submissions.",
                "error"
            );

        } finally {

            setPaymentLoading(false);

        }
    };

    // =========================================================
    // INITIAL STATISTICS
    // =========================================================

    useEffect(() => {

        if (!loading) {
            loadStatistics();
        }

    }, [loading]);

    // =========================================================
    // CHANGE VIEW
    // =========================================================

    const handleViewChange = (view) => {

        setActiveView(view);

        if (view === "payments") {

            setActivePaymentTab("pending");

            loadPendingPayments();
        }
    };

    // =========================================================
    // BACK TO DASHBOARD
    // =========================================================

    const handleBackToDashboard = () => {

        setActiveView("dashboard");

        setActivePaymentTab("pending");

    };

    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem(
            "adminToken"
        );

        localStorage.removeItem(
            "adminData"
        );

        navigate("/", {
            replace: true
        });
    };

    // =========================================================
    // OPEN CONFIRMATION MODAL
    // =========================================================

    const openConfirmModal = (
        payment,
        action
    ) => {

        setSelectedPayment(payment);

        setConfirmAction(action);

        setShowConfirmModal(true);
    };

    // =========================================================
    // CLOSE CONFIRMATION MODAL
    // =========================================================

    const closeConfirmModal = () => {

        if (actionLoading) {
            return;
        }

        setShowConfirmModal(false);

        setSelectedPayment(null);

        setConfirmAction(null);
    };

    // =========================================================
    // VERIFY PAYMENT
    // =========================================================

    const handleVerifyPayment = async (
        bookingId
    ) => {

        const token =
            localStorage.getItem("adminToken");

        if (!token) {
            return;
        }

        setActionLoading(bookingId);

        try {

            const response =
                await fetch(
                    `${API_URL}/admin/bookings/${bookingId}/verify`,
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
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to verify payment."
                );

            }

            /*
             * If this payment somehow exists in the
             * rejected UI cache, remove it.
             */
            setRejectedPayments(
                previous =>
                    previous.filter(
                        payment =>
                            payment._id !== bookingId
                    )
            );

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

            setActionLoading(null);

        }
    };

    // =========================================================
    // REJECT PAYMENT
    // =========================================================

    const handleRejectPayment = async (
        bookingId
    ) => {

        const token =
            localStorage.getItem("adminToken");

        if (!token) {
            return;
        }

        setActionLoading(bookingId);

        try {

            const response =
                await fetch(
                    `${API_URL}/admin/bookings/${bookingId}/reject`,
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
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to reject payment."
                );

            }

            /*
             * Find the payment before removing it.
             */
            const rejectedPayment =
                pendingPayments.find(
                    payment =>
                        payment._id === bookingId
                );

            /*
             * Move the payment into the
             * Rejected tab.
             */
            if (rejectedPayment) {

                const updatedRejectedPayment = {
                    ...rejectedPayment,

                    ...(data.booking || {}),

                    paymentStatus:
                        "REJECTED",

                    status:
                        "CANCELLED"
                };

                setRejectedPayments(
                    previous => {

                        const alreadyExists =
                            previous.some(
                                payment =>
                                    payment._id ===
                                    bookingId
                            );

                        if (alreadyExists) {

                            return previous.map(
                                payment =>
                                    payment._id ===
                                    bookingId
                                        ? updatedRejectedPayment
                                        : payment
                            );

                        }

                        return [
                            updatedRejectedPayment,
                            ...previous
                        ];

                    }
                );

            }

            /*
             * Remove the payment from Pending.
             */
            setPendingPayments(
                previous =>
                    previous.filter(
                        payment =>
                            payment._id !== bookingId
                    )
            );

            showNotification(
                "Payment rejected successfully.",
                "success"
            );

            await loadStatistics();

            /*
             * Automatically switch to Rejected.
             */
            setActivePaymentTab(
                "rejected"
            );

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

            setActionLoading(null);

        }
    };

    // =========================================================
    // CONFIRM ACTION
    // =========================================================

    const executeConfirmAction =
        async () => {

            if (!selectedPayment) {
                return;
            }

            const bookingId =
                selectedPayment._id;

            const action =
                confirmAction;

            setShowConfirmModal(false);

            setSelectedPayment(null);

            setConfirmAction(null);

            if (action === "verify") {

                await handleVerifyPayment(
                    bookingId
                );

            } else if (
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

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        try {

            return new Date(
                date
            ).toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            );

        } catch {

            return date;

        }
    };

    // =========================================================
    // FORMAT AMOUNT
    // =========================================================

    const formatAmount = (amount) => {

        if (
            amount === null ||
            amount === undefined ||
            amount === ""
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
    // PAYMENT PROOF URL
    // =========================================================

    const getPaymentProofUrl = (
        payment
    ) => {

        const proof =
            payment?.paymentProof;

        if (!proof) {
            return null;
        }

        /*
         * Some versions of the booking data
         * may return the proof directly as a string.
         */
        if (typeof proof === "string") {

            if (
                proof.startsWith("http://") ||
                proof.startsWith("https://")
            ) {
                return proof;
            }

            return `http://localhost:5000${proof}`;
        }

        /*
         * Current Booking schema stores paymentProof
         * as an object containing url.
         */
        if (proof.url) {

            if (
                proof.url.startsWith("http://") ||
                proof.url.startsWith("https://")
            ) {
                return proof.url;
            }

            return `http://localhost:5000${proof.url}`;
        }

        return null;
    };

    // =========================================================
    // PAYMENT PROOF FILE NAME
    // =========================================================

    const getPaymentProofName = (
        payment
    ) => {

        const proof =
            payment?.paymentProof;

        if (!proof) {
            return "";
        }

        if (typeof proof === "string") {
            return "";
        }

        return (
            proof.originalName ||
            proof.fileName ||
            ""
        );
    };

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="dashboard-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading Admin Dashboard...
                </p>

            </div>
        );
    }

    // =========================================================
    // CURRENT PAYMENT LIST
    // =========================================================

    const displayedPayments =
        activePaymentTab === "pending"
            ? pendingPayments
            : rejectedPayments;

    // =========================================================
    // MAIN UI
    // =========================================================

    return (

        <main className="admin-dashboard">

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

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

                    <button
                        className={
                            `side-item ${
                                activeView ===
                                "dashboard"
                                    ? "active"
                                    : ""
                            }`
                        }
                        onClick={() =>
                            handleViewChange(
                                "dashboard"
                            )
                        }
                    >
                        <span>
                            Dashboard
                        </span>
                    </button>


                    <button
                        className={
                            `side-item ${
                                activeView ===
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

                        {statistics.pendingPayments >
                            0 && (

                            <span className="pending-badge">

                                {
                                    statistics.pendingPayments
                                }

                            </span>

                        )}

                    </button>

                </nav>


                <div className="sidebar-spacer"></div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </aside>


            {/* =====================================================
                CONTENT
            ===================================================== */}

            <section className="dashboard-content">

                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="dashboard-header">

                    <div>

                        <h1>
                            Administrator Dashboard
                        </h1>

                        <p>
                            Welcome back,{" "}

                            <strong>
                                {admin?.fullName ||
                                    "Admin"}
                            </strong>
                        </p>

                    </div>


                    <div className="admin-badge">
                        ADMIN
                    </div>

                </header>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div className="dashboard-main">


                    {/* =================================================
                        DASHBOARD VIEW
                    ================================================= */}

                    {activeView ===
                        "dashboard" && (

                        <div className="dashboard-page">

                            <div className="page-heading">

                                <div>

                                    <h2>
                                        Dashboard Overview
                                    </h2>

                                    <p>
                                        Here's what's
                                        happening with
                                        your GuimarasGo
                                        system.
                                    </p>

                                </div>

                            </div>


                            {/* =================================================
                                STATISTICS
                            ================================================= */}

                            <div className="cards">

                                <div className="stat-card">

                                    <div className="stat-icon orange">
                                        #
                                    </div>

                                    <div className="stat-content">

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

                                </div>


                                <div className="stat-card">

                                    <div className="stat-icon yellow">
                                        ₱
                                    </div>

                                    <div className="stat-content">

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

                                </div>


                                <div className="stat-card">

                                    <div className="stat-icon green">
                                        ✓
                                    </div>

                                    <div className="stat-content">

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


                                <div className="stat-card">

                                    <div className="stat-icon red">
                                        !
                                    </div>

                                    <div className="stat-content">

                                        <span>
                                            Rejected Payments
                                        </span>

                                        <strong>
                                            {
                                                statistics.rejectedPayments ||
                                                rejectedPayments.length
                                            }
                                        </strong>

                                        <small>
                                            Rejected submissions
                                        </small>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                PAYMENT SHORTCUT
                            ================================================= */}

                            <div className="welcome-card">

                                <div className="welcome-left">

                                    <div className="section-icon">
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
                                    className="primary-button"
                                    onClick={() =>
                                        handleViewChange(
                                            "payments"
                                        )
                                    }
                                >
                                    View Payments
                                </button>

                            </div>


                            {/* =================================================
                                ADMIN ACCOUNT
                            ================================================= */}

                            <div className="system-card">

                                <div className="system-card-heading">

                                    <div>

                                        <span className="eyebrow">
                                            ACCOUNT
                                        </span>

                                        <h3>
                                            Administrator Account
                                        </h3>

                                    </div>

                                    <div className="account-status">
                                        ACTIVE
                                    </div>

                                </div>


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
                        PAYMENT VERIFICATION VIEW
                    ================================================= */}

                    {activeView ===
                        "payments" && (

                        <div className="payments-page">

                            {/* =================================================
                                PAGE HEADER
                            ================================================= */}

                            <div className="payments-header">

                                <div>

                                    <span className="eyebrow">
                                        ADMINISTRATION
                                    </span>

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

                                    <div className="summary-number">
                                        {
                                            activePaymentTab ===
                                            "pending"
                                                ? pendingPayments.length
                                                : rejectedPayments.length
                                        }
                                    </div>

                                    <div className="summary-label">
                                        {
                                            activePaymentTab ===
                                            "pending"
                                                ? "Pending"
                                                : "Rejected"
                                        }
                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                TOOLBAR
                            ================================================= */}

                            <div className="payment-toolbar">
                                
                                <button
                                    type="button"
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
                                        : "↻ Refresh"}
                                </button>

                            </div>


                            {/* =================================================
                                PAYMENT TABS
                            ================================================= */}

                            <div className="payment-tabs">

                                <button
                                    type="button"
                                    className={
                                        `payment-tab ${
                                            activePaymentTab ===
                                            "pending"
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        setActivePaymentTab(
                                            "pending"
                                        )
                                    }
                                >

                                    <span>
                                        Pending
                                    </span>

                                    <span className="tab-count pending-count">
                                        {
                                            pendingPayments.length
                                        }
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    className={
                                        `payment-tab ${
                                            activePaymentTab ===
                                            "rejected"
                                                ? "active rejected-active"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        setActivePaymentTab(
                                            "rejected"
                                        )
                                    }
                                >

                                    <span>
                                        Rejected
                                    </span>

                                    <span className="tab-count rejected-count">
                                        {
                                            rejectedPayments.length
                                        }
                                    </span>

                                </button>

                            </div>


                            {/* =================================================
                                LOADING
                            ================================================= */}

                            {paymentLoading && (

                                <div className="payment-loading">

                                    <div className="loading-spinner"></div>

                                    <p>
                                        Loading payment
                                        submissions...
                                    </p>

                                </div>

                            )}


                            {/* =================================================
                                EMPTY PENDING
                            ================================================= */}

                            {!paymentLoading &&
                                activePaymentTab ===
                                    "pending" &&
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
                                        waiting for verification.
                                    </p>

                                    <button
                                        className="secondary-button"
                                        onClick={
                                            loadPendingPayments
                                        }
                                    >
                                        ↻ Refresh
                                    </button>

                                </div>

                            )}


                            {/* =================================================
                                EMPTY REJECTED
                            ================================================= */}

                            {!paymentLoading &&
                                activePaymentTab ===
                                    "rejected" &&
                                rejectedPayments.length ===
                                    0 && (

                                <div className="empty-payment-card rejected-empty">

                                    <div className="empty-icon rejected-empty-icon">
                                        !
                                    </div>

                                    <h3>
                                        No Rejected Payments
                                    </h3>

                                    <p>
                                        Payments that you
                                        reject will appear
                                        here.
                                    </p>

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            setActivePaymentTab(
                                                "pending"
                                            )
                                        }
                                    >
                                        View Pending Payments
                                    </button>

                                </div>

                            )}


                            {/* =================================================
                                PAYMENT LIST
                            ================================================= */}

                            {!paymentLoading &&
                                displayedPayments.length >
                                    0 && (

                                <div className="payment-list">

                                    {displayedPayments.map(
                                        (payment) => {

                                            const isRejected =
                                                activePaymentTab ===
                                                "rejected";

                                            const proofUrl =
                                                getPaymentProofUrl(
                                                    payment
                                                );

                                            const proofName =
                                                getPaymentProofName(
                                                    payment
                                                );

                                            return (

                                                <div
                                                    className={
                                                        `payment-card ${
                                                            isRejected
                                                                ? "rejected-card"
                                                                : ""
                                                        }`
                                                    }
                                                    key={
                                                        payment._id
                                                    }
                                                >

                                                    {/* =========================================
                                                        CARD HEADER
                                                    ========================================= */}

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


                                                        <span
                                                            className={
                                                                `status-badge ${
                                                                    isRejected
                                                                        ? "rejected-status"
                                                                        : "pending-status"
                                                                }`
                                                            }
                                                        >
                                                            {isRejected
                                                                ? "REJECTED"
                                                                : "PENDING VERIFICATION"}
                                                        </span>

                                                    </div>


                                                    {/* =========================================
                                                        DETAILS
                                                    ========================================= */}

                                                    <div className="payment-details">

                                                        <div className="payment-detail">

                                                            <span>
                                                                Passenger
                                                            </span>

                                                            <strong>
                                                                {
                                                                    payment.passengerName ||
                                                                    payment.fullName ||
                                                                    "—"
                                                                }
                                                            </strong>

                                                        </div>


                                                        <div className="payment-detail">

                                                            <span>
                                                                Route
                                                            </span>

                                                            <strong>

                                                                {payment.origin &&
                                                                payment.destination
                                                                    ? `${payment.origin} → ${payment.destination}`
                                                                    : payment.route ||
                                                                      "Iloilo → Guimaras"}

                                                            </strong>

                                                        </div>


                                                        <div className="payment-detail">

                                                            <span>
                                                                Date
                                                            </span>

                                                            <strong>
                                                                {
                                                                    formatDate(
                                                                        payment.travelDate ||
                                                                        payment.date
                                                                    )
                                                                }
                                                            </strong>

                                                        </div>


                                                        <div className="payment-detail">

                                                            <span>
                                                                Time
                                                            </span>

                                                            <strong>
                                                                {
                                                                    payment.travelTime ||
                                                                    payment.time ||
                                                                    "—"
                                                                }
                                                            </strong>

                                                        </div>


                                                        <div className="payment-detail">

                                                            <span>
                                                                Required Amount
                                                            </span>

                                                            <strong className="amount-text">
                                                                {
                                                                    formatAmount(
                                                                        payment.requiredAmount
                                                                    )
                                                                }
                                                            </strong>

                                                        </div>


                                                        <div className="payment-detail">

                                                            <span>
                                                                Payment Method
                                                            </span>

                                                            <strong>
                                                                {
                                                                    payment.paymentMethod ||
                                                                    "Maya / QRPh"
                                                                }
                                                            </strong>

                                                        </div>

                                                    </div>


                                                    {/* =========================================
                                                        PAYMENT PROOF
                                                    ========================================= */}

                                                    <div className="payment-proof-section">

                                                        <div className="proof-heading">

                                                            <div>

                                                                <span className="eyebrow">
                                                                    RECEIPT
                                                                </span>

                                                                <h4>
                                                                    Payment Proof
                                                                </h4>

                                                            </div>

                                                            {proofName && (

                                                                <span className="proof-file-name">
                                                                    {proofName}
                                                                </span>

                                                            )}

                                                        </div>


                                                        {proofUrl ? (

                                                            <a
                                                                href={
                                                                    proofUrl
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="payment-proof"
                                                            >

                                                                <img
                                                                    src={
                                                                        proofUrl
                                                                    }
                                                                    alt="Payment Proof"
                                                                />

                                                                <div className="proof-overlay">
                                                                    <span>
                                                                        View Receipt
                                                                    </span>
                                                                </div>

                                                            </a>

                                                        ) : (

                                                            <div className="no-proof">

                                                                <span className="no-proof-icon">
                                                                    !
                                                                </span>

                                                                <span>
                                                                    No payment
                                                                    proof uploaded.
                                                                </span>

                                                            </div>

                                                        )}

                                                    </div>


                                                    {/* =========================================
                                                        REJECTED MESSAGE
                                                    ========================================= */}

                                                    {isRejected && (

                                                        <div className="rejected-message">

                                                            <div className="rejected-message-icon">
                                                                !
                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    Payment Rejected
                                                                </strong>

                                                                <p>
                                                                    This payment
                                                                    submission
                                                                    was rejected
                                                                    by the
                                                                    administrator.
                                                                    The booking
                                                                    has been
                                                                    cancelled.
                                                                </p>

                                                            </div>

                                                        </div>

                                                    )}


                                                    {/* =========================================
                                                        ACTIONS
                                                    ========================================= */}

                                                    {!isRejected && (

                                                        <div className="payment-actions">

                                                            <button
                                                                type="button"
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
                                                                    : "Reject Payment"}

                                                            </button>


                                                            <button
                                                                type="button"
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

                                                                ✓ Verify Payment

                                                            </button>

                                                        </div>

                                                    )}

                                                </div>

                                            );

                                        }
                                    )}

                                </div>

                            )}

                        </div>

                    )}

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="dashboard-footer">

                    <span>
                        © 2026 GuimarasGo
                    </span>

                    <span>
                        Administrator System
                    </span>

                </footer>

            </section>


            {/* =====================================================
                NOTIFICATION
            ===================================================== */}

            {notification.show && (

                <div
                    className={
                        `notification ${
                            notification.type
                        }`
                    }
                >

                    <span className="notification-icon">

                        {notification.type ===
                        "success"
                            ? "✓"
                            : "!"}

                    </span>


                    <span>
                        {
                            notification.message
                        }
                    </span>


                    <button
                        type="button"
                        onClick={() =>
                            setNotification({
                                show: false,
                                type: "",
                                message: ""
                            })
                        }
                    >
                        ×
                    </button>

                </div>

            )}


            {/* =====================================================
                CONFIRMATION MODAL
            ===================================================== */}

            {showConfirmModal &&
                selectedPayment && (

                <div
                    className="modal-overlay"
                    onClick={
                        closeConfirmModal
                    }
                >

                    <div
                        className="confirm-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div
                            className={
                                `modal-icon ${
                                    confirmAction ===
                                    "reject"
                                        ? "modal-danger"
                                        : "modal-success"
                                }`
                            }
                        >

                            {confirmAction ===
                            "reject"
                                ? "!"
                                : "✓"}

                        </div>


                        <span className="modal-eyebrow">
                            CONFIRM ACTION
                        </span>


                        <h3>

                            {confirmAction ===
                            "reject"
                                ? "Reject Payment?"
                                : "Verify Payment?"}

                        </h3>


                        <div className="modal-booking">

                            <span>
                                Booking Reference
                            </span>

                            <strong>
                                {
                                    selectedPayment.bookingReference ||
                                    selectedPayment.referenceNumber ||
                                    selectedPayment._id
                                }
                            </strong>

                        </div>


                        <p>

                            {confirmAction ===
                            "reject"

                                ? "Are you sure you want to reject this payment? This will cancel the customer's booking."

                                : "Are you sure you want to verify this payment? This will confirm the customer's booking."}

                        </p>


                        <div className="confirm-modal-actions">

                            <button
                                type="button"
                                className="modal-cancel"
                                onClick={
                                    closeConfirmModal
                                }
                                disabled={
                                    actionLoading
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                className={
                                    `modal-confirm ${
                                        confirmAction ===
                                        "reject"
                                            ? "danger"
                                            : "success"
                                    }`
                                }
                                onClick={
                                    executeConfirmAction
                                }
                                disabled={
                                    actionLoading
                                }
                            >

                                {confirmAction ===
                                "reject"
                                    ? "Reject Payment"
                                    : "Verify Payment"}

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================================
                CSS
            ===================================================== */}

            <style>{`

                * {
                    box-sizing: border-box;
                }


                body {
                    margin: 0;
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    background:
                        #f5f7fa;
                }


                button {
                    font-family: inherit;
                }


                /* =================================================
                   MAIN LAYOUT
                ================================================= */

                .admin-dashboard {
                    min-height: 100vh;

                    display: flex;

                    background:
                        #f5f7fa;

                    color:
                        #222;
                }


                /* =================================================
                   SIDEBAR
                ================================================= */

                .sidebar {
                    width: 220px;

                    min-height: 100vh;

                    display: flex;

                    flex-direction: column;

                    flex-shrink: 0;

                    padding:
                        27px 12px;

                    background:
                        #ffffff;

                    border-right:
                        1px solid #e5e5e5;
                }


                .brand-section {
                    padding:
                        0 11px;

                    margin-bottom:
                        34px;
                }


                .sidebar-title {
                    color:
                        #f28c28;

                    font-size:
                        21px;

                    font-weight:
                        900;

                    letter-spacing:
                        -0.5px;

                    margin-bottom:
                        4px;
                }


                .admin-label {
                    color:
                        #999;

                    font-size:
                        8px;

                    font-weight:
                        800;

                    letter-spacing:
                        1.5px;
                }


                .sidebar-navigation {
                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        6px;
                }


                .side-item {
                    width:
                        100%;

                    min-height:
                        43px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        8px;

                    padding:
                        0 13px;

                    border:
                        none;

                    border-radius:
                        9px;

                    background:
                        transparent;

                    color:
                        #555;

                    text-align:
                        left;

                    font-size:
                        12px;

                    cursor:
                        pointer;

                    transition:
                        all 0.2s ease;
                }


                .side-item:hover {
                    background:
                        #fafafa;
                }


                .side-item.active {
                    background:
                        #fff0df;

                    color:
                        #f28c28;

                    font-weight:
                        700;
                }


                .pending-badge {
                    min-width:
                        21px;

                    height:
                        21px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    padding:
                        0 6px;

                    border-radius:
                        50px;

                    background:
                        #f28c28;

                    color:
                        #ffffff;

                    font-size:
                        9px;

                    font-weight:
                        800;
                }


                .sidebar-spacer {
                    flex:
                        1;
                }


                .logout-button {
                    width:
                        100%;

                    height:
                        39px;

                    border:
                        none;

                    border-radius:
                        8px;

                    background:
                        #fff0f0;

                    color:
                        #d32f2f;

                    font-size:
                        11px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        0.2s ease;
                }


                .logout-button:hover {
                    background:
                        #ffe3e3;
                }


                /* =================================================
                   CONTENT
                ================================================= */

                .dashboard-content {
                    flex:
                        1;

                    min-width:
                        0;

                    min-height:
                        100vh;

                    display:
                        flex;

                    flex-direction:
                        column;
                }


                /* =================================================
                   HEADER
                ================================================= */

                .dashboard-header {
                    min-height:
                        70px;

                    padding:
                        0 32px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    background:
                        #ffffff;

                    border-bottom:
                        1px solid #e5e5e5;
                }


                .dashboard-header h1 {
                    margin:
                        0 0 4px;

                    color:
                        #222;

                    font-size:
                        21px;

                    font-weight:
                        800;

                    letter-spacing:
                        -0.4px;
                }


                .dashboard-header p {
                    margin:
                        0;

                    color:
                        #888;

                    font-size:
                        11px;
                }


                .dashboard-header strong {
                    color:
                        #444;
                }


                .admin-badge {
                    padding:
                        8px 15px;

                    border-radius:
                        20px;

                    background:
                        #fff0df;

                    color:
                        #f28c28;

                    font-size:
                        9px;

                    font-weight:
                        800;

                    letter-spacing:
                        0.4px;
                }


                /* =================================================
                   MAIN
                ================================================= */

                .dashboard-main {
                    flex:
                        1;

                    width:
                        100%;

                    padding:
                        34px 35px;
                }


                .dashboard-page,
                .payments-page {
                    width:
                        100%;

                    max-width:
                        1100px;

                    margin:
                        0 auto;
                }


                /* =================================================
                   PAGE HEADING
                ================================================= */

                .page-heading {
                    margin-bottom:
                        25px;
                }


                .page-heading h2,
                .payments-header h2 {
                    margin:
                        0 0 6px;

                    color:
                        #222;

                    font-size:
                        25px;

                    font-weight:
                        800;

                    letter-spacing:
                        -0.6px;
                }


                .page-heading p,
                .payments-header p {
                    margin:
                        0;

                    color:
                        #888;

                    font-size:
                        11px;
                }


                .eyebrow {
                    display:
                        block;

                    margin-bottom:
                        5px;

                    color:
                        #a1a1a1;

                    font-size:
                        8px;

                    font-weight:
                        800;

                    letter-spacing:
                        1.2px;
                }


                /* =================================================
                   STATISTICS
                ================================================= */

                .cards {
                    display:
                        grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap:
                        15px;

                    margin-bottom:
                        22px;
                }


                .stat-card {
                    min-height:
                        145px;

                    padding:
                        19px;

                    display:
                        flex;

                    align-items:
                        flex-start;

                    gap:
                        13px;

                    background:
                        #ffffff;

                    border:
                        1px solid #e8e8e8;

                    border-radius:
                        12px;

                    box-shadow:
                        0 3px 12px
                        rgba(0,0,0,0.025);
                }


                .stat-icon {
                    width:
                        37px;

                    height:
                        37px;

                    flex-shrink:
                        0;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        9px;

                    font-size:
                        15px;

                    font-weight:
                        900;
                }


                .stat-icon.orange {
                    background:
                        #fff0df;

                    color:
                        #f28c28;
                }


                .stat-icon.yellow {
                    background:
                        #fff7df;

                    color:
                        #d89a00;
                }


                .stat-icon.green {
                    background:
                        #e9f8ef;

                    color:
                        #16804a;
                }


                .stat-icon.red {
                    background:
                        #fff0f0;

                    color:
                        #d32f2f;
                }


                .stat-content {
                    min-width:
                        0;
                }


                .stat-content span {
                    display:
                        block;

                    margin-bottom:
                        8px;

                    color:
                        #777;

                    font-size:
                        10px;
                }


                .stat-content strong {
                    display:
                        block;

                    margin-bottom:
                        5px;

                    color:
                        #222;

                    font-size:
                        27px;

                    line-height:
                        1;
                }


                .stat-content small {
                    color:
                        #999;

                    font-size:
                        9px;
                }


                /* =================================================
                   WELCOME CARD
                ================================================= */

                .welcome-card {
                    min-height:
                        105px;

                    margin-bottom:
                        20px;

                    padding:
                        22px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        20px;

                    background:
                        #ffffff;

                    border:
                        1px solid #e8e8e8;

                    border-radius:
                        12px;
                }


                .welcome-left {
                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        15px;
                }


                .section-icon {
                    width:
                        45px;

                    height:
                        45px;

                    flex-shrink:
                        0;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        11px;

                    background:
                        #fff0df;

                    color:
                        #f28c28;

                    font-size:
                        18px;

                    font-weight:
                        800;
                }


                .welcome-card h3 {
                    margin:
                        0 0 6px;

                    font-size:
                        15px;
                }


                .welcome-card p {
                    max-width:
                        600px;

                    margin:
                        0;

                    color:
                        #777;

                    font-size:
                        10px;

                    line-height:
                        1.5;
                }


                .primary-button {
                    min-width:
                        120px;

                    padding:
                        11px 18px;

                    border:
                        none;

                    border-radius:
                        8px;

                    background:
                        #333;

                    color:
                        #ffffff;

                    font-size:
                        10px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        0.2s ease;
                }


                .primary-button:hover {
                    background:
                        #222;
                }


                /* =================================================
                   ADMIN ACCOUNT
                ================================================= */

                .system-card {
                    padding:
                        22px;

                    background:
                        #ffffff;

                    border:
                        1px solid #e8e8e8;

                    border-radius:
                        12px;
                }


                .system-card-heading {
                    display:
                        flex;

                    align-items:
                        flex-start;

                    justify-content:
                        space-between;

                    margin-bottom:
                        8px;
                }


                .system-card h3 {
                    margin:
                        0;

                    font-size:
                        15px;
                }


                .account-status {
                    padding:
                        6px 9px;

                    border-radius:
                        20px;

                    background:
                        #e9f8ef;

                    color:
                        #16804a;

                    font-size:
                        8px;

                    font-weight:
                        800;
                }


                .account-row {
                    min-height:
                        43px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        20px;

                    border-bottom:
                        1px solid #f0f0f0;
                }


                .account-row:last-child {
                    border-bottom:
                        none;
                }


                .account-row span {
                    color:
                        #888;

                    font-size:
                        10px;
                }


                .account-row strong {
                    color:
                        #333;

                    font-size:
                        10px;

                    text-align:
                        right;

                    word-break:
                        break-word;
                }


                /* =================================================
                   PAYMENTS HEADER
                ================================================= */

                .payments-header {
                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        20px;

                    margin-bottom:
                        18px;
                }


                .payment-summary {
                    min-width:
                        82px;

                    padding:
                        11px 16px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        5px;

                    border-radius:
                        11px;

                    background:
                        #fff0df;

                    color:
                        #f28c28;
                }


                .summary-number {
                    font-size:
                        17px;

                    font-weight:
                        900;
                }


                .summary-label {
                    font-size:
                        9px;

                    font-weight:
                        700;
                }


                /* =================================================
                   PAYMENT TOOLBAR
                ================================================= */

                .payment-toolbar {
                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        12px;

                    margin-bottom:
                        15px;
                }


                .back-button,
                .refresh-button {
                    min-height:
                        37px;

                    display:
                        inline-flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        7px;

                    padding:
                        0 14px;

                    border-radius:
                        8px;

                    font-size:
                        10px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        all 0.2s ease;
                }


                .back-button {
                    border:
                        1px solid #e0e0e0;

                    background:
                        #ffffff;

                    color:
                        #444;
                }


                .back-button:hover {
                    background:
                        #f8f8f8;

                    border-color:
                        #d5d5d5;
                }


                .back-arrow {
                    font-size:
                        14px;
                }


                .refresh-button {
                    border:
                        none;

                    background:
                        #333;

                    color:
                        #ffffff;
                }


                .refresh-button:hover {
                    background:
                        #222;
                }


                .refresh-button:disabled {
                    opacity:
                        0.6;

                    cursor:
                        not-allowed;
                }


                /* =================================================
                   PAYMENT TABS
                ================================================= */

                .payment-tabs {
                    width:
                        100%;

                    display:
                        grid;

                    grid-template-columns:
                        1fr 1fr;

                    gap:
                        6px;

                    margin-bottom:
                        20px;

                    padding:
                        5px;

                    background:
                        #eeeeee;

                    border-radius:
                        10px;
                }


                .payment-tab {
                    min-height:
                        41px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        8px;

                    border:
                        none;

                    border-radius:
                        7px;

                    background:
                        transparent;

                    color:
                        #777;

                    font-size:
                        10px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        all 0.2s ease;
                }


                .payment-tab:hover {
                    background:
                        rgba(255,255,255,0.6);

                    color:
                        #444;
                }


                .payment-tab.active {
                    background:
                        #ffffff;

                    color:
                        #f28c28;

                    box-shadow:
                        0 2px 7px
                        rgba(0,0,0,0.07);
                }


                .payment-tab.rejected-active {
                    color:
                        #d32f2f;
                }


                .tab-count {
                    min-width:
                        21px;

                    height:
                        21px;

                    display:
                        inline-flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    padding:
                        0 6px;

                    border-radius:
                        50px;

                    font-size:
                        8px;

                    font-weight:
                        800;
                }


                .pending-count {
                    background:
                        #fff0df;

                    color:
                        #f28c28;
                }


                .rejected-count {
                    background:
                        #fff0f0;

                    color:
                        #d32f2f;
                }


                /* =================================================
                   PAYMENT LIST
                ================================================= */

                .payment-list {
                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        16px;
                }


                .payment-card {
                    padding:
                        21px;

                    background:
                        #ffffff;

                    border:
                        1px solid #e5e5e5;

                    border-radius:
                        13px;

                    box-shadow:
                        0 3px 12px
                        rgba(0,0,0,0.025);
                }


                .payment-card.rejected-card {
                    border-left:
                        4px solid #d32f2f;
                }


                .payment-card-header {
                    display:
                        flex;

                    align-items:
                        flex-start;

                    justify-content:
                        space-between;

                    gap:
                        15px;

                    padding-bottom:
                        16px;

                    border-bottom:
                        1px solid #eeeeee;
                }


                .booking-label {
                    display:
                        block;

                    margin-bottom:
                        5px;

                    color:
                        #999;

                    font-size:
                        8px;

                    font-weight:
                        800;

                    letter-spacing:
                        1px;
                }


                .payment-card-header h3 {
                    margin:
                        0;

                    color:
                        #222;

                    font-size:
                        17px;
                }


                .status-badge {
                    flex-shrink:
                        0;

                    padding:
                        7px 10px;

                    border-radius:
                        20px;

                    font-size:
                        8px;

                    font-weight:
                        800;
                }


                .pending-status {
                    background:
                        #fff4e6;

                    color:
                        #f28c28;
                }


                .rejected-status {
                    background:
                        #fff0f0;

                    color:
                        #d32f2f;
                }


                /* =================================================
                   PAYMENT DETAILS
                ================================================= */

                .payment-details {
                    display:
                        grid;

                    grid-template-columns:
                        repeat(3, 1fr);

                    gap:
                        17px;

                    padding:
                        19px 0;

                    border-bottom:
                        1px solid #eeeeee;
                }


                .payment-detail span {
                    display:
                        block;

                    margin-bottom:
                        5px;

                    color:
                        #999;

                    font-size:
                        9px;
                }


                .payment-detail strong {
                    color:
                        #333;

                    font-size:
                        10px;

                    line-height:
                        1.4;
                }


                .amount-text {
                    color:
                        #16804a !important;
                }


                /* =================================================
                   PAYMENT PROOF
                ================================================= */

                .payment-proof-section {
                    padding-top:
                        18px;
                }


                .proof-heading {
                    display:
                        flex;

                    align-items:
                        flex-end;

                    justify-content:
                        space-between;

                    gap:
                        15px;

                    margin-bottom:
                        11px;
                }


                .proof-heading h4 {
                    margin:
                        0;

                    font-size:
                        13px;
                }


                .proof-file-name {
                    max-width:
                        300px;

                    color:
                        #999;

                    font-size:
                        8px;

                    text-overflow:
                        ellipsis;

                    overflow:
                        hidden;

                    white-space:
                        nowrap;
                }


                .payment-proof {
                    position:
                        relative;

                    display:
                        inline-block;

                    width:
                        150px;

                    height:
                        190px;

                    overflow:
                        hidden;

                    border:
                        1px solid #ddd;

                    border-radius:
                        8px;

                    background:
                        #f5f5f5;
                }


                .payment-proof img {
                    width:
                        100%;

                    height:
                        100%;

                    display:
                        block;

                    object-fit:
                        cover;
                }


                .proof-overlay {
                    position:
                        absolute;

                    inset:
                        auto 0 0 0;

                    padding:
                        10px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    background:
                        rgba(0,0,0,0.72);

                    color:
                        #ffffff;

                    font-size:
                        9px;

                    font-weight:
                        700;

                    opacity:
                        0;

                    transition:
                        opacity 0.2s ease;
                }


                .payment-proof:hover
                .proof-overlay {
                    opacity:
                        1;
                }


                .no-proof {
                    width:
                        150px;

                    min-height:
                        90px;

                    display:
                        flex;

                    flex-direction:
                        column;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        7px;

                    padding:
                        12px;

                    border:
                        1px dashed #ccc;

                    border-radius:
                        8px;

                    color:
                        #999;

                    font-size:
                        9px;

                    text-align:
                        center;
                }


                .no-proof-icon {
                    width:
                        25px;

                    height:
                        25px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        50%;

                    background:
                        #f5f5f5;

                    color:
                        #999;

                    font-weight:
                        800;
                }


                /* =================================================
                   REJECTED MESSAGE
                ================================================= */

                .rejected-message {
                    margin-top:
                        18px;

                    padding:
                        13px;

                    display:
                        flex;

                    align-items:
                        flex-start;

                    gap:
                        10px;

                    border:
                        1px solid #ffd7d7;

                    border-radius:
                        8px;

                    background:
                        #fff7f7;
                }


                .rejected-message-icon {
                    width:
                        25px;

                    height:
                        25px;

                    flex-shrink:
                        0;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        50%;

                    background:
                        #fff0f0;

                    color:
                        #d32f2f;

                    font-size:
                        11px;

                    font-weight:
                        800;
                }


                .rejected-message strong {
                    display:
                        block;

                    margin-bottom:
                        3px;

                    color:
                        #c62828;

                    font-size:
                        10px;
                }


                .rejected-message p {
                    margin:
                        0;

                    color:
                        #888;

                    font-size:
                        9px;

                    line-height:
                        1.5;
                }


                /* =================================================
                   PAYMENT ACTIONS
                ================================================= */

                .payment-actions {
                    display:
                        flex;

                    justify-content:
                        flex-end;

                    gap:
                        9px;

                    margin-top:
                        19px;
                }


                .reject-button,
                .verify-button {
                    min-height:
                        38px;

                    padding:
                        0 16px;

                    border:
                        none;

                    border-radius:
                        8px;

                    font-size:
                        9px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        all 0.2s ease;
                }


                .reject-button {
                    background:
                        #fff0f0;

                    color:
                        #d32f2f;
                }


                .reject-button:hover {
                    background:
                        #ffe1e1;
                }


                .verify-button {
                    background:
                        #e9f8ef;

                    color:
                        #16804a;
                }


                .verify-button:hover {
                    background:
                        #d8f2e4;
                }


                .reject-button:disabled,
                .verify-button:disabled {
                    opacity:
                        0.55;

                    cursor:
                        not-allowed;
                }


                /* =================================================
                   EMPTY STATE
                ================================================= */

                .empty-payment-card {
                    width:
                        100%;

                    min-height:
                        330px;

                    padding:
                        50px 30px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    flex-direction:
                        column;

                    background:
                        #ffffff;

                    border:
                        1px solid #e5e5e5;

                    border-radius:
                        13px;

                    text-align:
                        center;
                }


                .empty-icon {
                    width:
                        54px;

                    height:
                        54px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    margin-bottom:
                        14px;

                    border-radius:
                        50%;

                    background:
                        #e9f8ef;

                    color:
                        #16804a;

                    font-size:
                        24px;

                    font-weight:
                        800;
                }


                .rejected-empty-icon {
                    background:
                        #fff0f0;

                    color:
                        #d32f2f;
                }


                .empty-payment-card h3 {
                    margin:
                        0 0 7px;

                    color:
                        #222;

                    font-size:
                        16px;
                }


                .empty-payment-card p {
                    max-width:
                        450px;

                    margin:
                        0 0 18px;

                    color:
                        #888;

                    font-size:
                        10px;

                    line-height:
                        1.5;
                }


                .secondary-button {
                    min-height:
                        37px;

                    padding:
                        0 15px;

                    border:
                        1px solid #ddd;

                    border-radius:
                        7px;

                    background:
                        #ffffff;

                    color:
                        #555;

                    font-size:
                        9px;

                    font-weight:
                        700;

                    cursor:
                        pointer;
                }


                .secondary-button:hover {
                    background:
                        #f8f8f8;
                }


                /* =================================================
                   LOADING
                ================================================= */

                .payment-loading {
                    min-height:
                        300px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    flex-direction:
                        column;

                    background:
                        #ffffff;

                    border:
                        1px solid #e5e5e5;

                    border-radius:
                        13px;
                }


                .payment-loading p {
                    margin:
                        12px 0 0;

                    color:
                        #888;

                    font-size:
                        10px;
                }


                .loading-spinner {
                    width:
                        30px;

                    height:
                        30px;

                    border:
                        3px solid #eeeeee;

                    border-top-color:
                        #f28c28;

                    border-radius:
                        50%;

                    animation:
                        spin 0.8s linear infinite;
                }


                @keyframes spin {

                    to {
                        transform:
                            rotate(360deg);
                    }

                }


                /* =================================================
                   NOTIFICATION
                ================================================= */

                .notification {
                    position:
                        fixed;

                    top:
                        20px;

                    right:
                        20px;

                    z-index:
                        2000;

                    min-width:
                        300px;

                    max-width:
                        420px;

                    padding:
                        13px 14px;

                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        10px;

                    background:
                        #ffffff;

                    border-radius:
                        9px;

                    box-shadow:
                        0 10px 30px
                        rgba(0,0,0,0.12);

                    font-size:
                        10px;

                    font-weight:
                        700;

                    animation:
                        notificationIn
                        0.25s ease;
                }


                .notification.error {
                    border-left:
                        4px solid #e53935;

                    color:
                        #d32f2f;
                }


                .notification.success {
                    border-left:
                        4px solid #16804a;

                    color:
                        #16804a;
                }


                .notification-icon {
                    width:
                        20px;

                    height:
                        20px;

                    flex-shrink:
                        0;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        50%;

                    background:
                        #f5f5f5;

                    font-size:
                        10px;
                }


                .notification button {
                    margin-left:
                        auto;

                    border:
                        none;

                    background:
                        transparent;

                    color:
                        #999;

                    font-size:
                        17px;

                    cursor:
                        pointer;
                }


                @keyframes notificationIn {

                    from {
                        opacity:
                            0;

                        transform:
                            translateY(-10px);
                    }

                    to {
                        opacity:
                            1;

                        transform:
                            translateY(0);
                    }

                }


                /* =================================================
                   CONFIRMATION MODAL
                ================================================= */

                .modal-overlay {
                    position:
                        fixed;

                    inset:
                        0;

                    z-index:
                        3000;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    padding:
                        20px;

                    background:
                        rgba(0,0,0,0.45);

                    backdrop-filter:
                        blur(3px);
                }


                .confirm-modal {
                    width:
                        100%;

                    max-width:
                        410px;

                    padding:
                        28px;

                    background:
                        #ffffff;

                    border-radius:
                        15px;

                    box-shadow:
                        0 20px 60px
                        rgba(0,0,0,0.2);

                    text-align:
                        center;
                }


                .modal-icon {
                    width:
                        50px;

                    height:
                        50px;

                    margin:
                        0 auto 13px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        50%;

                    font-size:
                        20px;

                    font-weight:
                        800;
                }


                .modal-danger {
                    background:
                        #fff0f0;

                    color:
                        #d32f2f;
                }


                .modal-success {
                    background:
                        #e9f8ef;

                    color:
                        #16804a;
                }


                .modal-eyebrow {
                    display:
                        block;

                    margin-bottom:
                        6px;

                    color:
                        #999;

                    font-size:
                        8px;

                    font-weight:
                        800;

                    letter-spacing:
                        1px;
                }


                .confirm-modal h3 {
                    margin:
                        0 0 15px;

                    color:
                        #222;

                    font-size:
                        19px;
                }


                .modal-booking {
                    padding:
                        11px;

                    margin-bottom:
                        14px;

                    border-radius:
                        8px;

                    background:
                        #f7f7f7;
                }


                .modal-booking span {
                    display:
                        block;

                    margin-bottom:
                        4px;

                    color:
                        #999;

                    font-size:
                        8px;

                    text-transform:
                        uppercase;
                }


                .modal-booking strong {
                    color:
                        #333;

                    font-size:
                        11px;
                }


                .confirm-modal p {
                    margin:
                        0;

                    color:
                        #777;

                    font-size:
                        10px;

                    line-height:
                        1.6;
                }


                .confirm-modal-actions {
                    display:
                        flex;

                    justify-content:
                        center;

                    gap:
                        9px;

                    margin-top:
                        23px;
                }


                .modal-cancel,
                .modal-confirm {
                    min-height:
                        38px;

                    padding:
                        0 17px;

                    border-radius:
                        8px;

                    font-size:
                        9px;

                    font-weight:
                        700;

                    cursor:
                        pointer;
                }


                .modal-cancel {
                    border:
                        1px solid #ddd;

                    background:
                        #ffffff;

                    color:
                        #555;
                }


                .modal-cancel:hover {
                    background:
                        #f8f8f8;
                }


                .modal-confirm {
                    border:
                        none;

                    color:
                        #ffffff;
                }


                .modal-confirm.danger {
                    background:
                        #d32f2f;
                }


                .modal-confirm.danger:hover {
                    background:
                        #b92525;
                }


                .modal-confirm.success {
                    background:
                        #16804a;
                }


                .modal-confirm.success:hover {
                    background:
                        #126b3e;
                }


                .modal-cancel:disabled,
                .modal-confirm:disabled {
                    opacity:
                        0.55;

                    cursor:
                        not-allowed;
                }


                /* =================================================
                   FOOTER
                ================================================= */

                .dashboard-footer {
                    min-height:
                        55px;

                    padding:
                        0 32px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    background:
                        #ffffff;

                    border-top:
                        1px solid #e5e5e5;

                    color:
                        #999;

                    font-size:
                        9px;
                }


                /* =================================================
                   LOADING SCREEN
                ================================================= */

                .dashboard-loading {
                    min-height:
                        100vh;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    flex-direction:
                        column;

                    background:
                        #f5f7fa;

                    color:
                        #777;

                    font-size:
                        11px;
                }


                /* =================================================
                   TABLET
                ================================================= */

                @media (max-width: 1000px) {

                    .cards {
                        grid-template-columns:
                            repeat(2, 1fr);
                    }


                    .payment-details {
                        grid-template-columns:
                            repeat(2, 1fr);
                    }

                }


                /* =================================================
                   SMALL TABLET
                ================================================= */

                @media (max-width: 800px) {

                    .sidebar {
                        width:
                            190px;
                    }


                    .dashboard-main {
                        padding:
                            25px 20px;
                    }


                    .dashboard-header {
                        padding:
                            0 20px;
                    }

                }


                /* =================================================
                   MOBILE
                ================================================= */

                @media (max-width: 650px) {

                    .admin-dashboard {
                        flex-direction:
                            column;
                    }


                    .sidebar {
                        width:
                            100%;

                        min-height:
                            auto;

                        padding:
                            10px;

                        flex-direction:
                            row;

                        align-items:
                            center;

                        gap:
                            5px;

                        overflow-x:
                            auto;

                        border-right:
                            none;

                        border-bottom:
                            1px solid #e5e5e5;
                    }


                    .brand-section {
                        display:
                            none;
                    }


                    .sidebar-navigation {
                        flex-direction:
                            row;
                    }


                    .side-item {
                        width:
                            auto;

                        min-width:
                            max-content;

                        padding:
                            0 12px;
                    }


                    .sidebar-spacer {
                        display:
                            none;
                    }


                    .logout-button {
                        width:
                            auto;

                        min-width:
                            75px;

                        margin-left:
                            auto;
                    }


                    .dashboard-header {
                        min-height:
                            64px;

                        padding:
                            0 16px;
                    }


                    .dashboard-header h1 {
                        font-size:
                            17px;
                    }


                    .dashboard-header p {
                        font-size:
                            9px;
                    }


                    .admin-badge {
                        display:
                            none;
                    }


                    .dashboard-main {
                        padding:
                            20px 14px;
                    }


                    .cards {
                        grid-template-columns:
                            1fr;
                    }


                    .page-heading h2,
                    .payments-header h2 {
                        font-size:
                            21px;
                    }


                    .welcome-card {
                        flex-direction:
                            column;

                        align-items:
                            stretch;
                    }


                    .welcome-left {
                        align-items:
                            flex-start;
                    }


                    .primary-button {
                        width:
                            100%;
                    }


                    .payments-header {
                        align-items:
                            flex-start;
                    }


                    .payment-summary {
                        display:
                            none;
                    }


                    .payment-toolbar {
                        flex-direction:
                            column;

                        align-items:
                            stretch;
                    }


                    .back-button,
                    .refresh-button {
                        width:
                            100%;
                    }


                    .payment-details {
                        grid-template-columns:
                            1fr;

                        gap:
                            13px;
                    }


                    .payment-card-header {
                        flex-direction:
                            column;
                    }


                    .status-badge {
                        align-self:
                            flex-start;
                    }


                    .payment-actions {
                        flex-direction:
                            column;
                    }


                    .reject-button,
                    .verify-button {
                        width:
                            100%;
                    }


                    .proof-heading {
                        align-items:
                            flex-start;

                        flex-direction:
                            column;
                    }


                    .proof-file-name {
                        max-width:
                            100%;
                    }


                    .dashboard-footer {
                        padding:
                            14px;

                        flex-direction:
                            column;

                        gap:
                            5px;
                    }


                    .notification {
                        left:
                            14px;

                        right:
                            14px;

                        min-width:
                            0;
                    }


                    .confirm-modal {
                        padding:
                            22px;
                    }


                    .confirm-modal-actions {
                        flex-direction:
                            column;
                    }


                    .modal-cancel,
                    .modal-confirm {
                        width:
                            100%;
                    }

                }

            `}</style>

        </main>
    );
};

export default AdminDashboard;