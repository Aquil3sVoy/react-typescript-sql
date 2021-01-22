import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import UserViewItem from 'src/view/user/view/UserViewItem';
import FilesViewer from 'src/view/shared/FilesViewer';
import CustomerViewItem from 'src/view/customer/view/CustomerViewItem';
import ProductViewItem from 'src/view/product/view/ProductViewItem';

const OrderView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.customer) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.order.fields.customer')}
          >
            <CustomerViewItem value={record.customer} />
          </Form.Item>
        )}

      {Boolean(record.products) && Boolean(record.products.length) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.order.fields.products')}
        >
          <ProductViewItem value={record.products} />
        </Form.Item>
      )}

      {Boolean(record.employee) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.order.fields.employee')}
          >
            <UserViewItem value={record.employee} />
          </Form.Item>
        )}

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.order.fields.delivered')}
      >
        {record.delivered
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>

      {Boolean(record.attachments) &&
        Boolean(record.attachments.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n(
              'entities.order.fields.attachments',
            )}
          >
            <FilesViewer value={record.attachments} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default OrderView;
