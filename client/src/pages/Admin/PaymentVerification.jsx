import React, { useEffect, useState } from "react";
import "./PaymentVerification.css";

const API_BASE_URL = "http://localhost:5000";

const PaymentVerification = ({ onPendingCountChange }) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    const token = localStorage.getItem("adminToken");

    const getPaymentId = (payment) => {
        return payment?._id || payment?.id || payment?.paymentId;
    };

    /*
     * Converts different possible payment-proof paths
     * into a usable browser URL.
     */
    const getProofUrl = (payment) => {
        const proof =
            payment?.paymentProof ||
            payment?.paymentProofUrl ||
            payment?.receiptUrl ||
            payment?.proofImage ||
            payment?.proof ||
            payment?.receipt ||
            payment?.image;

        if (!proof) {
            return null;
        }

        // Already a complete URL
        if (
            proof.startsWith("http://") ||
            proof.startsWith("https://") ||
            proof.startsWith("data:")
        ) {
            return proof;
        }

        // If backend returns /uploads/...
        if (proof.startsWith("/")) {
            return `${API_BASE_URL}${proof}`;
        }

        // If backend returns uploads/...
        return `${API_BASE_URL}/${proof}`;
    };

    const loadPayments = async () => {
        try {
            setError("");
            setRefreshing(true);

            /*
             * IMPORTANT:
             * Keep this endpoint the same as the endpoint
             * that is already returning your payment records.
             */
            const response = await fetch(
                `${API_BASE_URL}/api/admin/payments/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const contentType =
                response.headers.get("content-type") || "";

            /*
             * Prevent:
             *
             * Unexpected token '<', "<!DOCTYPE..."
             *
             * when the backend sends an HTML error page.
             */
            if (!contentType.includes("application/json")) {
                const text = await response.text();

                console.error(
                    "Server returned non-JSON response:",
                    text
                );

                throw new Error(
                    "The server returned an invalid response. Check the payment API URL."
                );
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Unable to load payment submissions."
                );
            }

            const paymentList =
                Array.isArray(data)
                    ? data
                    : data.payments ||
                      data.data ||
                      data.submissions ||
                      [];

            setPayments(paymentList);

            if (onPendingCountChange) {
                onPendingCountChange(paymentList.length);
            }

        } catch (err) {
            console.error(
                "Payment loading error:",
                err
            );

            setPayments([]);

            setError(
                err.message ||
                "Unable to load payment submissions."
            );

        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (token) {
            loadPayments();
        } else {
            setLoading(false);
            setError("Admin session expired. Please login again.");
        }
    }, []);

    const openConfirmModal = (payment, action) => {
        setSelectedPayment(payment);
        setConfirmAction(action);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
        setSelectedPayment(null);
        setConfirmAction(null);
    };

    const handleVerifyPayment = async (payment) => {
        const paymentId = getPaymentId(payment);

        if (!paymentId) {
            alert("Payment ID is missing.");
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/admin/payments/${paymentId}/verify`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const contentType =
                response.headers.get("content-type") || "";

            if (!contentType.includes("application/json")) {
                throw new Error(
                    "The server returned an invalid response."
                );
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Unable to verify payment."
                );
            }

            setPayments((previous) =>
                previous.filter(
                    (item) =>
                        getPaymentId(item) !== paymentId
                )
            );

            if (onPendingCountChange) {
                setPayments((previous) => {
                    onPendingCountChange(previous.length);
                    return previous;
                });
            }

            closeConfirmModal();

        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                "Unable to verify payment."
            );

            closeConfirmModal();
        }
    };

    const handleRejectPayment = async (payment) => {
        const paymentId = getPaymentId(payment);

        if (!paymentId) {
            alert("Payment ID is missing.");
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/admin/payments/${paymentId}/reject`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const contentType =
                response.headers.get("content-type") || "";

            if (!contentType.includes("application/json")) {
                throw new Error(
                    "The server returned an invalid response."
                );
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Unable to reject payment."
                );
            }

            setPayments((previous) =>
                previous.filter(
                    (item) =>
                        getPaymentId(item) !== paymentId
                )
            );

            closeConfirmModal();

        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                "Unable to reject payment."
            );

            closeConfirmModal();
        }
    };

    const formatDate = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    };

    const formatAmount = (amount) => {
        if (
            amount === undefined ||
            amount === null ||
            amount === ""
        ) {
            return "—";
        }

        const number = Number(amount);

        if (Number.isNaN(number)) {
            return amount;
        }

        return `₱${number.toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        )}`;
    };

    if (loading) {
        return (
            <section className="payment-page">

                <div className="payment-page-header">
                    <div>
                        <h1>
                            Payment Verification
                        </h1>

                        <p>
                            Review and process customer
                            payment submissions.
                        </p>
                    </div>

                    <div className="pending-badge">
                        Loading...
                    </div>
                </div>

                <div className="payment-loading-card">
                    <div className="loading-spinner"></div>

                    <h3>
                        Loading Payments
                    </h3>

                    <p>
                        Please wait while we retrieve
                        payment submissions.
                    </p>
                </div>

            </section>
        );
    }

    return (
        <section className="payment-page">

            {/* HEADER */}
            <div className="payment-page-header">

                <div>
                    <h1>
                        Payment Verification
                    </h1>

                    <p>
                        Review and process customer
                        payment submissions.
                    </p>
                </div>

                <div className="pending-badge">
                    <span>
                        {payments.length}
                    </span>

                    Pending
                </div>

            </div>


            {/* ERROR */}
            {error && (
                <div className="payment-error">

                    <div className="error-icon">
                        !
                    </div>

                    <div>
                        <strong>
                            Unable to load payment submissions.
                        </strong>

                        <p>
                            {error}
                        </p>
                    </div>

                    <button
                        onClick={loadPayments}
                        className="error-refresh"
                    >
                        Try Again
                    </button>

                </div>
            )}


            {/* REFRESH */}
            <div className="payment-toolbar">

                <div>
                    <strong>
                        Pending Submissions
                    </strong>

                    <span>
                        {payments.length} payment
                        {payments.length !== 1
                            ? "s"
                            : ""} awaiting review
                    </span>
                </div>

                <button
                    className="refresh-button"
                    onClick={loadPayments}
                    disabled={refreshing}
                >
                    {refreshing
                        ? "Refreshing..."
                        : "↻ Refresh"}
                </button>

            </div>


            {/* EMPTY STATE */}
            {!error && payments.length === 0 && (
                <div className="empty-payment-card">

                    <div className="empty-icon">
                        ✓
                    </div>

                    <h2>
                        No Pending Payments
                    </h2>

                    <p>
                        There are currently no payment
                        submissions waiting for verification.
                    </p>

                </div>
            )}


            {/* PAYMENT LIST */}
            <div className="payment-list">

                {payments.map((payment) => {

                    const proofUrl =
                        getProofUrl(payment);

                    const paymentId =
                        getPaymentId(payment);

                    const bookingReference =
                        payment.bookingReference ||
                        payment.referenceNumber ||
                        payment.reference ||
                        "—";

                    const passenger =
                        payment.passengerName ||
                        payment.passenger ||
                        payment.fullName ||
                        payment.customerName ||
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
                        payment.bookingDate ||
                        payment.travelDate ||
                        payment.createdAt;

                    const time =
                        payment.time ||
                        payment.departureTime ||
                        "—";

                    const amount =
                        payment.requiredAmount ||
                        payment.amount ||
                        payment.totalAmount;

                    const paymentMethod =
                        payment.paymentMethod ||
                        payment.method ||
                        "—";

                    return (
                        <article
                            className="payment-card"
                            key={paymentId}
                        >

                            {/* CARD HEADER */}
                            <div className="payment-card-header">

                                <div>
                                    <span className="reference-label">
                                        BOOKING REFERENCE
                                    </span>

                                    <h2>
                                        {bookingReference}
                                    </h2>
                                </div>

                                <span className="status-badge">
                                    PENDING VERIFICATION
                                </span>

                            </div>


                            {/* INFORMATION */}
                            <div className="payment-info-grid">

                                <div className="payment-info">

                                    <span>
                                        Passenger
                                    </span>

                                    <strong>
                                        {passenger}
                                    </strong>

                                </div>


                                <div className="payment-info">

                                    <span>
                                        Route
                                    </span>

                                    <strong>
                                        {route}
                                    </strong>

                                </div>


                                <div className="payment-info">

                                    <span>
                                        Date
                                    </span>

                                    <strong>
                                        {formatDate(date)}
                                    </strong>

                                </div>


                                <div className="payment-info">

                                    <span>
                                        Time
                                    </span>

                                    <strong>
                                        {time}
                                    </strong>

                                </div>


                                <div className="payment-info">

                                    <span>
                                        Required Amount
                                    </span>

                                    <strong className="amount">
                                        {formatAmount(amount)}
                                    </strong>

                                </div>


                                <div className="payment-info">

                                    <span>
                                        Payment Method
                                    </span>

                                    <strong>
                                        {paymentMethod}
                                    </strong>

                                </div>

                            </div>


                            {/* PAYMENT PROOF */}
                            <div className="payment-proof-section">

                                <h3>
                                    Payment Proof
                                </h3>

                                {proofUrl ? (
                                    <a
                                        href={proofUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="proof-image-link"
                                    >
                                        <img
                                            src={proofUrl}
                                            alt="Payment Proof"
                                            className="proof-image"
                                            onError={(event) => {
                                                event.currentTarget.style.display =
                                                    "none";

                                                const parent =
                                                    event.currentTarget.parentElement;

                                                if (parent) {
                                                    parent.innerHTML =
                                                        `<div class="proof-error">
                                                            Payment proof could not be displayed.
                                                        </div>`;
                                                }
                                            }}
                                        />

                                        <span>
                                            Click to view full receipt
                                        </span>
                                    </a>
                                ) : (
                                    <div className="no-proof">
                                        No payment proof uploaded.
                                    </div>
                                )}

                            </div>


                            {/* ACTIONS */}
                            <div className="payment-actions">

                                <button
                                    className="reject-button"
                                    onClick={() =>
                                        openConfirmModal(
                                            payment,
                                            "reject"
                                        )
                                    }
                                >
                                    Reject Payment
                                </button>

                                <button
                                    className="verify-button"
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

                        </article>
                    );
                })}

            </div>


            {/* CONFIRMATION MODAL */}
            {showConfirmModal && (
                <div
                    className="modal-overlay"
                    onClick={closeConfirmModal}
                >

                    <div
                        className="confirm-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div
                            className={
                                confirmAction === "reject"
                                    ? "modal-icon danger"
                                    : "modal-icon success"
                            }
                        >
                            {confirmAction === "reject"
                                ? "!"
                                : "✓"}
                        </div>

                        <h2>
                            {confirmAction === "reject"
                                ? "Reject Payment?"
                                : "Verify Payment?"}
                        </h2>

                        <p>
                            {confirmAction === "reject"
                                ? "Are you sure you want to reject this payment? This action will cancel the customer's booking."
                                : "Are you sure you want to verify this payment? This will confirm the customer's booking."}
                        </p>

                        <div className="confirm-modal-actions">

                            <button
                                className="modal-cancel"
                                onClick={closeConfirmModal}
                            >
                                Cancel
                            </button>

                            <button
                                className={
                                    confirmAction === "reject"
                                        ? "modal-confirm danger"
                                        : "modal-confirm success"
                                }
                                onClick={() => {

                                    if (
                                        confirmAction ===
                                        "reject"
                                    ) {
                                        handleRejectPayment(
                                            selectedPayment
                                        );
                                    } else {
                                        handleVerifyPayment(
                                            selectedPayment
                                        );
                                    }

                                }}
                            >
                                {confirmAction === "reject"
                                    ? "Reject Payment"
                                    : "Verify Payment"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </section>
    );
};

export default PaymentVerification;