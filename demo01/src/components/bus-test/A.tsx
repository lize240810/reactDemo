import React from 'react';
import emitter from '../../script/eventbus'

const B = () => {
    const handleChange = () => {
        emitter.emit('chang', '参数1', '参数2')
    }
    return (
        <div onClick={handleChange}>B组件</div>
    )
}
export default B;