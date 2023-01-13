import {Card, Col, Modal, Row} from 'antd';
import {ProForm, ProFormMoney, ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import {forwardRef, useImperativeHandle, useState} from "react";


const TableList = forwardRef((_, ref) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      open: showModal
    }),
    []
  );

  return <>
    <Modal title="Add a New Dish" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <ProForm submitter={false}>
        <Card title="Restaurant Information">
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <ProFormSelect name="menu" label="Menu"/>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <ProFormSelect name="menu" label="Category"/>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <ProFormText name="menu" label="Dish Name"/>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <ProFormMoney name="price" label="Price" locale="en-US"/>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={24}>
              <ProFormTextArea name="description" label="Description"/>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={24}>
              <ProFormTextArea name="text" label="tag (separated by comma)" placeholder="Please enter the tag"/>
            </Col>
          </Row>
        </Card>
      </ProForm>
    </Modal>
  </>
});

export default TableList;
