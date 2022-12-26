import {useEffect, useState} from "react";

/**
 * 只要message 变化， 就自动同步到本地
 * @param key
 * @param defaultValue
 */
export function useLocalStorage(key: string, defaultValue: string) {
    const [message, setMessage] = useState(defaultValue)
    useEffect(() => {
        window.localStorage.setItem(key, message)
    }, [message, key])

    return [message, setMessage]
}
