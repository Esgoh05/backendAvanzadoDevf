const express = require('express')
const router = express.Router()

const {getTareas, createTareas, updateTareas, updateTareas, deleteTareas} = require('../controllers/tareasController')


router.route('/').get(getTareas).post(createTareas)
//router.get('/', getTreas)
//router.post('/', createTareas)

router.put('/:id', updateTareas)
router.delete('/:id', deleteTareas)

module.exports = router