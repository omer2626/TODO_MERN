import React, { useEffect, useState } from "react";
import Create from "./Create"
import './App.css'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs'
const Home = () => {
    const [todos, setTodos] = useState([]);
    const [flag, setFlag] = useState(false);
    const changeFlag = () =>{
        setFlag(!flag);
    }
    useEffect(() => {
        axios.get("https://my-todo-fejs.onrender.com/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [flag])
const handleEdit =(id)=>{
    axios.put("https://my-todo-fejs.onrender.com/update/" + id)
    .then(result => {
        // location.reload()
        changeFlag()
    })
    .catch(err => console.log(err))
}

const handleDelete = (id)=>{
    axios.delete('https://my-todo-fejs.onrender.com/delete/'+ id)
    .then(result => {
        // location.reload()
        changeFlag()
    })
    .catch(err => console.log(err))
}


    return (
        <>
            <article className="home">
                <h1> TODO LIST </h1>
                <Create changeFlag={changeFlag}></Create>
                {
                    todos.length === 0
                        ?
                        <div> <h2> No Record </h2></div>
                        :
                        todos.map(todo => (
                            <div className="task">
                                <div className="checkbox" onClick={() =>handleEdit(todo._id)}>
                                    {todo.done ?
                                        <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                                        : <BsCircleFill className="icon"></BsCircleFill>
                                    }
                                    {/* <BsCircleFill className='icon'></BsCircleFill> */}
                                    <p className={todo.done ? "line_through" : ""}> {todo.task} </p>
                                </div>
                                <div>
                                    <span><BsFillTrashFill className='icon' 
                                    onClick={()=>handleDelete(todo._id)}/></span>
                                </div>
                            </div>
                        ))
                }
            </article>
        </>
    )
}
export default Home;