import {useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Button} from 'antd';
import Demo01 from './pages/demo01'


function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <Demo01></Demo01>
        </div>
    )
}

export default App
