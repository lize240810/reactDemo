import { useMemo, useState } from 'react'
import './App.css'


const Sub = (props: { isShow?: boolean }) => {
    console.log("sub组件")
    return <div>
        子组件{props.isShow}
    </div>
}

const BtnBox = (props: { count: number, setCount: Function }) => {
    console.log("btn组件")

    return <button onClick={() => props.setCount(props.count + 1)}>
        count is {props.count}
    </button>
}

function App() {
    console.log("App组件")
    const [count, setCount] = useState(0)

    const data = useMemo(() => {
        return count > 1
    }, [count])

    return <div className="App">
        <BtnBox count={count} setCount={setCount}/>
        <Sub isShow={data}/>
    </div>

}

export default App
