import { PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import React from "react";
import { StudentService } from '@/services/api/student';
import { Student } from "@/services/types";
import { Button, Popconfirm, Switch, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


export default () => {

    const columns: ProColumns[] = [
        {
            dataIndex: '_id',
            valueType: 'indexBorder',
            width: 48,
            align: 'center',
        },
        {
            title: "姓名",
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: "性别",
            dataIndex: 'sex',
            render: sex => <Tag>{sex ? '男' : '女'}</Tag>,
            hideInSearch: true
        },
        {
            title: "邮箱",
            dataIndex: 'mail',
            valueType: "text",
            hideInSearch: true
        },
        {
            title: "性别",
            dataIndex: 'sex',
            valueType: "switch",
            hideInTable: true
        },
        {
            title: "生日",
            dataIndex: 'birthday',
            valueType: "fromNow",
            hideInSearch: true,
            sorter: true
        },
        {
            title: "号码",
            dataIndex: 'phone',
            valueType: 'text',
            hideInSearch: true
        },
        {
            title: "地址",
            dataIndex: 'address',
            valueType: 'text',
            hideInSearch: true,
            renderText: (address: Student['address']) => {
                return address.city
            }
        },
        {
            title: "是否启用",
            dataIndex: 'status',
            hideInSearch: true,
            align: 'center',
            width: 100,
            renderText: (dom: boolean, entity) => (
                <Switch defaultChecked={dom} onChange={() => statusChange(entity)}></Switch>
            ),
        },
        {
            title: '操作',
            valueType: 'option',
            align: "center",
            render: (_, entity) => (
                <div>
                    <Button type="primary" icon={<EditOutlined/>} key="edit" style={{ marginRight: 30 }}/>
                    <Popconfirm title="delete" key="delete">
                        <Button type="primary" key="delete" icon={<DeleteOutlined/>} danger/>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    function statusChange(entity: Student) {

    }

    return <PageContainer>
        <ProTable<Student> rowKey="id" search={{ labelWidth: 120 }} request={StudentService.getAllStudent}
                           columns={columns}/>
    </PageContainer>
}
