import React from "react";

export default class Demo03 extends React.Component {

    constructor(props: any) {
        super(props)
        console.log("constructor")
    }

    timer: number | undefined = undefined

    state = {
        name: "State - demo03"
    }


    changeName = () => {
        this.setState({
            name: "after state"
        })
    }

    render() {
        console.log("render")
        return <div className='box'>
            {this.state.name}
            <button onClick={this.changeName}> 点击</button>
        </div>
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            console.log(new Date().toLocaleTimeString())
        }, 1000)
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        console.log("componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")

        clearInterval(this.timer)
    }
}

