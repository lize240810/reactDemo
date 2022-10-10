import React, {useEffect, useRef, useState} from "react";

interface IProps {
    addTask: Function
}

export default function Form(props: IProps) {
    const [name, setName] = useState('');

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        props.addTask(name)
        setName("");
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    return (
        <form>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input type="text"
                   value={name}
                   id="new-todo-input"
                   className="input input__lg"
                   name="text"
                   autoComplete="off"
                   ref={editFieldRef}
                   onChange={handleChange}/>
            <button type="submit" className="btn btn__primary btn__lg" ref={editButtonRef} onClick={handleSubmit}>Add
            </button>
        </form>
    )
}