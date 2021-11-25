import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { apiGetConfigs } from '@/api/template';
import { PROJECT_MAP, QC_MODE_MAP, LEVEL_MAP,  } from '@/constants/project';
import { hasPermission } from '@/utils/getPermissions';
import { ActionType, PermissionKeys } from '@/constants/type.d';

const HAS_WRITE_PERMISSION = hasPermission(PermissionKeys.TEST_MANAGEMENT_MGMT_WRITE);

export enum ProduceActionType {
  ADD = 'add',
  EDIT = 'edit',
}

export const TABLE_CONFIG = () => {
  const config = {
    rowKey: 'product_idx',
    showIndex: true,
    showPagination: true,
    columns: [
      {
        title: 'Business Name',
        dataIndex: 'biz_name',
      },
      {
        title: 'Business ID',
        dataIndex: 'biz_id',
      },
      {
        title: 'Product Name',
        dataIndex: 'product_name',
      },
      {
        title: 'Product ID',
        dataIndex: 'product_id',
      },
      {
        title: 'Product Type',
        dataIndex: 'product_type',
        render: (text) => PROJECT_MAP[text],
      },
      {
        title: 'QC Mode',
        dataIndex: 'qc_mode',
        render: (text) => QC_MODE_MAP[text],
      },
      {
        title: 'Violation Level',
        dataIndex: 'violation_level',
        render: (text) => LEVEL_MAP[text],
      },
      {
        title: 'QC Role',
        dataIndex: 'qc_roles',
        render: (text) =>
          text.map((item, idx) => (
            // eslint-disable-next-line
            <div key={idx}>
              <span>{item}</span>
              <br />
            </div>
          )),
      },
      {
        title: 'Kafka Topic',
        dataIndex: 'access_kafkas',
        render: (text) => {
          if (!text) return;

          return (
            <>
              {text.map((item) => (
                <div key={item.id}>{item.topic}</div>
              ))}
            </>
          );
        },
      },
      {
        title: 'Callback',
        dataIndex: 'callback_config',
        render: (text) =>
          (text.config_kafka && text.config_kafka.brokers) || (text.config_spex && text.config_spex.cmd),
      },
      {
        title: 'Region',
        dataIndex: 'access_kafkas',
        render: (text) => {
          if (!text) return;

          return (
            <>
              {text.map((item) => (
                <div key={item.id}>{item.regions.join(',')}</div>
              ))}
            </>
          );
        },
      },
    ],
    btns: {
      show: true,
      list: [
        {
          id: 1,
          type: 'primary',
          icon: <PlusOutlined />,
          label: 'Add Product',
          title: 'Add Product',
          action: ProduceActionType.ADD,
          disabled: !HAS_WRITE_PERMISSION,
        },
      ],
    },
    actions: {
      show: true,
      list: [
        {
          id: 1,
          label: 'Edit',
          title: 'Edit Product',
          action: ProduceActionType.EDIT,
          disabled: !HAS_WRITE_PERMISSION,
        },
      ],
    },
    api: {
      [ActionType.DEFAULT_GET]: {
        fn: apiGetConfigs,
        listKey: 'product_configs',
      },
    },
    rebuildDataCallback: (data) => {
      // product_idx for key
      data.forEach((item: any) => {
        const newItem = item;
        newItem.product_idx = `${item.biz_id},${item.product_id}`;
      });
      return data;
    },
    useDefaultModal: false,
  };

  return config;
};

export const RULE_LIST = [
  {
    key: 'biz_name',
    type: 'string',
  },
  {
    key: 'biz_id',
    type: 'string',
  },
  {
    key: 'product_name',
    type: 'string',
  },
  {
    key: 'product_id',
    type: 'string',
  },
  {
    key: 'product_type',
    type: 'string',
  },
  {
    key: 'qc_mode',
    type: 'string',
  },
  {
    key: 'violation_level',
    type: 'string',
  },
  {
    key: 'qc_roles',
    type: 'array',
  },
];
export const RULE_LIST_KAFKAS = RULE_LIST.concat([
  {
    key: 'access_kafkas',
    type: 'array',
    // eslint-disable-next-line
    // @ts-ignore
    children: [
      {
        key: 'brokers',
        type: 'string',
      },
      {
        key: 'topic',
        type: 'string',
      },
      {
        key: 'group',
        type: 'string',
      },
      {
        key: 'regions',
        type: 'array',
      },
    ],
  },
]);

export const INITIAL_VALUES = {
  product_type: 1,
  qc_mode: 1,
  violation_level: 1,
  access_kafkas: [],
  callback_config: {
    // callback_type: 1,
    config_spex: {
      cmd: '',
      region_split: false,
    },
    config_kafka: {},
  },
};
