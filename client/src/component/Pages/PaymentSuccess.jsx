import Navbar from "../navbar/Navbar";
import { CheckCircle2 } from "lucide-react";
import "../../styles/PaymentSuccess.css"
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
    return (
        <>
            <Navbar />
            <div className="success-page">
                <div className="success-card">

                    <div className="success-icon">
                        <CheckCircle2 size={55} />
                    </div>

                    <h1>Payment Successful</h1>

                    <p className="subtitle">
                        {/* Thank you for upgrading to <span>{transaction?.plan}</span> */}
                    </p>

                    <div className="payment-details">

                        <div className="detail">
                            <span>Plan</span>
                            {/* <strong>{transaction?.plan}</strong> */}
                        </div>

                        <div className="detail">
                            <span>Amount Paid</span>
                            {/* <strong>₹{transaction?.amount}</strong> */}
                        </div>

                        <div className="detail">
                            <span>Credits Added</span>
                            {/* <strong>{transaction?.credits}</strong> */}
                        </div>

                        {/* <div className="detail">
            <span>Current Balance</span>
            <strong>{payment.currentBalance} Credits</strong>
          </div> */}

                        <div className="detail">
                            <span>Payment ID</span>
                            {/* <strong>{transaction?.razorpayPaymentId}</strong> */}
                        </div>

                        <div className="detail">
                            <span>Status</span>
                            <strong className="status">
                                <span className="dot"></span>
                                {/* {transaction?.status} */}
                            </strong>
                        </div>

                        <div className="detail">
                            <span>Date</span>
                            {/* <strong> {new Date(transaction?.updatedAt).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "medium",
                            })}</strong> */}
                        </div>

                    </div>

                    <div className="buttons">
                        <Link to="/" className="primary-btn">
                            Start Creating
                        </Link>

                        {/* <Link to="/dashboard" className="secondary-btn">
            Go to Dashboard
          </Link> */}
                    </div>

                </div>
            </div>
        </>
    )
}