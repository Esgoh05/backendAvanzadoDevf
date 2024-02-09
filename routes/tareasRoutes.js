const express = require('express')
const router = express.Router()

const {getTareas, createTareas, updateTareas, deleteTareas} = require('../controllers/tareasController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getTareas).post(protect, createTareas)
//router.get('/', protect, getTreas)
//router.post('/', protect, createTareas)

router.route('/:id').put(protect, updateTareas).delete(protect, deleteTareas)
//router.put('/:id', updateTareas)
//router.delete('/:id', deleteTareas)

module.exports = router