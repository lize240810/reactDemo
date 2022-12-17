import './demo02.scss'
import TestComponent from '../component/demo02/TestComponent'
import TestProps from '../component/demo02/TestProps'

export default function Demo02() {

    const persons = [
        {name: "张三", id: 1},
        {name: "李四", id: 2},
        {name: "王五", id: 3},
    ]

    return <div className='box'>
        <TestComponent></TestComponent>
        <hr/>
        <TestProps list={persons} />
    </div>
}

