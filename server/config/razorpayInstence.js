import Razorpay from 'razorpay'
import "dotenv/config"

const razorpayInstence = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})
export default razorpayInstence