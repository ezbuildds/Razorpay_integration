import { useNavigate } from "react-router-dom";
import { plans } from "../data/Plan";
import "../styles/Plan.css"
import { useState } from "react";
import Navbar from "./navbar/Navbar";


export default function Plans() {
    const [loader, setLoader] = useState(null)
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)

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





