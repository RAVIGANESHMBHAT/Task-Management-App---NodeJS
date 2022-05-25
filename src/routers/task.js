const express = require('express')
const Task = require("../models/Task");
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth,  async (req, res) => {
    const userId = req.user._id
    try {
        //const tasks = await Task.find({ owner: userId })
        await req.user.populate('tasks')
        res.status(200).send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',  auth, async (req, res) => {
    const taskId = req.params.id
    const userId = req.user._id
    try {
        //const task = await Task.findById(taskId)
        const task = await Task.findOne({taskId, owner: userId})

        if(!task) {
            res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    const userId = req.user._id

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try {
        //const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: userId})

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        return res.status(200).send(task)
    } catch(e) {
       return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router
