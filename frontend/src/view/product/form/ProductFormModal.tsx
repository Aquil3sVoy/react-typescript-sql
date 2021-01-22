import React, { useState } from 'react';
import { Modal } from 'antd';
import { i18n } from 'src/i18n';
import ProductForm from 'src/view/product/form/ProductForm';
import ProductService from 'src/modules/product/productService';
import Errors from 'src/modules/shared/error/errors';

const ProductFormModal = (props) => {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await ProductService.create(data);
      const record = await ProductService.find(id);
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
      title={i18n('entities.product.new.title')}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={false}
      width="80%"
    >
      <ProductForm
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={props.onCancel}
        modal
      />
    </Modal>
  );
};

export default ProductFormModal;
