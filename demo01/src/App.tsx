import Todo from './components/Todo'
import Form from "./components/Form";
import A from "./components/bus-test/A";
import B from "./components/bus-test/B";
import FilterButton from "./components/FilterButton";
import {useState} from "react";
import {nanoid} from "nanoid";
import useWatch from "./hook/useWatch";


const DATA = [
    {id: "todo-0", name: "Eat", completed: true},
    {id: "todo-1", name: "Sleep", completed: false},
    {id: "todo-2", name: "Repeat", completed: false}
];

interface ITask {
    id: string
    name: string
    completed: boolean
}

const FILTER_MAP = {
    All: () => true,
    Active: (task: ITask) => !task.completed,
    Completed: (task: ITask) => task.completed
};


function App() {
    const [tasks, setTasks] = useState(DATA);
    const [filter, setFilter] = useState('All')
    const taskList = tasks.filter(FILTER_MAP[filter as keyof typeof FILTER_MAP]).map(task =>
        <Todo id={task.id} name={task.name} completed={task.completed} key={task.id}
              deleteTask={deleteTask} editTask={editTask}/>
    )

    function addTask(name: string) {
        setTasks([...tasks, {id: `todo-${nanoid()}`, name, completed: false}]);
    }

    function deleteTask(id: string) {
        setTasks(tasks.filter(task => id !== task.id));
    }

    function editTask(id: string, name: string) {
        setTasks(tasks.map(task => id === task.id ? {...task, name} : task));
    }

    const filterList = Object.keys(FILTER_MAP).map(name => (
        <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter}/>
    ));

    useWatch(filter, (value: any, oldValue: any) => {
        console.log("value", value);
        console.log("oldValue", oldValue)
    }, {immediate: false})

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask}/>
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">
                3 tasks remaining
            </h2>
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {taskList}
            </ul>
            <A></A>
            <B></B>
        </div>
    )
}

export default App
