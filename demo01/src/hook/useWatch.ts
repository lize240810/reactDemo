import {useEffect, useRef} from 'react';

/**
 * 监听Hook
 * @param value 监听的数据
 * @param callback 监听回调
 * @param config 初次渲染是否执行
 */
export default function useWatch(value: any, callback: Function, config = {immediate: false}) {
    const oldValue = useRef();
    const isInit = useRef(false);
    const isWatch = useRef(true);

    useEffect(() => {
        if (!isWatch.current) return
        if (!isInit.current) {
            isInit.current = true;
            if (config.immediate) {
                callback(value, oldValue.current);
            }
        } else {
            callback(value, oldValue.current);
        }
        oldValue.current = value;
    }, [value])

    return function unwatch() {
        isWatch.current = false;
    };
}