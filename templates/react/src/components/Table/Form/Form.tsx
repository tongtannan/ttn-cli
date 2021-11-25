import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';

import CustomText from './Text/Text';
import CustomInput from './Input/Input';
import CustomInputNumber from './InputNumber/InputNumber';
import CustomRadio from './Radio/Radio';
import CustomCheckbox from './Checkbox/Checkbox';
import { ActionType, FormItemType, FormType } from '@/constants/type.d';

interface Props {
  columns: Array<any>;
  modalAction: ActionType | string;
  setAllowSubmit: any;
}

interface State {
  formValue: any;
}

interface RuleType {
  key: string;
  required: boolean;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default class CustomForm extends React.Component<Props, State> {
  initialValues: any;

  rules: Array<RuleType>;

  formRef = React.createRef<FormInstance>();

  constructor(props: Props) {
    super(props);

    const initialValues = {};
    const rules = [];

    props.columns.forEach((column) => {
      if (column.form) {
        const { defaultValue, required } = column.form;

        if (defaultValue !== undefined) initialValues[column.dataIndex] = defaultValue;

        if (required) {
          rules.push({
            key: column.dataIndex,
            required: true,
          });
        }
      }
    });

    this.initialValues = initialValues;
    this.rules = rules;
    this.state = {
      formValue: { ...initialValues },
    };
    this.handleRuleForm();
  }

  getRuleForm = (): boolean => {
    const { formValue } = this.state;
    const { rules } = this;

    for (let i = 0, len = rules.length; i < len; i++) {
      const { key, required } = rules[i];
      // Required verification
      if (required && [undefined, ''].includes(formValue[key])) {
        return false;
      }
    }

    return true;
  };

  // Set the save button state
  handleRuleForm = () => {
    this.props.setAllowSubmit(this.getRuleForm());
  };

  resetFormData = () => this.formRef.current.resetFields();

  getFormData = () => this.formRef.current.validateFields();

  setFormData = (data) => {
    if (data) {
      // modify
      this.formRef.current.setFieldsValue(data);
      this.setState(
        () => ({
          formValue: data,
        }),
        this.handleRuleForm,
      );
    } else {
      // add
      const cloneInitialValues = { ...this.initialValues };
      this.formRef.current.setFieldsValue(cloneInitialValues);
      this.setState(() => ({ formValue: cloneInitialValues }), this.handleRuleForm);
    }
  };

  handleValuesChange = (val) => {
    this.setState(
      (state) => ({
        formValue: Object.assign(state.formValue, val),
      }),
      this.handleRuleForm,
    );
  };

  renderFormItem = ({ form, dataIndex }, formValue): React.ReactNode => {
    const disabled = this.props.modalAction === ActionType.DEFAULT_EDIT && form.disabledEdit;
    const query = {
      value: formValue[dataIndex],
      onChange: (val) => {
        this.formRef.current.setFields([
          {
            name: dataIndex,
            value: val,
          },
        ]);
      },
    };
    switch (form.type) {
      case FormType.TEXT:
        return <CustomText form={form} {...query} />;

      case FormType.INPUT:
        return <CustomInput form={form} disabled={disabled} {...query} />;

      case FormType.INPUT_NUMBER:
        return <CustomInputNumber form={form} disabled={disabled} {...query} />;

      case FormType.DADIO:
        return <CustomRadio form={form} disabled={disabled} {...query} />;

      case FormType.CHECKBOX:
        return <CustomCheckbox form={form} disabled={disabled} {...query} />;

      default:
        break;
    }
  };

  renderForm = (formValue): React.ReactNode =>
    this.props.columns
      .filter((column) => column.form && column.form.show)
      .map((column) => {
        switch (column.item) {
          case FormItemType.LIST:
            return this.renderFormItem(column, formValue);

          default:
            return (
              <Form.Item
                name={column.dataIndex}
                label={column.title}
                key={column.dataIndex}
                extra={column.form.extra}
                rules={[{ required: true }]}
                valuePropName={column.form.valuePropName}
              >
                {this.renderFormItem(column, formValue)}
              </Form.Item>
            );
        }
      });

  render() {
    return (
      <Form
        {...layout}
        requiredMark={false}
        ref={this.formRef}
        name="control-ref"
        onValuesChange={this.handleValuesChange}
      >
        {this.renderForm(this.state.formValue)}
      </Form>
    );
  }
}
