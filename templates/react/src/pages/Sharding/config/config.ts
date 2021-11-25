import { apiGetConfigs } from '@/api/template';
import { ActionType } from '@/constants/type.d';

export const TABLE_CONFIG = () => {
  const config = {
    rowKey: 'product_id',
    showIndex: true,
    showPagination: false,
    columns: [
      {
        title: 'Business ID',
        dataIndex: 'biz_id',
      },
      {
        title: 'Product ID',
        dataIndex: 'product_id',
      },
      {
        title: 'Sharding',
        dataIndex: 'sharding',
      },
    ],
    btns: {
      show: false,
    },
    actions: {
      show: false,
    },
    api: {
      [ActionType.DEFAULT_GET]: {
        fn: apiGetConfigs,
        listKey: 'shardings',
      },
    },
    rebuildDataCallback: null,
    useDefaultModal: false,
  };

  return config;
};
