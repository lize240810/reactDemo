import {useWindowScroll} from "../hooks/useWindowScroll";
import './demo02.scss'
import {useLocalStorage} from "../hooks/useLocalStorage";


export default function demo02() {

    // 使用自定义hook
    const [y] = useWindowScroll()
    const [message, setMessage] = useLocalStorage('name', "")


    return (
        <>
            <div className="box">
                <div className="box-center">{y}-------------{message}</div>
                <button onClick={() => setMessage('张飞')}>修改message</button>
            </div>
        </>
    )
}
