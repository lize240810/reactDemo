/**
 * hook的出现 就是不想用生命周期的概念也可以写出业务代码
 */
import {useEffect, useState} from "react";

export default function Demo01() {
    const [count, setCount] = useState(0)

    // 初始化的时候执行, 每次修改数据时也执行
    useEffect(() => {
        console.log(count)
    })

    // 添加一个空数组，只有初始化的时候执行
    useEffect(() => {
        console.log("只有初始化的时候执行", count)
    }, [])

    // 监听count 来改变
    useEffect(() => {
        console.log("只有修改count的时候才执行", count)
    }, [count])

    return (
        <>
            <button onClick={() => setCount(count + 1)}>修改{count}</button>
        </>
    )
}
