const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')
const port = process.env.PORT || 5000


app.use(cors())

connectDB()

const app = express()

app.use(express.json()) // Middleware para permitir o uso de JSON no Express
app.use(express.urlencoded({extended:false}));

/*app.get('/api/tareas', (req, res) => {
    res.status(200).json({mensaje: 'Obtener Tareas'})
})*/

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))

