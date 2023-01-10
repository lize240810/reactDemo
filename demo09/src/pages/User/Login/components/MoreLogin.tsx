import React, {CSSProperties} from "react";
import {
  FacebookOutlined,
  GooglePlusOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {Space, Divider} from "antd";

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default function MoreLogin() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <Divider plain>
        <span style={{color: '#CCC', fontWeight: 'normal', fontSize: 14}}>
          Or sign in with social account
        </span>
      </Divider>
      <Space align="center" size={24}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 40,
            width: 40,
            border: '1px solid #D4D8DD',
            borderRadius: '50%',
          }}
        >
          <FacebookOutlined style={{...iconStyles, color: '#1677FF'}}/>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 40,
            width: 40,
            border: '1px solid #D4D8DD',
            borderRadius: '50%',
          }}
        >
          <GooglePlusOutlined style={{...iconStyles, color: '#FF6A10'}}/>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 40,
            width: 40,
            border: '1px solid #D4D8DD',
            borderRadius: '50%',
          }}
        >
          <WeiboOutlined style={{...iconStyles, color: '#333333'}}/>
        </div>
      </Space>
    </div>
  )
}

