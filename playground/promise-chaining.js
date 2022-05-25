require('../src/db/mongoose')
const User = require('../src/models/User')

User.findByIdAndUpdate("628150feaa42bf8cf57cfc8c", { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age})
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount("628150feaa42bf8cf57cfc8c", 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
