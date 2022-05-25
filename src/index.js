const express = require('express')

require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     // if(req.method === 'GET') {
//     //     res.send("Method not allowed")
//     // } else {
//     //     next()
//     // }
//     res.status(503).send("Site is under maintenance. No requests allowed.")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

const Task = require('./models/Task')
const User = require('./models/User')

const main = async () => {
    // const task = await Task.findById("62852cd725979f8ce3ae7c7a")
    // await task.populate('owner')
    // console.log(task.owner)

    const user = await User.findById('62852c05ebb962658f4ac463')
    await user?.populate('tasks')
    console.log(user?.tasks)
}
main()
