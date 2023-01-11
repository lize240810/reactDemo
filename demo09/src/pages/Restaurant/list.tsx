import {addRule, removeRule, rule, updateRule} from '@/services/ant-design-pro/api';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
  ProFormSwitch
} from '@ant-design/pro-components';
import {FormattedMessage, useIntl} from '@umijs/max';
import {Button, Drawer, Input, message} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {getRestaurants, Restaurant, QueryParams} from "@/services/api/restaurant";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({...fields});
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

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
      width: 110,
      renderText: (address: Restaurant["address"], entity) => {
        return `${address.city},${address.state}`
      }
    },
    {
      title: "Publisher",
      dataIndex: '',
    },
    {
      title: "Date",
      dataIndex: 'last_updated',
      render: (dom, entity) => {
        return (
          <a onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true)
          }}>
            {dom}
          </a>
        );
      },
    },
    {
      title: "Restaurant Admin",
      dataIndex: '',
    },
    {
      title: "Status",
      dataIndex: "is_active",
      renderText: (dom: boolean, entity) => {
        return <ProFormSwitch fieldProps={{defaultChecked: dom, onChange: () => statusChange(entity)}}/>
      }
    },
    {
      title: "Action",
      render: (dom, entity) => {
        return [
          <button>修改</button>,
          <button>删除</button>,
          <button>Manage dishes</button>
        ];
      },
    },
  ];

  const newBtn = () => {
    return [
      <Button type="primary" key="primary" onClick={() => console.log("新增")}>
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
        rowSelection={{
          onChange: (_, selectedRows) => {
            debugger
            setSelectedRows(selectedRows)
          },
        }}/>

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
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
