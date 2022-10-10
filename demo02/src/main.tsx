import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";

/**
 * BrowserRouter：组件表示路由采用HTML5 History模式来跳转页面
 * HashRouter：采用 URL hash 值来跳转页面
 * @constructor
 */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)
