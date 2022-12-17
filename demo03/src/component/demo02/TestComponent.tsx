import React, {createRef} from "react";

class TestComponent extends React.Component {
    state = {
        age: 18,
        name: "张三",
        likes: [
            "rap"
        ],
    }

    inputRef = createRef()

    onChangeAge = () => {
        this.setState({
            age: 20,
            name: this.inputRef?.current?.value
        })
        this.setState({
            likes: [...this.state.likes, Math.random()]
        })
    }

    render() {
        return (
            <div>
                <p>this is {this.state.name}, you age {this.state.age}</p>
                <div>
                    like :
                    <ul>
                        {(this.state.likes.map(item => <li key={item}>{item}</li>))}
                    </ul>
                </div>
                <input type="text" ref={this.inputRef}/>
                <button onClick={this.onChangeAge}>修改</button>
            </div>
        )
    }
}

export default TestComponent;
