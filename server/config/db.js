import { MongoClient } from "mongodb";
import 'dotenv/config'

let client = new MongoClient(process.env.MONGO_URL)
let db
export default async function dbConnection() {
    if (!db) {
        await client.connect()
        db = client.db("razorpay")
        console.log("MongoDB Connected ✅ ");
    }
    return db
}

