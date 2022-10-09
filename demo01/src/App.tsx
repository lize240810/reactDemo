import Todo from './components/Todo'
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import {useState} from "react";
import {nanoid} from "nanoid";


const DATA = [
    {id: "todo-0", name: "Eat", completed: true},
    {id: "todo-1", name: "Sleep", completed: false},
    {id: "todo-2", name: "Repeat", completed: false}
];


function App() {
    const [tasks, setTasks] = useState(DATA);

    const taskList = tasks.map(task =>
        <Todo id={task.id} name={task.name} completed={task.completed} key={task.id}
              deleteTask={deleteTask}
        />
    )

    function addTask(name: string) {
        const newTask = {id: `todo-${nanoid()}`, name: name, completed: false};
        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: string) {
        setTasks(tasks.filter(task => id !== task.id));
    }


    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask}/>
            <div className="filters btn-group stack-exception">
                <FilterButton/>
            </div>
            <h2 id="list-heading">
                3 tasks remaining
            </h2>
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {taskList}
            </ul>
        </div>
    )
}

export default App
