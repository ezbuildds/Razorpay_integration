
import dbConnection from "../config/db.js";
import razorpayInstence from "../config/razorpayInstence.js";
import { planData } from "../constant/planData.js";

export default async function createOrder(req, res) {
    try {
        const { planId } = req.body
        console.log("Plan Id :", planId);
        if (!planId) {
            return res.status(400).send({
                success: false,
                message: "Invalid"
            })
        }
        const planDetail = planData[planId]
        console.log("Plan Detail :", planDetail);
        if (!planDetail) {
            return res.status(400).send({
                success: false,
                message: "invalid plan selected"
            })
        }
        const options = {
            amount: Number(planDetail.price * 100),
            currency: 'INR',
            receipt: `#${Date.now()}`
        }

        const order = await razorpayInstence.orders.create(options)
        console.log("Razorpay Order :", order);
        if (!order) {
            return res.status.send({
                success: false,
                message: "Unable to create payment order"
            })
        }

        const db = await dbConnection()
        await db.collection("transaction").insertOne({
            razorpayOrderId: order.id,
            amount: order.amount / 100,
            status: "Pending",
            currency: order.currency,
            plan: planDetail.plan,
            credit: planDetail.credit,
            receipt: order.receipt,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return res.status(200).send({
            success: true,
            message: "Order created successfully",
            orderData: {
                amount: order.amount,
                razorpayOrderId: order.id
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "internal server error"
        })
    }

}