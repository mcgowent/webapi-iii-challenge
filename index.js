// code away!
const express = require('express')
const postsRouter = require('./posts/postRouter')
const usersRouter = require('./users/userRouter')


const server = express()
server.use(express.json())

server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

server.listen(4000, () => {
    console.log("Server running on port 4000")
})

