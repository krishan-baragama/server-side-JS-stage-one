const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.get('/students', studentsController.getAll);
router.get('/students/:id', studentsController.getById);
router.post('/students', studentsController.create);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.remove);

module.exports = router;