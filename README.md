# React

- react 18
- react-router-dom 6
- vite 3
- node 16
- typeScript 14

## 创建项目
```shell
pnpm create vite demo05 --template react-ts
```

----
### demo01
- react 简单使用
- 组件创建
- 基础Hook使用
- 组件通信
- 自定义监听Hook

### demo02
- react-router 使用
- 路由页面组件进行懒加载
- 路由嵌套
- 路由通配
- 获取路由参数

### demo03 
- 函数式组件与类组件
- 生命周期
- 组件样式

### demo04 
- react Native 搭建

### demo05
- 使用组件库 **antd**


### demo06
- hook（让函数组件拥有自己的状态） 使用
- 自定义hook
- useEffect
  - 不加依赖项， 初始化+重新渲染
  - 加[], 初始化时执行一次
  - 加特定依赖项 **【coubt】** ，首次执行+只有特定依赖项中的数据变化时才执行
