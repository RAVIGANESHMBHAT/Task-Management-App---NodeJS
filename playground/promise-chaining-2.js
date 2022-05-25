require('../src/db/mongoose')
const Task = require('../src/models/Task')

// Task.findByIdAndDelete("62813efaff3fe63a6e0a817a").then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count;
}

deleteTaskAndCount("6282808b2fee6fedeb3e23d6").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
