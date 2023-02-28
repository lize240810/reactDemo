import React, { useImperativeHandle, useState } from "react";
import { ModalForm, ProFormCascader, ProFormDatePicker, ProFormSwitch, ProFormText } from "@ant-design/pro-components";
import { Student } from "@/services/types";
import { StudentService } from "@/services/api";
import { Col, Row } from "antd";

interface propsParams {
    onRefresh?: Function
}

export interface UpdateFormProps {
    open(id: number): void;
}

export default React.forwardRef<UpdateFormProps, propsParams>(({ onRefresh }: propsParams, ref) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [stuData, setStuData] = useState<Student | undefined>(undefined);


    async function handleEdit(values: Partial<Student>) {
        const data = {
            ...values,
            sex: !!values.sex,
            address: values?.addr ? {
                province: values.addr[0],
                county: values?.addr[2],
                city: values?.addr[1]
            } : undefined,
            addr: undefined
        }

        const res = await StudentService.editStudent(stuData?.id || 1, data)
        if (res.ok) {
            onRefresh && await onRefresh()
            await setModalOpen(false)
        }
        return true
    }

    useImperativeHandle(ref, () => {
        return {
            open: async (id: number) => {
                const res = await StudentService.getStudent(id)
                setStuData(res.data)
                setModalOpen(true)
            },
            close: () => {
                setStuData(undefined)
                setModalOpen(false)
            },
        }
    })

    return <>
        <ModalForm title="添加学生" width="400px" open={modalOpen} onOpenChange={setModalOpen}
                   modalProps={{ destroyOnClose: true }} onFinish={handleEdit} initialValues={stuData}>
            <Row gutter={16}>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormText rules={[{ required: true }]} label="姓名" width="md" name="name"/>
                </Col>
                <Col xs={12} sm={12} lg={12}>
                    <ProFormSwitch label="性别" width="md" name="sex" checkedChildren="男"
                                   unCheckedChildren="女"
                    />
                </Col>
                <Col xs={12} sm={12} lg={12}>
                    <ProFormSwitch rules={[{ required: true }]} label="是否启用" width="md" name="status"/>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormText rules={[{ required: true }]} label="电话号码" width="md" name="phone"/>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormText rules={[{ required: true }]} label="邮箱" width="md" name="mail"/>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormDatePicker name="birthday" label="生日" style={{ width: '100%' }}/>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormCascader
                        name="addr"
                        label="地址"
                        fieldProps={{
                            options: [
                                {
                                    value: '浙江',
                                    label: '浙江',
                                    children: [
                                        {
                                            value: '杭州',
                                            label: '杭州',
                                            children: [
                                                {
                                                    value: '西湖',
                                                    label: '西湖',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        }}
                    />
                </Col>
            </Row>
        </ModalForm>
    </>
})
