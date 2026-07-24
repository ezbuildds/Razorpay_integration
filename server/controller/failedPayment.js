import { Long } from "mongodb";
import dbConnection from "../config/db.js";

export default async function failedPayment(req, res) {
    try {
        const { razorpayOrderId, error } = req.body
        console.log("ID :", razorpayOrderId);
        console.log("Error :", error);
        if (!razorpayOrderId || !error) {
            return res.status(400).send({
                success: false,
                message: "Invalid request."
            })
        }
        const db = await dbConnection()
        await db.collection("transaction").updateOne({ razorpayOrderId }, {
            $set: {
                status: "failed",
                updateAt: new Date()
            }
        })
        return res.status(200).send({
            success: false,
            message: "Payment failed."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: false,
            message: "Internal server error"
        })

    }

}