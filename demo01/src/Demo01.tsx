export default function demo01() {

    function pushMsg() {
        alert("提娜")
        window?.ReactNativeWebView?.postMessage('*---!' + Math.random().toFixed(3));
    }

    return <div>
        <video id="video"></video>
        <div style={{ display: "flex" }}>
            <h1>H5测试页</h1>
            <button onClick={pushMsg}
                    style={{ borderWidth: 1, borderStyle: 'solid', width: 100, height: 100 }}>消息传递
            </button>

            <button onClick={() => {
                window.push && window.push()
            }}
                    style={{ borderWidth: 1, borderStyle: 'solid', width: 100, height: 100 }}>camera
            </button>
        </div>
    </div>
}
