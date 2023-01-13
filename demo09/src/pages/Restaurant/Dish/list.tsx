import {DeleteOutlined, EditOutlined, PlusOutlined, SettingFilled} from '@ant-design/icons';
import type {ActionType, ListToolBarProps, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProFormSwitch, ProTable} from '@ant-design/pro-components';
import {Button, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import {Dish, getDish} from "@/services/api/dish/list";
import {FormattedMessage, history, useParams} from "@umijs/max";
import DishAdd from './add'


/**
 * 修改状态
 * @param item
 */
function statusChange(item: Dish) {
  console.log(item._id, item.is_active)
}


const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const columns: ProColumns[] = [
    {
      dataIndex: '_id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: "Dish Name",
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: 'price',
      valueType: () => ({
        type: 'money',
        locale: "en-US",
        moneySymbol: true,
      }),
    },
    {
      title: "Description",
      dataIndex: 'description',
      hideInSearch: true,
      width: 200,
      valueType: 'textarea'
    },
    {
      title: "Publisher",
      dataIndex: 'restaurant_name',
    },
    {
      title: "Date",
      dataIndex: 'last_updated',
      valueType: 'dateTime'
    },
    {
      title: "Status",
      dataIndex: 'is_active',
      valueType: 'switch',
      hideInTable: true
    },
    {
      title: "Status",
      dataIndex: 'is_active',
      hideInSearch: true,
      width: 100,
      renderText: (dom: boolean, entity) => {
        return <ProFormSwitch fieldProps={{defaultChecked: dom, onChange: () => statusChange(entity)}}/>
      }
    },
    {
      title: "Action",
      valueType: 'option',
      hideInSearch: true,
      width: 150,
      key: 'option',
      fixed: 'right',
      render: (_, entity) => {
        return <div>
          <Button type="primary" icon={<EditOutlined/>} style={{marginRight: 10}} key={'edit'}/>

          <Popconfirm title="delete" key={'delete'} onConfirm={async () => {
            if (true) {
              message.success("success" + entity._id)
              actionRef.current?.reload()
            } else message.error("error")
          }}>
            <Button type="primary" icon={<DeleteOutlined/>} style={{marginRight: 10}} danger/>
          </Popconfirm>
        </div>;
      },
    },
  ];
  const param = useParams();
  const dishAddRef = useRef(null)

  const [activeKey, setActiveKey] = useState<React.Key | undefined>('tab1');

  const toolBar: ListToolBarProps = {
    menu: {
      activeKey,
      items: [
        {
          key: 'tab1',
          label: <span>全部实验室</span>,
        },
        {
          key: 'tab2',
          label: <span>我创建的实验室</span>,
        },
      ],
      onChange(key?: React.Key) {
        setActiveKey(key)
      },
    },
    actions: [
      <Button type="primary" key="primary" onClick={dishAddRef.current?.open}>
        <PlusOutlined/><FormattedMessage id="pages.searchTable.new" defaultMessage="New"/> Category
      </Button>,
      <Button type="primary" key="primary" onClick={dishAddRef.current?.open}>
        <PlusOutlined/><FormattedMessage id="pages.searchTable.new" defaultMessage="New"/> Dish
      </Button>,
    ],
  }

  return (
    <PageContainer>
      <ProTable actionRef={actionRef} params={param} toolbar={toolBar} request={getDish} columns={columns} search={{
        optionRender: (_, __, dom) => [
          <Button key="menu" type="text" onClick={() => {
            history.push("/restaurant/menu/list")
          }}>
            <SettingFilled/>Menu
          </Button>,
          ...dom.reverse(),
        ],
      }}>
      </ProTable>
      <DishAdd ref={dishAddRef}/>
    </PageContainer>
  )
}
export default TableList;
