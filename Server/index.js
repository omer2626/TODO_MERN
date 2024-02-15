const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require('./Models/Todo')


const app = express()
app.use(cors())
app.use(express.json()) //whenever we pass the data it converts to json format.

mongoose.connect("mongodb://127.0.0.1:27017/TodoApp")


//to fetch all the records

app.get('/get', (req,res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


// to add the data, post call
app.post('/add', (req,res) =>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

// to update all the records
app.put('/update/:id',(req,res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id : id}, {done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

// to delete the records

app.delete('/delete/:id', (req,res) =>{
    const{id} = req.params;
    TodoModel.findByIdAndDelete({_id: id}, {done:true})
    .then(result => res.json(result))
    .catch(err => res.json())
})


app.listen(3002, ()=>{
    console.log("server running on port 3002")
})