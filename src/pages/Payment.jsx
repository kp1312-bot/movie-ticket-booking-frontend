import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import styles from "./Payment.module.css";

function Payment() {

    const location = useLocation();
    const navigate = useNavigate();

    const {
        showId,
        seatIds = [],
        seatNames = [],
        amount = 0
    } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const [upiId, setUpiId] = useState("");

    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Merchant UPI ID
    const merchantUpiId = "9370871312@axl";

    // QR Code
    const qrValue =
        `upi://pay?pa=${merchantUpiId}` +
        `&pn=Movie%20Ticket%20Booking` +
        `&am=${amount}` +
        `&cu=INR`;

    // =========================
    // PAYMENT + BOOKING
    // =========================

    const handlePayment = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        // Check seats
        if (seatIds.length === 0) {
            setError("No seats selected.");
            return;
        }

        // Check UPI
        if (paymentMethod === "UPI") {

            if (!upiId.trim()) {
                setError("Please enter your UPI ID.");
                return;
            }
        }

        // Check Card
        if (paymentMethod === "CARD") {

            if (
                !cardNumber.trim() ||
                !expiryDate.trim() ||
                !cvv.trim()
            ) {
                setError("Please enter all card details.");
                return;
            }
        }

        // Get login token
        const token = localStorage.getItem("access");

        if (!token) {
            setError("Please login before making payment.");
            return;
        }

        setLoading(true);

        try {

            // =========================
            // 1. PAYMENT
            // =========================

            const paymentResponse = await axios.post(

                "http://127.0.0.1:8000/api/payment/",

                {
                    amount: amount,
                    payment_method: paymentMethod
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            console.log(
                "PAYMENT RESPONSE:",
                paymentResponse.data
            );


            // =========================
            // 2. CREATE BOOKING
            // =========================

            const bookingResponse = await axios.post(

                "http://127.0.0.1:8000/api/bookings/",

                {
                    show: showId,
                    seats: seatIds
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            console.log(
                "BOOKING RESPONSE:",
                bookingResponse.data
            );


            const bookingData = bookingResponse.data;


            // =========================
            // CHECK BOOKING ID
            // =========================

            if (!bookingData.booking_id) {

                setError(
                    "Booking created but Booking ID was not received."
                );

                return;
            }


            // =========================
            // SUCCESS
            // =========================

            setMessage(
                "Payment and Booking successful!"
            );


            // =========================
            // GO TO CONFIRMATION
            // =========================

            setTimeout(() => {

                navigate(
                    "/booking-confirmation",
                    {
                        state: {

                            paymentSuccess: true,

                            // Booking
                            booking_id:
                                bookingData.booking_id,

                            // Movie
                            movie_id:
                                bookingData.movie_id,

                            movie_title:
                                bookingData.movie_title,

                            // Show
                            showId:
                                bookingData.show_id,

                            show_date:
                                bookingData.show_date,

                            show_time:
                                bookingData.show_time,

                            screen:
                                bookingData.screen,

                            // Seats
                            seatIds:
                                seatIds,

                            seatNames:
                                bookingData.seats,

                            // Price
                            ticket_price:
                                bookingData.ticket_price,

                            total_amount:
                                bookingData.total_amount,

                            // Payment
                            paymentMethod:
                                paymentMethod,

                            transactionId:
                                paymentResponse
                                    .data
                                    ?.payment
                                    ?.transaction_id,

                            // Status
                            status:
                                bookingData.status

                        }
                    }
                );

            }, 1000);

        }

        catch (err) {

            console.log(
                "PAYMENT / BOOKING ERROR:",
                err.response?.data
            );


            // Login error
            if (err.response?.status === 401) {

                setError(
                    "Please login again before making payment."
                );

            }

            // Other error
            else {

                setError(

                    err.response?.data?.error ||

                    "Payment or Booking failed. Please try again."

                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    // =========================
    // TEST PAYMENT FAILED
    // =========================

    const paymentFailed = () => {

        setMessage("");

        setError(
            "❌ Payment Failed. Please try again."
        );

    };


    return (

        <div className={styles.page}>

            <div className={styles.container}>

                <h1 className={styles.title}>
                    🎬 Movie Ticket Payment
                </h1>


                {/* =========================
                    BOOKING SUMMARY
                ========================= */}

                <div
                    className={`${styles.card} ${styles.summary}`}
                >

                    <h2>
                        Booking Summary
                    </h2>

                    <p>
                        Show ID : {showId}
                    </p>

                    <p>
                        Selected Seats :{" "}
                        {seatNames.join(", ")}
                    </p>

                    <h2 className={styles.amount}>
                        Total Amount : ₹{amount}
                    </h2>

                </div>


                {/* =========================
                    PAYMENT CARD
                ========================= */}

                <div className={styles.card}>

                    <h2>
                        Select Payment Method
                    </h2>


                    {/* PAYMENT METHODS */}

                    <div className={styles.paymentMethods}>

                        <label
                            className={styles.radioLabel}
                        >

                            <input
                                type="radio"
                                value="UPI"
                                checked={
                                    paymentMethod === "UPI"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            UPI

                        </label>


                        <label
                            className={styles.radioLabel}
                        >

                            <input
                                type="radio"
                                value="CARD"
                                checked={
                                    paymentMethod === "CARD"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            Card

                        </label>

                    </div>


                    {/* =========================
                        UPI PAYMENT
                    ========================= */}

                    {paymentMethod === "UPI" && (

                        <div
                            className={styles.paymentBox}
                        >

                            <h3>
                                Scan QR Code to Pay
                            </h3>

                            <p>
                                Scan using Google Pay,
                                PhonePe or another UPI app.
                            </p>


                            <div
                                className={styles.qrBox}
                            >

                                <QRCodeCanvas
                                    value={qrValue}
                                    size={220}
                                    level="H"
                                />

                            </div>


                            <h3>
                                Pay ₹{amount}
                            </h3>


                            <p
                                className={
                                    styles.merchantUpi
                                }
                            >

                                UPI ID:{" "}

                                <strong>
                                    {merchantUpiId}
                                </strong>

                            </p>


                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Enter your UPI ID"
                                value={upiId}
                                onChange={(e) =>
                                    setUpiId(
                                        e.target.value
                                    )
                                }
                            />


                            <br />


                            <button
                                className={
                                    styles.payButton
                                }
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Processing..."
                                    : "I Have Paid"
                                }

                            </button>

                        </div>

                    )}


                    {/* =========================
                        CARD PAYMENT
                    ========================= */}

                    {paymentMethod === "CARD" && (

                        <div
                            className={styles.paymentBox}
                        >

                            <h3>
                                Card Payment
                            </h3>


                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Card Number"
                                maxLength="19"
                                value={cardNumber}
                                onChange={(e) =>
                                    setCardNumber(
                                        e.target.value
                                    )
                                }
                            />


                            <br />


                            <input
                                className={styles.input}
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) =>
                                    setExpiryDate(
                                        e.target.value
                                    )
                                }
                            />


                            <br />


                            <input
                                className={styles.input}
                                type="password"
                                placeholder="CVV"
                                maxLength="3"
                                value={cvv}
                                onChange={(e) =>
                                    setCvv(
                                        e.target.value
                                    )
                                }
                            />


                            <br />


                            <button
                                className={
                                    styles.payButton
                                }
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Processing..."
                                    : `Pay ₹${amount}`
                                }

                            </button>

                        </div>

                    )}


                    {/* =========================
                        TEST PAYMENT FAILED
                    ========================= */}

                    <button
                        className={
                            styles.failedButton
                        }
                        type="button"
                        onClick={paymentFailed}
                    >
                        Test Payment Failed
                    </button>


                    {/* =========================
                        ERROR
                    ========================= */}

                    {error && (

                        <p
                            className={
                                styles.error
                            }
                        >

                            {error}

                        </p>

                    )}


                    {/* =========================
                        SUCCESS
                    ========================= */}

                    {message && (

                        <p
                            className={
                                styles.success
                            }
                        >

                            {message}

                        </p>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Payment;