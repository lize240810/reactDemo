import emitter from '../../script/eventbus'

import React, {useEffect} from 'react';

function A() {
    const handleChange = (param1: string, param2: string) => {
        console.log(param1);
        console.log(param2);
    }
    useEffect(() => {
        emitter.on('chang', handleChange);
        return () => {
            emitter.off('chang', handleChange);
        }
    }, [])
    return (
        <div>A组件</div>
    )
}

export default A;