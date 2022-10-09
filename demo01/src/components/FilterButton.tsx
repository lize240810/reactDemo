
interface IProps {
    name: string
    isPressed: boolean
    setFilter: Function
}


export default function FilterButton(props: IProps) {

    function onBtnClick() {
        props.setFilter(props.name)
    }

    return (
        <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={onBtnClick}>
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    )
}