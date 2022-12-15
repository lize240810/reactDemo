import Welcome from '../component/demo01/Welcome'
import Clock from '../component/demo01/Clock'

function onAlert(){
    alert("测试")
}

export function Demo01() {
    return <div>
        <Welcome name="第一额" onAlert={onAlert}/>
        <Welcome name="第二个"/>
        <Clock firstName="xuai"></Clock>
    </div>
}
