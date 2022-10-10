import React, {useEffect, useRef, useState} from "react";

interface IProps {
    name: string
    completed: boolean
    id: string
    deleteTask: Function
    editTask: Function
}

/**
 * Custom Hook
 * */
function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


export default function Todo(props: IProps) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const wasEditing = usePrevious(isEditing);

    const editFieldRef = useRef<HTMLInputElement>(null)
    const editButtonRef = useRef<HTMLButtonElement>(null)

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        props.editTask(props.id, newName)
        setNewName("");
        setEditing(false);
    }
    /**
     * 会在组件渲染到屏幕之后执行
     */
    useEffect(() => {
        if (isEditing) editFieldRef.current?.focus();
        else editButtonRef.current?.focus();
        // 只希望在isEditing改变的时候触发
    }, [isEditing]);


    /*view*/

    const editingTemplate = (
        <form className="stack-small">
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input id={props.id} className="todo-text" type="text" value={newName} ref={editFieldRef}
                       onChange={(e) => setNewName(e.target.value)}/>
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit" onClick={handleSubmit}>
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input id={props.id} type="checkbox" defaultChecked={props.completed}/>
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setEditing(true)} ref={editButtonRef}>
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );


    return (
        <li className="todo stack-small">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    )
}