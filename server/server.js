import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dbConnection from './config/db.js'
import createOrder from './controller/createOrder.js'
const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(express.json())

dbConnection()
app.get("/", async (req, res) => {
    let db = await dbConnection()
    let user = await db.collection("users").find().toArray()
    res.send(user)
})

// Razorpay Payment Api

app.post("/create-order", createOrder)


app.listen(PORT, () => {
    console.log(`Server Running at Port ${PORT} ✅🚀`);

})