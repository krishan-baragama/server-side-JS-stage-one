const studentsService = require('../services/studentsService');

const getAll = (req, res) => {
  res.status(200).json(studentsService.getAll());
};

const getById = (req, res) => {
  const student = studentsService.getById(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.status(200).json(student);
};

const create = (req, res) => {
  const student = studentsService.create(req.body);
  res.status(201).json(student);
};

const update = (req, res) => {
  const student = studentsService.update(req.params.id, req.body);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.status(200).json(student);
};

const remove = (req, res) => {
  const student = studentsService.remove(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.status(200).json({ message: 'Deleted', student });
};

module.exports = { getAll, getById, create, update, remove };