const express = require('express')
const { addToQueue } = require('./queue/queue')
const { createBullBoard } = require('bull-board')
const { BullMQAdapter } = require('bull-board/bullMQAdapter')
const { Queue } = require('bullmq')
const { postQueue } = require('./config/queue')
require('dotenv').config()


const app = express()
app.use(express.json())

app.post('/post', async (req, res) => {
    const { platform, content } = req.body
    await addToQueue(platform, content)
    res.send('Job adicionado à fila.')
})

const { router } = createBullBoard([
    new BullMQAdapter(postQueue),
])

app.use('/admin/queues', router)

app.listen(3000, () => {
    console.log('API rodando na porta 3000')
    console.log('Bull Board running at http://localhost:3000/admin/queues')
})
