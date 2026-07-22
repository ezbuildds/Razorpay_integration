import dbConnection from "../config/db.js";

export default async function cancelPayment(req, res) {
    try {
        const { razorpayOrderId } = req.body
        console.log("ID Recieved in cancel api :", razorpayOrderId);
        if (!razorpayOrderId) {
            return res.status(400).send({
                success: false,
                message: "Invalid request. Order id is required."
            })
        }
        const db = await dbConnection()
        await db.collection("transaction").updateOne({ razorpayOrderId }, {
            $set: {
                status: "cancel",
                updatedAt: new Date()
            }
        })
        return res.status(200).send({
            success: true,
            message: "Payment cancellation processed successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}