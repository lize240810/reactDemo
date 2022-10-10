import {Link, useParams, useSearchParams, useLocation} from "react-router-dom";
import React from "react";

export default function Detail() {

    /**
     * 获取pathUrl
     */
    let params = useParams();

    /**
     * 获取get传参参数
     */
    let [searchParams, setSearchParams] = useSearchParams();

    let location = useLocation();

    console.log(location)

    function handleChangeParams() {
        setSearchParams({id: Math.random().toString()})
    }


    return (
        <div>
            <div>
                <h3>path-----{params.id}</h3>
            </div>
            <div>
                <h3>get----{searchParams.get('id')}</h3>
            </div>
            <button onClick={handleChangeParams}>修改get</button>

            <Link to="../update"><button>跳到update</button></Link>
        </div>
    )
}