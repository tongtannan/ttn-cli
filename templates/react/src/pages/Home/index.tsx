import React from 'react';
import { PageHeader, Modal, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';

import CustomTable from '@/components/Table/Table';
import { TABLE_CONFIG, INITIAL_VALUES, ProduceActionType } from './config/config';

type Props = Record<string, never>;
interface State {
  // modal
  visible: boolean;
  modalTitle: string;

  formValue: any;
  allowSubmit: boolean;
  confirmLoading: boolean;
}

const LABALCOL = 4;
const WRAPPERCOL = 20;

const layout = {
  labelCol: { span: LABALCOL },
  wrapperCol: { span: WRAPPERCOL },
};

export default class HomePage extends React.Component<Props, State> {
  formRef: any;

  formTable: any;

  constructor(props: Props) {
    super(props);

    this.formRef = React.createRef<FormInstance>();
    this.formTable = React.createRef();

    this.state = {
      visible: false,
      modalTitle: '',
      formValue: {},
      allowSubmit: true,
      confirmLoading: false,
    };
  }

  setCustomFormData = (item, record) => {
    const cloneInititalValues = JSON.parse(JSON.stringify(INITIAL_VALUES));
    switch (item.action) {
      case ProduceActionType.ADD:
        this.formRef.current.setFieldsValue(cloneInititalValues);
        this.setState(() => ({ formValue: cloneInititalValues }), this.handleRuleForm);
        break;

      case ProduceActionType.EDIT:
        // eslint-disable-next-line
        const cloneRecord = JSON.parse(JSON.stringify(record));

        this.formRef.current.setFieldsValue(cloneRecord);
        this.setState(
          () => ({
            formValue: cloneRecord,
          }),
          this.handleRuleForm,
        );
        break;

      default:
        break;
    }
  };

  handleAction = (item, record) => {
    this.setState(
      () => ({
        visible: true,
        modalTitle: item.title,
      }),
      () => this.setCustomFormData(item, record),
    );
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
    });
  };

  handleOk = async () => {};

  // Set the save button state
  handleRuleForm = () => {
    this.setState({
      allowSubmit: true,
    });
  };

  handleValuesChange = (val) => {
    this.setState((state) => {
      return {
        formValue: state.formValue,
      };
    }, this.handleRuleForm);
  };

  render() {
    const { visible, modalTitle, allowSubmit, confirmLoading } = this.state;

    return (
      <div className="page-content-wrap">
        <PageHeader title="Product Config" ghost={false} />
        <div className="main-page-content">
          <CustomTable ref={this.formTable} {...TABLE_CONFIG()} handleAction={this.handleAction} />
        </div>

        <Modal
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          title={modalTitle}
          cancelText="Cancel"
          okText="Save"
          okButtonProps={{
            disabled: !allowSubmit,
          }}
          confirmLoading={confirmLoading}
          width={1400}
        >
          <Form
            {...layout}
            requiredMark={false}
            ref={this.formRef}
            name="control-ref"
            onValuesChange={this.handleValuesChange}
          ></Form>
        </Modal>
      </div>
    );
  }
}
