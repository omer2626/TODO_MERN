import React, { useState } from "react";
import axios from "axios"



const Create=({changeFlag})=>{
    const [task, setTask] = useState()
    const handleAdd=()=>{
        axios.post("http://localhost:3002/add", {task:task})
        .then(result => {
            // location.reload()
            setTask("");
            changeFlag();
        })
        .catch(err => console.log(err))
    }
    return(
        <>
            <article className="create_form">
               <input type="text" name="task" value={task} placeholder="Enter Task " onChange={(e) => setTask(e.target.value)}/> 
               <button type="button" onClick={handleAdd}>Add</button>
            </article>
        </>
    )
}

export default Create;