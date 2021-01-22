import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import OrderForm from 'src/view/order/form/OrderForm';
import OrderService from 'src/modules/order/orderService';
import Errors from 'src/modules/shared/error/errors';

const OrderFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await OrderService.create(data);
      const record = await OrderService.find(id);
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
      title={i18n('entities.order.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <OrderForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default OrderFormModal;
