import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/order/list/orderListActions';
import destroyActions from 'src/modules/order/destroy/orderDestroyActions';
import selectors from 'src/modules/order/list/orderListSelectors';
import destroySelectors from 'src/modules/order/destroy/orderDestroySelectors';
import orderSelectors from 'src/modules/order/orderSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import UserListItem from 'src/view/user/list/UserListItem';
import FilesListView from 'src/view/shared/list/FileListView';
import CustomerListItem from 'src/view/customer/list/CustomerListItem';
import ProductListItem from 'src/view/product/list/ProductListItem';

const OrderListTable = (props) => {
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasPermissionToEdit = useSelector(
    orderSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    orderSelectors.selectPermissionToDestroy,
  );

  const handleTableChange = (
    pagination,
    filters,
    sorter,
  ) => {
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  const doDestroy = (id) => {
    dispatch(destroyActions.doDestroy(id));
  };

  const columns = [
      {
        title: i18n('entities.order.fields.customer'),
        sorter: false,
        dataIndex: 'customer',
        render: (value) => <CustomerListItem value={value} />,
      },
      {
        title: i18n('entities.order.fields.products'),
        sorter: false,
        dataIndex: 'products',
        render: (value) => <ProductListItem value={value} />,
      },
      {
        title: i18n('entities.order.fields.employee'),
        sorter: false,
        dataIndex: 'employee',
        render: (value) => <UserListItem value={value} />,
      },
      {
        title: i18n('entities.order.fields.attachments'),
        sorter: false,
        dataIndex: 'attachments',
        render: (value) => <FilesListView value={value} />,
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/order/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/order/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const rowSelection = () => {
    return {
      selectedRowKeys: selectedKeys,
      onChange: (selectedRowKeys) => {
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  return (
    <TableWrapper>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns as any}
        dataSource={rows}
        pagination={pagination}
        onChange={handleTableChange}
        rowSelection={rowSelection()}
        scroll={{
          x: true,
        }}
      />
    </TableWrapper>
  );
};

export default OrderListTable;
