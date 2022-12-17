interface protoTypes {
    list: Array<any>
}

export default function TestPropsCom({list}: protoTypes) {
    return (
        <div>
            {list.map(item => <div key={item.id}>{item.name}</div>)}
        </div>
    )
}
