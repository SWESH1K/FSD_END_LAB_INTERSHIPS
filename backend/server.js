import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import IntershipRouter from "./routes/internship.route.js"
import path from "path"

dotenv.config()
const inProduction = process.env.NODE_ENV == 'production'

const __dirname = path.resolve() // BASE_DIR
console.log(__dirname)

// express app
const app = express()
app.use(express.json())
app.use( '/api' ,IntershipRouter)

if (inProduction) {
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

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