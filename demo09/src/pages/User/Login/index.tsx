import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {LoginFormPage, ProFormText} from '@ant-design/pro-components';
import {signIn} from '@/services/api/auth';
import {message} from "antd";
import {useModel, history} from '@umijs/max';
import {flushSync} from 'react-dom';

import MoreLogin from './components/MoreLogin'
import './index.scss'
import React from "react";

const Login: React.FC = () => {
  const {initialState, setInitialState} = useModel('@@initialState');

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const res = await signIn({...values});
      if (!res.errorMessage) {
        message.success("Login successful!");
        sessionStorage.setItem("token", res.data.access_token.toString())
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
          flushSync(() => {
            setInitialState((s) => ({
              ...s,
              currentUser: userInfo,
            }));
          });
        }
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="loginWrapper">
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="GourmentCarte"
        subTitle="Explore the dish for you"
        actions={<MoreLogin/>}
        submitter={{searchConfig: {submitText: 'Sign in'}}}
        onFinish={async (values) => {
          await handleSubmit(values as API.LoginParams);
        }}
      >
        <>
          <ProFormText
            name="email"
            initialValue="test@gc.com"
            fieldProps={{
              size: 'large',
              prefix: <MailOutlined className={'prefixIcon'}/>,
            }}
            placeholder={'Email: example@email.com'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            initialValue="Admin@123"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'}/>,
            }}
            placeholder={'password'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </>
        <div className="find-password">
          Forget yout password?<a>Find password</a>
        </div>
      </LoginFormPage>
    </div>
  );
};
export default Login;

