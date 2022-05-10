import React  from "react";
import './TodoCard.css'
import checkIcon from '../../assets/images/icon-check.svg';



const TodoCard = ({ todo, completed, completedClicked, id }) => (
  <>
    <li className="todoItem">
      <button onClick={() => completedClicked(id)} className={completed ? 'todoCompleted' : 'todoInProgress'}>
  
      {completed && <img alt="icon" src={checkIcon}/> }
      </button>
    {todo && <h1 className={completed ? 'todoCompleted_text' : ''}>{todo}</h1>}
    </li>
    
  </>
);

export default TodoCard