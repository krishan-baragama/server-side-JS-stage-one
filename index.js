import express from "express"
import cors from "cors"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// Needed to use __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load student data
const students = JSON.parse(readFileSync(join(__dirname, "students.json"), "utf-8"))

const app = express()
const port = 3000

// Middleware
// app.use(cors())
app.use(express.json())

// GET /
app.get("/", (req, res) => {
    res.json({ msg: "Hello World!" })
})

// GET /api/students
app.get("/api/students", (req, res) => {
    res.status(200).json(students)
})

// GET /api/students/:id
app.get("/api/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id))
    if (!student) return res.status(404).json({ error: "Student not found" })
    res.status(200).json(student)
})

// POST /api/students
app.post("/api/students", (req, res) => {
    const newStudent = req.body
    newStudent.id = students.length + 1
    students.push(newStudent)
    res.status(201).json(newStudent)
})

// PUT /api/students/:id
app.put("/api/students/:id", (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ error: "Student not found" })
    students[index] = { ...students[index], ...req.body }
    res.status(200).json(students[index])
})

// DELETE /api/students/:id
app.delete("/api/students/:id", (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ error: "Student not found" })
    const deleted = students.splice(index, 1)[0]
    res.status(200).json({ message: "Deleted", student: deleted })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})