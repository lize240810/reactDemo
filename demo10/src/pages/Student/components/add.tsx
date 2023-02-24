import React, { useImperativeHandle, useState } from "react";
import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Student } from "@/services/types";

interface propsParams {
    onRefresh?: Function
}

export default React.forwardRef(({ onRefresh }: propsParams, ref) => {

    const [modalOpen, setModalOpen] = useState(false);

    function handleAdd(values?: Partial<Student>) {

    }

    useImperativeHandle(ref, () => {
        return {
            open: () => setModalOpen(true),
            close: () => setModalOpen(false),
        }
    })

    return <>
        <ModalForm title="添加学生" width="400px" open={modalOpen} onOpenChange={setModalOpen}
                   onFinish={(val) => handleAdd(val)}>
            <ProFormText
                rules={[{ required: true },]} width="md" name="name"/>
            <ProFormTextArea width="md" name="desc"/>
        </ModalForm>
    </>
})


