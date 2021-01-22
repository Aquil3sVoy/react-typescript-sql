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
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import RadioFormItem from 'src/view/shared/form/items/RadioFormItem';
import customerEnumerators from 'src/modules/customer/customerEnumerators';
import moment from 'moment';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.customer.fields.name'),
    {
      "required": true,
      "min": 2,
      "max": 255
    },
  ),
  birthdate: yupFormSchemas.date(
    i18n('entities.customer.fields.birthdate'),
    {},
  ),
  gender: yupFormSchemas.enumerator(
    i18n('entities.customer.fields.gender'),
    {
      "options": customerEnumerators.gender
    },
  ),
});

const CustomerForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      birthdate: record.birthdate ? moment(record.birthdate, 'YYYY-MM-DD') : null,
      gender: record.gender,
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
          <InputFormItem
            name="name"
            label={i18n('entities.customer.fields.name')}  
            required={true}
            layout={formItemLayout}
            autoFocus
          />
          <DatePickerFormItem
            name="birthdate"
            label={i18n('entities.customer.fields.birthdate')}
            required={false}
            layout={formItemLayout}
          />
          <RadioFormItem
            name="gender"
            label={i18n('entities.customer.fields.gender')}
            options={customerEnumerators.gender.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.customer.enumerators.gender.${value}`,
                ),
              }),
            )}
            required={false}
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

export default CustomerForm;
