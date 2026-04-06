import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    major: { type: String, required: true },
    gpa: { type: Number }
})

export default mongoose.model("Student", studentSchema)

