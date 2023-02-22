import { PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import React from "react";
import { StudentService } from '@/services/api/student';
import { Student } from "@/services/types";
import { Tag } from "antd";


export default () => {

    const columns: ProColumns[] = [
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
            title: "性别",
            dataIndex: 'sex',
            valueType: "switch",
            hideInTable: true
        }
    ];

    return <PageContainer>
        <ProTable<Student> rowKey="id" search={{ labelWidth: 120 }} request={StudentService.getAllStudent}
                           columns={columns}/>
    </PageContainer>
}
