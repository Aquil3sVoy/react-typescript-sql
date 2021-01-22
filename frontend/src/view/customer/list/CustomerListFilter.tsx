import {
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/customer/list/customerListActions';
import selectors from 'src/modules/customer/list/customerListSelectors';
import FilterWrapper, {
  filterItemLayout,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import customerEnumerators from 'src/modules/customer/customerEnumerators';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(
    i18n('entities.customer.fields.name'),
  ),
  birthdateRange: yupFilterSchemas.dateRange(
    i18n('entities.customer.fields.birthdateRange'),
  ),
  gender: yupFilterSchemas.enumerator(
    i18n('entities.customer.fields.gender'),
  ),
});

const emptyValues = {
  name: null,
  birthdateRange: [],
  gender: null,
}

const previewRenders = {
  name: {
    label: i18n('entities.customer.fields.name'),
    render: filterRenders.generic(),
  },
  birthdateRange: {
    label: i18n('entities.customer.fields.birthdateRange'),
    render: filterRenders.dateRange(),
  },
  gender: {
    label: i18n('entities.customer.fields.gender'),
    render: filterRenders.enumerator('entities.customer.enumerators.gender',),
  },
}

const CustomerListFilter = (props) => {
  const dispatch = useDispatch();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const { loading } = props;
  return (
    <FilterWrapper>
      <Collapse
        activeKey={expanded ? 'filter' : undefined}
        expandIconPosition="right"
        ghost
        onChange={(value) => {
          setExpanded(Boolean(value.length));
        }}
      >
        <Collapse.Panel
          header={
            <FilterPreview             
              renders={previewRenders}
              values={rawFilter}
              expanded={expanded}
            />
          }
          key="filter"
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Row gutter={24}>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="name"
                    label={i18n('entities.customer.fields.name')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <DatePickerRangeFormItem
                    name="birthdateRange"
                    label={i18n('entities.customer.fields.birthdateRange')}    
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
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
                    layout={filterItemLayout}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="filter-buttons" span={24}>
                  <Button
                    loading={loading}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    {i18n('common.search')}
                  </Button>
                  <Button
                    loading={loading}
                    onClick={onReset}
                    icon={<UndoOutlined />}
                  >
                    {i18n('common.reset')}
                  </Button>
                </Col>
              </Row>
            </form>
          </FormProvider>
        </Collapse.Panel>
      </Collapse>
    </FilterWrapper>
  );
};

export default CustomerListFilter;