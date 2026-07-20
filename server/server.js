import express from 'express'
import 'dotenv/config'
import dbConnection from './config/db.js'
const PORT = process.env.PORT || 8000

const app = express()

dbConnection()
app.get("/", async (req, res) => {
    let db = await dbConnection()
    let user = await db.collection("users").find().toArray()
    res.send(user)
})


app.listen(PORT, () => {
    console.log(`Server Running at Port ${PORT} ✅🚀`);

})