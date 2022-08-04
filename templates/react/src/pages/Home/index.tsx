import React, { memo, useEffect, useRef } from 'react';
import { Button } from 'antd';

import { Table, RefType, ProTableRequestParams } from '@/components';
import { post } from '@/api/test';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'qc_time',
    dataIndex: 'qc_time',
    sorter: true,
  },
  {
    title: 'Address',
    dataIndex: 'content_id',
  },
];

export default memo(() => {
  const tableRef = useRef<RefType>(null);

  const request = async (params: ProTableRequestParams) => {
    const { offset, limit, filters, sortAsc, sortField } = params;
    console.log(offset, limit, filters, sortAsc, sortField);
    const [e, res] = await post({
      params: {
        biz_id: 100,
        product_id: 100,
      },
      data: {
        offset,
        limit,
      },
    });
    if (e) return [e, null];
    return [
      null,
      {
        data: res.tasks,
        total: res.total,
      },
    ];
  };

  const reset = () => tableRef.current!.resetPagination();

  return (
    <div>
      <Table rowKey="task_id" columns={columns} requestApi={request} ref={tableRef} bordered paginationConfig={{}} />

      <Button onClick={reset}>reset</Button>
    </div>
  );
});
