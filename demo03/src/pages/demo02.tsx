import './demo02.scss'

export default function Demo02() {

    function strList() {
        let _arr = []
        for (let i = 0; i < 5; i++) {
            _arr.push(<li key={i}>{i}</li>)
        }
        return _arr
    }

    return <div className='box'>
        Demo02<span>css</span>

        <ul>
            {strList()}
        </ul>
    </div>
}

