import {
  CloseOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import Storage from 'src/security/storage';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import CustomerAutocompleteFormItem from 'src/view/customer/autocomplete/CustomerAutocompleteFormItem';
import ProductAutocompleteFormItem from 'src/view/product/autocomplete/ProductAutocompleteFormItem';

const schema = yup.object().shape({
  customer: yupFormSchemas.relationToOne(
    i18n('entities.order.fields.customer'),
    {
      "required": true
    },
  ),
  products: yupFormSchemas.relationToMany(
    i18n('entities.order.fields.products'),
    {
      "required": true,
      "min": 1
    },
  ),
  employee: yupFormSchemas.relationToOne(
    i18n('entities.order.fields.employee'),
    {},
  ),
  delivered: yupFormSchemas.boolean(
    i18n('entities.order.fields.delivered'),
    {},
  ),
  attachments: yupFormSchemas.files(
    i18n('entities.order.fields.attachments'),
    {
      "max": 3
    },
  ),
});

const OrderForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      customer: record.customer,
      products: record.products || [],
      employee: record.employee,
      delivered: record.delivered,
      attachments: record.attachments || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  });

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  const onSubmit = (values) => {
    props.onSubmit(props?.record?.id, values);
  };

  const { saveLoading } = props;
  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CustomerAutocompleteFormItem  
            name="customer"
            label={i18n('entities.order.fields.customer')}
            required={true}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <ProductAutocompleteFormItem  
            name="products"
            label={i18n('entities.order.fields.products')}
            required={true}
            showCreate={!props.modal}
            layout={formItemLayout}
            mode="multiple"
          />
          <UserAutocompleteFormItem  
            name="employee"
            label={i18n('entities.order.fields.employee')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <SwitchFormItem
            name="delivered"
            label={i18n('entities.order.fields.delivered')}
            layout={formItemLayout}
          />
          <FilesFormItem
            name="attachments"
            label={i18n('entities.order.fields.attachments')}
            required={false}
            storage={Storage.values.orderAttachments}
            max={3}
            formats={["txt","pdf"]}
            layout={formItemLayout}
          />

          <Form.Item
            className="form-buttons"
            {...tailFormItemLayout}
          >
            <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              icon={<SaveOutlined />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined />}
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel && (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                icon={<CloseOutlined />}
              >
                {i18n('common.cancel')}
              </Button>
            )}
          </Form.Item>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default OrderForm;
