import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';


const CustomerView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.name) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.customer.fields.name')}
        >
          {record.name}
        </Form.Item>
      )}

      {Boolean(record.birthdate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.customer.fields.birthdate')}
        >
          {record.birthdate}
        </Form.Item>
      )}

      {Boolean(record.gender) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.customer.fields.gender')}
        >
          {i18n(
            `entities.customer.enumerators.gender.${record.gender}`,
          )}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default CustomerView;
