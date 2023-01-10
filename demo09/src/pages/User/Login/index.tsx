import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {FormattedMessage, Helmet, history, SelectLang, useIntl, useModel} from '@umijs/max';
import {message} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React from 'react';
import {flushSync} from 'react-dom';

const ActionIcons = () => {
  const langClassName = useEmotionCss(({token}) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName}/>
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName}/>
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName}/>
    </>
  );
};

const Lang = () => {
  const langClassName = useEmotionCss(({token}) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang/>}
    </div>
  );
};

const Login: React.FC = () => {
  const {initialState, setInitialState} = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const res = await login({...values});
      if (!res.errorMessage) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        // await fetchUserInfo();
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            token: res.data.access_token,
          }));
        });
        // const urlParams = new URL(window.location.href).searchParams;
        // history.push(urlParams.get('redirect') || '/');
        return;
      }
    } catch (error) {
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang/>

      <div style={{flex: '1', padding: '32px 0'}}>
        <LoginForm
          contentStyle={{minWidth: 280, maxWidth: '75vw'}}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="GourmentCarte"
          subTitle={intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
          actions={[
            <FormattedMessage key="loginWith" id="pages.login.loginWith" defaultMessage="其他登录方式"/>,
            <ActionIcons key="icons"/>,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <>
            <ProFormText
              name="email"
              fieldProps={{size: 'large', prefix: <UserOutlined/>}}
              initialValue="test@gc.com"
              placeholder={intl.formatMessage({
                id: 'pages.login.email.placeholder',
                defaultMessage: 'Email: example@email.com',
              })}
              rules={[{
                required: true,
                message: (
                  <FormattedMessage id="pages.login.email.required" defaultMessage="Please enter email!"/>
                ),
              },
              ]}
            />
            <ProFormText.Password
              name="password"
              initialValue="Admin@123"
              fieldProps={{size: 'large', prefix: <LockOutlined/>}}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'password',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please enter password"
                    />
                  ),
                },
              ]}
            />
          </>

          <div style={{marginBottom: 24}}>
            {/*<ProFormCheckbox noStyle name="autoLogin">*/}
            {/*  <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>*/}
            {/*</ProFormCheckbox>*/}

            <a style={{float: 'right'}}>
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
