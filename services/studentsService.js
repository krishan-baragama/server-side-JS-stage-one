const students = require('../students.json');

const getAll = () => students;

const getById = (id) => students.find(s => s.id === parseInt(id));

const create = (newStudent) => {
  newStudent.id = students.length + 1;
  students.push(newStudent);
  return newStudent;
};

const update = (id, data) => {
  const index = students.findIndex(s => s.id === parseInt(id));
  if (index === -1) return null;
  students[index] = { ...students[index], ...data };
  return students[index];
};

const remove = (id) => {
  const index = students.findIndex(s => s.id === parseInt(id));
  if (index === -1) return null;
  return students.splice(index, 1)[0];
};

module.exports = { getAll, getById, create, update, remove };