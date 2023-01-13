import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProFormSwitch, ProTable} from '@ant-design/pro-components';
import {Button, message, Popconfirm} from 'antd';
import React, {useRef} from 'react';
import {Dish, getDish} from "@/services/api/dish/list";
import {FormattedMessage, useParams} from "@umijs/max";
import MenuAdd from './add'

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
      title: "Menu Name",
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
      hideInSearch: false
    },
    {
      title: "Publisher",
      dataIndex: 'restaurant_name',
      hideInSearch: false
    },
    {
      title: "Date",
      dataIndex: 'last_updated',
      valueType: 'dateTime',
      hideInSearch: false
    },
    {
      title: "Hours",
      dataIndex: 'hours',
      hideInSearch: false
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
  const menuAddRef = useRef(null)

  const newBtn = () => {
    return [
      <Button type="primary" key="primary" onClick={menuAddRef.current?.open}>
        <PlusOutlined/><FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
      </Button>
    ]
  }

  return (
    <PageContainer>
      <ProTable actionRef={actionRef} params={param} toolBarRender={newBtn} request={getDish} columns={columns}>
      </ProTable>
      <MenuAdd ref={menuAddRef}/>
    </PageContainer>
  )
}
export default TableList;
