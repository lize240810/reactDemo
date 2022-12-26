import React from "react";

import {Input, Popconfirm, Table} from "antd";

const {Search} = Input;
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];

export default class Demo01 extends React.Component {

    state = {
        dataSource: []
    }
    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_: any, record: {}) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                        <a>删除</a>
                    </Popconfirm>
                ) : null,

        }
    ];


    async componentDidMount() {
        await this.loadList()
    }

    // 搜索
    onSearch = (value: string) => {
        console.log("搜索", value)
    }
    // 加载数据
    loadList = async () => {
        setTimeout(() => {
            this.setState({
                dataSource,
            })
        }, 1000)
    }
    // 删除
    handleDelete = (record: any) => {
        const _dataSource = this.state.dataSource.filter(item => item.key != record.key)
        this.setState({
            dataSource: _dataSource
        })
    }


    render() {
        return (
            <>
                <Search placeholder="input search text" allowClear enterButton="Search" size="large"
                        onSearch={this.onSearch}/>
                <Table dataSource={this.state.dataSource} columns={this.columns}/>;
            </>
        );
    }
}
