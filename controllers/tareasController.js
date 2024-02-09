const asyncHandler = require('express-async-handler')
//asyncHandler es como un wraper(envuelve la funcion para realizar accion de try catch)
const Tarea = require('../models/tareasModel')

const getTareas = asyncHandler( async(req, res) => {
    const tareas = await Tarea.find({user: req.user.id})

    //res.status(200).json({mensaje: 'Obtener Tareas'})
    res.status(200).json(tareas)
})

const createTareas = asyncHandler( async(req, res) => {
    //console.log(req.body);

    if(!req.body.descripcion){
        res.status(400)//.json({message: 'Por favor teclea una descripcion'})
        throw new Error('Por favor teclea una descripcion')
    }

    const tarea = await Tarea.create({
        descripcion: req.body.descripcion,
        user: req.user.id
    })

    //res.status(200).json({mensaje: 'Crea Tareas'})
    res.status(201).json(tarea)
})

const updateTareas = asyncHandler( async(req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if(!Tarea){
        res.status(404)
        throw new Error('Esa tarea no existe')
    }

    //nos aseguramos que la tarea pertenezca al usuario logeado, es decir al token
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else{
        
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})


        //res.status(200).json({mensaje: `Modificar la tarea con id: ${req.params.id}`})
        res.status(200).json(tareaUpdated)
    }

})

const deleteTareas = asyncHandler( async(req, res) => { //borrado logico
    const tarea = await Tarea.findById(req.params.id)

    if(!Tarea){
        res.status(404)
        throw new Error('Esa tarea no existe')
    }

    //nos aseguramos que la tarea pertenezca al usuario logeado, es decir al token
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else{
        await Tarea.deleteOne(tarea)
        //const tareaDeleted = await Tarea.findByIdAndDelete(req.params.id)

        res.status(200).json({id: req.params.id})
    }

})

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}