
interface IProps {
}


export default function FilterButton(props: IProps) {

    function onBtnClick() {
        alert("点击")
    }

    return (
        <button type="button" className="btn toggle-btn" aria-pressed="true" onClick={onBtnClick}>
            <span className="visually-hidden">Show </span>
            <span>all</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    )
}