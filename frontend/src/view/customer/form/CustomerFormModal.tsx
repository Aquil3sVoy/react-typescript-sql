import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import CustomerForm from 'src/view/customer/form/CustomerForm';
import CustomerService from 'src/modules/customer/customerService';
import Errors from 'src/modules/shared/error/errors';

const CustomerFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await CustomerService.create(data);
      const record = await CustomerService.find(id);
      props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      style={{ top: 24 }}
      title={i18n('entities.customer.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <CustomerForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default CustomerFormModal;
