import crypto from 'crypto'
import 'dotenv/config'
import dbConnection from '../config/db.js'
export default async function verifyPayment(req, res) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).send({
                success: false,
                message: "Missing required payment verification details."
            })
        }
        const verificationString = `${razorpay_order_id}|${razorpay_payment_id}`
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY).update(verificationString).digest("hex")
        const db = await dbConnection()
        if (razorpay_signature != expectedSignature) {
            await db.collection("transaction").updateOne({ razorpayOrderId: razorpay_order_id },
                {
                    $set: {
                        status: "failed",
                        razorpayPaymentId: razorpay_payment_id,
                        updatedAt: new Date()
                    }
                })
            return res.status(400).send({
                success: false,
                message: "Invalid payment signature"
            })
        }

        // Idempotency
        const payment = await db.collection("transaction").findOne({ razorpayOrderId: razorpay_order_id })
        if (!payment) {
            return res.status(404).send({
                success: false,
                message: "Payment verification could not be completed."
            })
        }
        if (payment.status === "success") {
            return res.status(200).send({
                success: true,
                message: "Payment already verified"
            })
        }

        //Update db after verification
        await db.collection("transaction").updateOne({ razorpayOrderId: razorpay_order_id },
            {
                $set: {
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    status: "success",
                    updatedAt: new Date()
                }
            })
        return res.status(200).send({
            success: true,
            message: "Payment verification success"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}