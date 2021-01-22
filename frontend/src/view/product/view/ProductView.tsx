import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import ImagesViewer from 'src/view/shared/ImagesViewer';

const ProductView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.name) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.product.fields.name')}
        >
          {record.name}
        </Form.Item>
      )}

      {Boolean(record.description) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.product.fields.description')}
        >
          {record.description}
        </Form.Item>
      )}

      {(Boolean(record.unitPrice) || record.unitPrice === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.product.fields.unitPrice')}
          >
            {record.unitPrice.toFixed(2)}
          </Form.Item>
        )}

      {Boolean(record.photos) && Boolean(record.photos.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.product.fields.photos')}
          >
            <ImagesViewer value={record.photos} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default ProductView;
