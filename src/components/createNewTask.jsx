import React from "react";
import { handleInputClick } from "./App";


function CreateNewTask(props){

    return(
        <div className="task">
            <input type="checkbox" name={props.inputName} onClick={handleInputClick}></input>
            <p id={props.id}>{props.task}</p>
        </div>
    )
}

export default CreateNewTask;