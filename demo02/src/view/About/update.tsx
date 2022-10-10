import {useNavigate} from "react-router-dom";


export default function Update() {
    let navigate = useNavigate();

    function handleClick() {
        navigate("/home");
    }

    return (
        <div>
            <h1>Update</h1>
            <button onClick={handleClick}>回到首页</button>
            <button onClick={()=>navigate(-1)}>返回上一页</button>
        </div>
    )
}