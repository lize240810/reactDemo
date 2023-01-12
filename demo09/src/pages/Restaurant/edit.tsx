import {CloseCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Card, Col, Popover, Row, message, Form, TimePicker, Upload, Modal} from 'antd';
import {
  ProForm,
  ProFormText,
  FooterToolbar,
  ProFormSelect,
  PageContainer,
  ProFormTextArea,
  ProFormDigitRange
} from '@ant-design/pro-components';


import type {FC} from 'react';
import React, {useState} from 'react';
import styles from './add.less';

const fieldLabels = {
  name: 'Restaurant Name',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};


interface ErrorField {
  name: (string | number)[];
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon}/>
          <div className={styles.errorMessage}>{err.errors[0]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined/>
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    debugger
    setError([]);
    try {
      // await fakeSubmitForm(values);
      message.success('提交成功');
    } catch {
      // console.log
    }
  };

  /**
   * 字段验证
   */
  const onFinishFailed = (errorInfo: any) => {
    debugger
    setError(errorInfo.errorFields);
  };

  const [imageUrl, setImageUrl] = useState<string>();

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );


  return (
    <ProForm
      layout="vertical" hideRequiredMark
      submitter={{
        render: (props, dom) => {
          return (<FooterToolbar>{getErrorInfo(error)}{dom}</FooterToolbar>)
        },
      }} onFinish={onFinish} onFinishFailed={onFinishFailed}>

      <PageContainer>
        <Card title="Restaurant Information" className={styles.card}>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={8}>
              <ProFormText
                label="Restaurant Name" name="name"
                rules={[{required: true, message: 'Restaurant Name'}]}
                placeholder="Please enter the restaurant name"
              />
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <ProFormDigitRange label="Price Range"/>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={16}>
              <ProFormTextArea name="text" label="info" placeholder="Please enter the info"/>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={16}>
              <ProFormTextArea name="text" label="tag (separated by comma)" placeholder="Please enter the tag"/>
            </Col>
          </Row>
        </Card>
        <Card title="Restaurant Address" className={styles.card}>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={16}>
              <ProFormText label="Street Address" name="Street Address"/>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={16}>
              <ProFormText label="City" name="City"/>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={8}>
              <ProFormSelect
                label="State"
                name="State"
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <ProFormSelect
                label="Country"
                name="Country"
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={16}>
              <ProFormText label="Zip Code" name="Zip Code"/>
            </Col>
          </Row>
        </Card>
        <Card title="Business Hours" className={styles.card}>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item label="TUE" rules={[{required: true, message: 'Please input your username!'}]}>
                <TimePicker.RangePicker style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item label="TUE" rules={[{required: true, message: 'Please input your username!'}]}>
                <TimePicker.RangePicker style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item label="WED" rules={[{required: true, message: 'Please input your username!'}]}>
                <TimePicker.RangePicker style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item label="THU" rules={[{required: true, message: 'Please input your username!'}]}>
                <TimePicker.RangePicker style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item label="FRI" rules={[{required: true, message: 'Please input your username!'}]}>
                <TimePicker.RangePicker style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item label="SAT" rules={[{required: true, message: 'Please input your username!'}]}>
                <TimePicker.RangePicker style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item label="SUN" rules={[{required: true, message: 'Please input your username!'}]}>
                <TimePicker.RangePicker style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Contact Information " className={styles.card}>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={8}>
              <ProFormText
                label="Phone Number" name="name"
                rules={[{required: true, message: 'Restaurant Name'}]}
                placeholder="Please enter the restaurant name"
              />
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <ProFormText
                label="Email" name="name"
                rules={[{required: true, message: 'Restaurant Name'}]}
                placeholder="Please enter the restaurant name"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={16}>
              <ProFormText
                label="Restaurant Website" name="url" rules={[{required: true, message: '请选择'}]}
                fieldProps={{style: {width: '100%'}, addonBefore: 'https://', addonAfter: '.com',}}
                placeholder="请输入"/>
            </Col>
          </Row>
        </Card>
        <Card title="Service Platforms" className={styles.card}>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={8}>
              <ProFormSelect
                label="State"
                name="State"
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <ProFormText
                label={fieldLabels.url} name="url" rules={[{required: true, message: '请选择'}]}
                fieldProps={{style: {width: '100%'}, addonBefore: 'http://', addonAfter: '.com',}}
                placeholder="请输入"/>
            </Col>
          </Row>
        </Card>
        <Card title="Upload Restaurant Photos" className={styles.card}>
          <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card">
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
          </Upload>
          <Modal><img alt="example" style={{width: '100%'}}/></Modal>
        </Card>
      </PageContainer>
    </ProForm>
  );
}
export default AdvancedForm;
