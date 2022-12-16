/*
 React 框架的核心包
 ReactDOM 专门做渲染相关的包
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App/>
    // 严格模式节点
    // <React.StrictMode>
    // </React.StrictMode>,
)
