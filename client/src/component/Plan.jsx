import { useNavigate } from "react-router-dom";
import { plans } from "../data/Plan";
import "../styles/Plan.css"
import { useState } from "react";
import Navbar from "./navbar/Navbar";


export default function Plans() {
    const [loader, setLoader] = useState(null)
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)
    async function handlePlan(amount, planId) {
        try {
            console.log("Plan Id :", planId);
            const res = await fetch("http://localhost:5000/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId })
            })
            const data = await res.json()
            console.log("Order Data :", data);

            const options = {
                key: data.key,
                amount: data.orderData.amount,
                currency: data.orderData.currency,
                name: 'zyvix.ai',
                description: 'Test Transaction',
                order_id: data.orderData.razorpayOrderId,
                handler: async function (res) {
                    console.log('Handler res :', res);
                    try {
                        const verification = await fetch("http://localhost:5000/verify-payment", {
                            method: 'POST',
                            headers: { "Content-Type": 'application/json' },
                            body: JSON.stringify(res)
                        })
                        const verificationRes = await verification.json()
                        console.log(verificationRes);

                        if (verificationRes.success) {
                            navigate(`/payment/success/${data.orderData.razorpayOrderId}`)
                        }

                    } catch (error) {
                        console.log(error);
                        navigate(`/payment/failed/${data.orderData.razorpayOrderId}`)
                    }
                },
                modal: {
                    ondismiss: async function () {
                        try {
                            const cancel = await fetch("http://localhost:5000/cancel-payment", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ razorpayOrderId: data.orderData.razorpayOrderId })
                            })
                            const cancelRes = await cancel.json()

                        } catch (error) {
                            console.log(error);
                            navigate(`/payment/failed/${data.orderData.razorpayOrderId}`)
                        }
                    }
                },
                prefill: {
                    name: 'Manu Patel',
                    email: 'ezbuildds@gmail.com',
                    contact: '8279966018'
                },
                theme: {
                    color: "green"
                },
            };
            setProcessing(true)
            const rzp = new Razorpay(options);
            rzp.on("payment.failed", async (res) => {
                try {
                    console.log("Failed event res :", res)
                    const failed = await fetch("http://localhost:5000/failed-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ razorpayOrderId: data.orderData.razorpayOrderId, error: res.error.description })
                    })
                    const failedRes = await failed.json()

                } catch (error) {
                    console.log(error);
                    navigate(`/payment/failed/${data.orderData.razorpayOrderId}`)
                }

            })
            rzp.open();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
            {processing ? (
                <div className="payment-processing">
                    <h2>Verifying Your Payment</h2>
                    <p>Please wait while we confirm your transaction...</p>
                </div>
            ) : (
                <section className="pricing-section">
                    <div className="pricing-header">
                        <h2>Choose Your Plan</h2>
                        <p>Simple pricing. Powerful AI tools.</p>
                    </div>

                    <div className="pricing-grid">
                        {plans.map((plan) => (
                            <div key={plan.id} className={`pricing-card ${plan.highlighted ? "highlight" : ""}`}>
                                {plan.highlighted && (
                                    <div className="popular-badge">
                                        ⭐ Most Popular
                                    </div>
                                )}

                                <h3>{plan.name}</h3>

                                <p className="tagline">{plan.tagline}</p>

                                <div className="price">
                                    ₹{plan.amount}
                                    <span>/month</span>
                                </div>

                                <button className="plan-btn" onClick={() => { handlePlan(plan.amount, plan.id) }}>
                                    {plan.amount === loader ? "loading..." : "Get Started"}
                                </button>

                                <ul>
                                    {plan.features.map((feature) => (
                                        <li key={feature}>✔ {feature}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}





