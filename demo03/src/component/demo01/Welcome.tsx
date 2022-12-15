interface WelcomeProps {
    name: string
    onAlert?: Function
}

function Welcome(props: WelcomeProps){
    return <div onClick={props.onAlert}>
        <h1>{props.name}</h1>
    </div>
}

export default Welcome
