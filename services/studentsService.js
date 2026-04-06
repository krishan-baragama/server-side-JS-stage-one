import Student from "../models/Student.js"

const getAll = () => Student.find()
const getById = (id) => Student.findById(id)
const create = (data) => Student.create(data)
const update = (id, data) => Student.findByIdAndUpdate(id, data, { new: true })
const remove = (id) => Student.findByIdAndDelete(id)

export { getAll, getById, create, update, remove }