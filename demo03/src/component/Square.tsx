import React from "react";

/**
 * 函数式组件
 * @param props
 * @constructor
 */
function Square(props: {
    value: string,
    onClick: Function
}) {
    // 构造函数
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}


export default Square;
