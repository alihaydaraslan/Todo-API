const todo = require("../models/todoModel")

const todoAdd = async(req, res) => {
    try {
        const _todo = await todo.findOne({name: req.body.name})

        if(_todo){
            return res.status(400).json({
                success: false,
                message: "There is an another record with same name"
            })
        }

        const todoAdd = new todo(req.body)
        
        await todoAdd.save()
            .then(() => {
                return res.status(201).json(todoAdd)
            })
            .catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: "Error when creating record: " + err
                })
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error when creating record: " + error
        })
    }
}

const todoGetAll = async(req, res) => {
    const {page} = req.query
    const limit = 2
    const skip = Number(page - 1) * limit

    try {
        const todoGetAll = await todo.find({}).limit(limit).skip(skip)

        return res.status(200).json({
            success: true,
            data: todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn't gather the records!" 
        })
    }
}

const todoUpdate = async(req, res) => {
    const {id} = req.params

    try {
        const todoUpdate = await todo.findByIdAndUpdate(id, req.body)
        if(todoUpdate){
            return res.status(200).json({
                success: true,
                message: "Updating is successful!"
            })
        }
        else return res.status(400).json({
            success: false,
            message: "Couldn't update the record!"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn't update the record!"
        })
    }
}

const todoDelete = async(req, res) => {
    const {id} = req.params

    try {
        const todoDelete = await todo.findByIdAndDelete(id)
        if(todoDelete){
            return res.status(200).json({
                success: true,
                message: "Successfully deleted!"
            })
        }
        else return res.status(400).json({
            success: false,
            message: "Couldn't delete the record"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn't delete the record! " + error
        })
    }
}

const todoGetbyId = async(req, res) => {
    const {id} = req.params

    try {
        const todoGetbyId = await todo.findById(id)
        
        return res.status(200).json(todoGetbyId)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn't find the record"
        })
    }
}

module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGetbyId
}