const express = require('express')
const projectsRouter = require('./routes/projects')
const tasksRouter = require('./routes/tasks')

const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    const started_at = new Date()

    res.on('finish', ()=>{
        console.log(`${started_at.toISOString()} - ${req.method} ${req.originalURL}`)
    })

    next()
})

app.get('/api', (req,res)=>{
    res.json({message: "service is healthy" })
})

app.use('/api/projects',projectsRouter)
app.use('/api/tasks',tasksRouter)

app.use((req,res)=>{
    res.status(404).json({error: `Ошибка, маршрут ${req.originalURL} не найден`})
})

app.use((err,req,res,next)=>{
    console.error(err)
    res.status(500).json({error: `Внутренняя ошибка сервера`})
})

module.exports = app