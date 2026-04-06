import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import studentRoutes from "./routes/students.js"
import authRoutes from "./routes/auth.js"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get("/", (req, res) => res.json({ msg: "API is running" }))
app.use("/api/students", studentRoutes)
app.use("/api/auth", authRoutes)

// Connect to MongoDB then start server
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
} catch (err) {
    console.error(err)
    process.exit(1)
}