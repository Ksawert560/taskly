import React, { useEffect, useState } from "react";
import CreateNewTask from "./createNewTask";


let filteredArray = []
let isFiltered = false

export function handleInputClick(event){
    const taskName = event.target.name;
    let taskList = [];
    if(localStorage.getItem('currentTasks')) taskList=JSON.parse(localStorage.getItem('currentTasks'));
    filteredArray = taskList.filter(task=>task!==taskName);
    localStorage.setItem('currentTasks', JSON.stringify(filteredArray));
    isFiltered=true;
    window.location.reload();
}


function App(){
    let storedItems = []
    if(isFiltered===true) storedItems=filteredArray;
    else if(localStorage.getItem('currentTasks')) storedItems=JSON.parse(localStorage.getItem('currentTasks'));;
    const [tasks, setTasks] = useState(storedItems);
    const [newTask, setNewTask] = useState('')
    let tasksDiv = [];

    function handleChange(event){
        setNewTask(event.target.value);

    }
    function handleSubmit(event){
        setTasks([
            ...tasks,
            newTask
        ]);
        event.preventDefault();
    }
    let number=0;
    tasks.forEach(task=>{
        tasksDiv.push(<CreateNewTask id={`task${number}`} inputName={task} task={task}/>)
        number++;
    })

    useEffect(()=>{
        localStorage.setItem('currentTasks', JSON.stringify(tasks));
    }, [tasks])

    function toggleClass(x){
        let btn = document.getElementById('newTaskDiv');
        if(x===1) btn.classList.toggle('clicked');

    }
    
    function handleClick(event){
        if(event.target.className==='btn' || event.target.id==='newTaskDiv') toggleClass(1)
        else toggleClass(0)
    }
    return (
        <div className="container">
            <h1>taskly.</h1>
            <hr></hr>
            <div className="taskList">
                <div className="btn newTaskDiv" id="newTaskDiv" onClick={handleClick} name='newTaskDiv'>
                    <p className='btn'>Create new task</p>
                    <form onSubmit={handleSubmit}>
                        <input type='text' name="task" onChange={handleChange} value={newTask} onClick={handleClick}></input>
                    </form>
                </div>            
                {tasksDiv}
            </div>
        </div>
    )
}

export default App;