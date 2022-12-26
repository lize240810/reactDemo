import {useEffect, useState} from "react";

/**
 * 消除副作用，组件在被销毁时，有一些副作用需要销毁（定时器关闭）
 * useEffect 返回一个方法，
 * @constructor
 */
function Test() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(count + 1)
            console.log(count)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
     })

    return <>
        <div>test组件</div>
        <div>{count}</div>
    </>
}

export default function demo03() {
    const [bool, setBool] = useState(false)
    return (
        <>
            demo03
            {bool ? <Test/> : null}
            <button onClick={() => setBool(!bool)}>{bool ? '隐藏' : '显示'}</button>
        </>
    )

}
