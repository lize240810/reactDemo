import {useState} from "react";

/**
 * 在滚动的时候不断去取值 然后交给y
 * @constructor
 */
export function useWindowScroll() {
    const [y, setY] = useState(0)
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollTop
        setY(h)
    })

    return [y]
}
