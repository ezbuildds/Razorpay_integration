export default async function failedPayment(req, res) {
    const { razorpayOrderId, error } = req.body
    console.log("ID :", razorpayOrderId);
    console.log("Error :", error);
    return res.status(200).send({
        success: true,
        message: "Payment failed processed successfully."
    })
}