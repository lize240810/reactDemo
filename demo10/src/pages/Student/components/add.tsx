import React, {useImperativeHandle, useState} from "react";
import {
    ModalForm,
    ProFormCascader,
    ProFormDatePicker,
    ProFormSwitch,
    ProFormText,
    ProFormTextArea
} from "@ant-design/pro-components";
import {Student} from "@/services/types";
import {StudentService} from "@/services/api";
import {Col, Row} from "antd";

interface propsParams {
    onRefresh?: Function
}

export interface AddFormProps {
    open(): void;
}

export default React.forwardRef<AddFormProps, propsParams>(({onRefresh}: propsParams, ref) => {

    const [modalOpen, setModalOpen] = useState(false);

    async function handleAdd(values: Partial<Student>) {
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

        const res = await StudentService.createStudent(data)
        if (res.ok) {
            onRefresh && await onRefresh()
            await setModalOpen(false)
        }
    }

    useImperativeHandle(ref, () => {
        return {
            open: () => setModalOpen(true),
            close: () => setModalOpen(false),
        }
    })

    return <>
        <ModalForm title="添加学生" width="400px" open={modalOpen} onOpenChange={setModalOpen}
                   onFinish={handleAdd}>
            <Row gutter={16}>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormText rules={[{required: true}]} label="姓名" width="md" name="name"/>
                </Col>
                <Col xs={12} sm={12} lg={12}>
                    <ProFormSwitch label="性别" width="md" name="sex" checkedChildren="男"
                                   unCheckedChildren="女"
                    />
                </Col>
                <Col xs={12} sm={12} lg={12}>
                    <ProFormSwitch rules={[{required: true}]} label="是否启用" width="md" name="status"/>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormText rules={[{required: true}]} label="电话号码" width="md" name="phone"/>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormText rules={[{required: true}]} label="邮箱" width="md" name="mail"/>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <ProFormDatePicker name="birthday" label="生日" style={{width: '100%'}}/>
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


