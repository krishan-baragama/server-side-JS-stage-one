import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashedPassword })
        res.status(201).json({ message: "User created" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ error: "User not found" })

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ error: "Wrong password" })

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router