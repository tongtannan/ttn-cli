import React from 'react';
import { Table, Space, Button, Modal, message } from 'antd';

// import Modal from './Modal/Modal';
import CustomForm from './Form/Form';
import { DEFAULT_PAGINATION } from '@/constants/data.default';
import { ActionType, TableBtnsType, TableActionsType, TableApiType } from '@/constants/type.d';

interface Props {
  rowKey?: string;
  showIndex: boolean;
  showPagination: boolean;
  bordered?: boolean;

  columns: Array<any>;
  btns: TableBtnsType;
  actions: TableActionsType;

  api: TableApiType;
  rebuildDataCallback?: (data: any) => any;

  paginationConfig?: object;

  handleAction?: any;

  useDefaultModal: boolean;
}

interface State {
  dataSource: Array<any>;
  showLoading: boolean;
  pagination: any;
  // modal
  visible: boolean;
  modalAction: ActionType | string;
  modalTitle: string;

  allowSubmit: boolean;
}

export default class CustomTable extends React.Component<Props, State> {
  customFormRef: any;

  static defaultProps = {
    rowKey: 'id',
    showIndex: true,
    showPagination: true,
    bordered: true,
    columns: [],
    paginationConfig: {},
  };

  constructor(props: Props) {
    super(props);

    this.customFormRef = React.createRef();

    this.state = {
      dataSource: [],
      showLoading: false,
      pagination: Object.assign(DEFAULT_PAGINATION, this.props.paginationConfig),
      visible: false,
      modalAction: '',
      modalTitle: '',
      allowSubmit: false,
    };
  }

  componentDidMount = () => {
    this.loadDataSource();
  };

  // Load table data
  loadDataSource = async () => {
    this.setState({
      showLoading: true,
    });

    const { fn, listKey } = this.props.api[ActionType.DEFAULT_GET];
    const { rebuildDataCallback } = this.props;
    let { pagination } = this.state;

    const requestParams = {
      limit: pagination ? pagination.pageSize : '',
      offset: pagination ? pagination.offset : 0,
    };

    const [e, res] = await fn({
      query: requestParams,
    });
    this.setState({
      showLoading: false,
    });
    if (e) {
      this.setState({
        dataSource: [],
        pagination: Object.assign(DEFAULT_PAGINATION, this.props.paginationConfig),
      });
      return false;
    }

    const resData = rebuildDataCallback ? rebuildDataCallback(res[listKey]) : res[listKey];
    if (this.props.showPagination) {
      pagination = { ...pagination, total: res.total };
    }
    this.setState({
      dataSource: resData,
      pagination,
    });
  };

  openDefaultModal = (item: any, record: any) => {
    this.setState(
      () => ({
        visible: true,
        modalTitle: item.title,
        modalAction: item.action,
      }),
      () => this.setCustomFormData(record),
    );
  };

  setCustomFormData = (record) => {
    (this.customFormRef.current as any).setFormData(record);
  };

  handleAction = (item: any, record = null): void => {
    const cloneRecord = JSON.parse(JSON.stringify(record));

    switch (item.action) {
      case ActionType.DEFAULT_ADD:
        this.openDefaultModal(item, cloneRecord);
        break;

      case ActionType.DEFAULT_EDIT:
        this.openDefaultModal(item, cloneRecord);
        break;

      default:
        this.props.handleAction(item, cloneRecord);
        break;
    }
  };

  // Pagination
  handlePaginationChange = (page, filters, sorter) => {
    const { current, pageSize } = page;
    const { order, field } = sorter;

    this.setState(
      (oldState) => ({
        pagination: {
          ...oldState.pagination,
          current,
          pageSize,
          offset: (current - 1) * pageSize,
          sortAsc: order === 'ascend',
          filters,
          field,
        },
      }),
      this.loadDataSource,
    );
  };

  // Operation button
  renderBtns = (list) =>
    list.map((item) => (
      <Space size="middle" key={item.id}>
        <Button {...item} onClick={() => this.handleAction(item)}>
          {item.label}
        </Button>
      </Space>
    ));

  // Action col
  renderActions = (text, record): React.ReactNode =>
    this.props.actions.list.map((item) => (
      <Button type="link" key={item.id} onClick={() => this.handleAction(item, record)} disabled={item.disabled}>
        {item.label}
      </Button>
    ));

  handleOk = () => {
    const { modalAction } = this.state;
    (this.customFormRef.current as any).getFormData().then((data) => {
      const [e] = this.props.api[modalAction]({
        body: data,
      });
      if (!e) {
        message.success('save successfully');
        this.handleCancel();
        this.loadDataSource();
      }
    });
  };

  handleCancel = () => {
    this.customFormRef.current.resetFormData();
    this.setState({
      visible: false,
    });
  };

  // Set the save button state
  setAllowSubmit = (val: boolean) => {
    this.setState({
      allowSubmit: val,
    });
  };

  render(): React.ReactNode {
    const { columns, showIndex, btns, useDefaultModal } = this.props;
    const cloneColumns = columns.slice();
    const { dataSource, showLoading, pagination, visible, modalTitle, modalAction, allowSubmit } = this.state;

    if (showIndex) {
      cloneColumns.unshift({
        title: '#',
        dataIndex: '',
        width: 60,
        render: (text, record, index) => <div>{pagination.offset + index + 1}</div>,
      });
    }
    if (this.props.actions.show) {
      cloneColumns.push({
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: (text, record) => <Space size="middle">{this.renderActions(text, record)}</Space>,
      });
    }

    return (
      <div className="table-page" style={{ padding: '25px' }}>
        {btns.show && (
          <div
            className="table-btns"
            style={{
              textAlign: 'end',
              marginBottom: '16px',
            }}
          >
            {this.renderBtns(btns.list)}
          </div>
        )}

        <Table
          {...this.props}
          columns={cloneColumns}
          dataSource={dataSource}
          loading={showLoading}
          pagination={this.props.showPagination ? pagination : false}
          onChange={(page, filters, sorter) => this.handlePaginationChange(page, filters, sorter)}
        />

        {useDefaultModal && (
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
            width={700}
          >
            <CustomForm
              columns={cloneColumns}
              modalAction={modalAction}
              ref={this.customFormRef}
              setAllowSubmit={this.setAllowSubmit}
            />
          </Modal>
        )}
      </div>
    );
  }
}
