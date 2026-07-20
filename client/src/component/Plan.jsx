import { useNavigate } from "react-router-dom";
import { plans } from "../data/Plan";
import "../styles/Plan.css"
import { useState } from "react";
import Navbar from "./navbar/Navbar";


export default function Plans() {
    const [loader, setLoader] = useState(null)
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)

    async function handlePlans(amount, id) {
        try {
            setLoader(amount)
            const res = await fetch("http://localhost:8000/api/payment/create-order", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            let data = await res.json()
            console.log(data)
            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: data.order.currency,
                name: 'zyvix.ai',
                description: 'Zyvix.ai Test Transaction',
                order_id: data.order.id,
                handler: async function (res) {
                    console.log("Responce of handler :", res)

                    try {
                        const verify = await fetch("http://localhost:8000/api/payment/verify-payment", {
                            method: "post",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify(res)
                        })
                        let result = await verify.json()
                        console.log("Verify Result :", result)
                        if (result.success) {
                            setTimeout(() => {
                                navigate(`/payment/success/${data.order.id}`, { replace: true })
                            }, 2000);
                        }
                    } catch (error) {
                        console.log(error.message)
                        navigate(`/payment/failed/${data.order.id}`)
                    }

                },
                modal: {
                    ondismiss:
                        async function () {
                            try {
                                let cancel = await fetch("http://localhost:8000/api/payment/cancel", {
                                    method: "post",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ razorpayOrderId: data.order.id })
                                })
                                cancel = await cancel.json()
                                console.log(cancel);
                            } catch (error) {
                                console.log(error);
                            }
                            navigate(`/payment/cancel/${data.order.id}`)
                        }
                },
                prefill: {
                    name: 'Manu Patel',
                    email: 'ezbuildds@gmail.com',
                    contact: '8279966018'
                },
                theme: {
                    // color: '#F37254'
                    color: 'green'
                },
            };
            setProcessing(true)
            const rzp = new window.Razorpay(options)
            rzp.on("payment.failed", async function (res) {
                console.log("Failed Event Responce :", res);
                try {
                    let failed = await fetch("http://localhost:8000/api/payment/failed", {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpayOrderId: data.order.id,
                            error: res.error.description
                        })
                    })
                    failed = await failed.json()
                    console.log("failed res :", failed);
                } catch (error) {
                    console.log(error);
                }
                setTimeout(() => {
                    window.location.href = `/payment/failed/${data.order.id}`
                }, 1000);

            })
            rzp.open();

        } catch (error) {
            console.log(error.message);
        } finally {
            setLoader(null)
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

                                <button className="plan-btn" onClick={() => { handlePlans(plan.amount, plan.id) }}>
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





