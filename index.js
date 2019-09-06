// code away!
require('dotenv').config()

const express = require('express')
const postsRouter = require('./posts/postRouter')
const usersRouter = require('./users/userRouter')

const port = process.env.PORT

const server = express()
server.use(express.json())

server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})