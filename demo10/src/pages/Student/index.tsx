import { ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import React, { useRef } from "react";
import { StudentService } from '@/services/api/student';
import { Student } from "@/services/types";
import { Button, Popconfirm, Switch, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import AddForm, { AddFormProps } from "./components/add"
import EditForm, { UpdateFormProps } from "./components/update"


export default () => {
    const addForm = useRef<AddFormProps>(null)
    const editForm = useRef<UpdateFormProps>(null)
    const actionRef = useRef<ActionType>();

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
                return address?.city || "-"
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
                    <Button type="primary" icon={<EditOutlined/>} key="edit" style={{ marginRight: 30 }}
                            onClick={() => editForm.current?.open(entity.id)}/>
                    <Popconfirm title="delete" key="delete" onConfirm={()=>confirm(entity.id)}>
                        <Button type="primary" key="delete" icon={<DeleteOutlined/>} danger/>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    function statusChange(entity: Student) {

    }

    async function onRefresh() {
        console.log("刷新了")
        await actionRef.current?.reload();
    }

    const confirm = async (id: number) => {

        // TODO删除 ondelete(id)
        await onRefresh()
    };

    /**
     * 新增按钮
     */
    const newBtn = () => {
        return [
            <Button type="primary" key="primary" onClick={addForm.current?.open}>
                <PlusOutlined/>
                创建学生
            </Button>,
        ];
    };

    return <PageContainer>
        <ProTable<Student> rowKey="id" search={{ labelWidth: 120 }} request={StudentService.getAllStudent}
                           columns={columns} toolBarRender={newBtn} actionRef={actionRef}/>
        <AddForm ref={addForm} onRefresh={actionRef.current?.reload}/>
        <EditForm ref={editForm} onRefresh={actionRef.current?.reload}></EditForm>
    </PageContainer>
}
