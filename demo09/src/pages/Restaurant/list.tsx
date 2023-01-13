import {removeRule, updateRule} from '@/services/ant-design-pro/api';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProDescriptions, ProFormSwitch, ProTable} from '@ant-design/pro-components';
import {FormattedMessage, history} from '@umijs/max';
import {Button, Drawer, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {getRestaurants, QueryParams, Restaurant} from "@/services/api/restaurant";

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

/**
 * 修改状态
 * @param item
 */
function statusChange(item: Restaurant) {
  console.log(item._id, item.is_active)
}

const TableList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * 数据表头
   */
  const columns: ProColumns<Restaurant>[] = [
    {
      dataIndex: '_id',
      valueType: 'indexBorder',
      width: 48,
      hideInSearch: true
    },
    {
      title: "Restaurant Name",
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: "address",
      hideInSearch: true,
      width: 110,
      renderText: (address: Restaurant["address"]) => {
        return `${address.city},${address.state}`
      }
    },
    {
      title: "Publisher",
      dataIndex: '',
      hideInSearch: true
    },
    {
      title: "Date",
      dataIndex: 'last_updated',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: "Date",
      dataIndex: 'last_updated',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: "Restaurant Admin",
      dataIndex: '',
      hideInSearch: true
    },
    {
      title: "Status",
      dataIndex: "is_active",
      valueType: 'switch',
      hideInTable: true
    },
    {
      title: "Status",
      dataIndex: "is_active",
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
      width: 250,
      render: (_, entity) => {
        return <div>
          <Button type="primary" icon={<EditOutlined/>} style={{marginRight: 10}} key={'edit'}/>
          <Popconfirm title="delete" key={'delete'} onConfirm={async () => {
            if (true) {
              message.success("success" + entity._id)
              actionRef.current?.reload()
            } else {
              message.error("error")
            }
          }}>
            <Button type="primary" icon={<DeleteOutlined/>} style={{marginRight: 10}} danger/>
          </Popconfirm>

          <Button type="primary" onClick={() => history.push({pathname: `/restaurant/dish/list/${entity.restaurant_id}`})}>Manage
            dishes</Button>
        </div>;
      },
    },
  ];

  const newBtn = () => {
    return [
      <Button type="primary" key="primary" onClick={() => history.push('/restaurant/add')}>
        <PlusOutlined/><FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
      </Button>
    ]
  }

  return (
    <PageContainer>
      <ProTable<Restaurant, QueryParams>
        actionRef={actionRef} rowKey="key" search={{labelWidth: 120}}
        toolBarRender={newBtn}
        request={getRestaurants}
        columns={columns}
        // pagination={{pageSize: 2}}
        rowSelection={{onChange: (_, selectedRows) => setSelectedRows(selectedRows)}}/>

      {selectedRowsState?.length > 0 && (
        <FooterToolbar extra={
          <div>
            <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen"/>{' '}
            <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}
            <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
            &nbsp;&nbsp;
            <span>
                <FormattedMessage id="pages.searchTable.totalServiceCalls"
                                  defaultMessage="Total number of service calls"/>{' '}
              {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
              <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万"/>
              </span>
          </div>}>
          {/*批量删除按钮*/}
          <Button onClick={async () => {
            await handleRemove(selectedRowsState);
            setSelectedRows([]);
            actionRef.current?.reloadAndRest?.();
          }}>
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="Batch deletion"/>
          </Button>

          {/*批处理*/}
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="Batch approval"/>
          </Button>
        </FooterToolbar>

      )}

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }} closable={false}>
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{id: currentRow?.name}}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
