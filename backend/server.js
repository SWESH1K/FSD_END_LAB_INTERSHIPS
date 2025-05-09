import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import IntershipRouter from "./routes/internship.route.js"

dotenv.config()

// express app
const app=express()
app.use(express.json())
app.use(IntershipRouter)


//listen for requests
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
console.log("Connected to MongoDB!")
app.listen(process.env.PORT, () => {
console.log('listening on port', process.env.PORT)
})
})
.catch((error) => {
console.log(error)
})