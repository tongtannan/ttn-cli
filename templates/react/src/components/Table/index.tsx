import React, { useMemo, useState, useEffect, useImperativeHandle, forwardRef, Ref } from 'react';
import { Table } from 'antd';

import Error from '../Error';
import { DataType, Pageination, ProTableProps, FetchDataParams, RefType } from './type.d';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

const getDefaultPagination = (paginationConfig: Pageination) => ({
  total: 0,
  current: 1,
  offset: 0,
  limit: paginationConfig.limit || DEFAULT_LIMIT,
});

const ProTable = forwardRef((props: ProTableProps, ref: Ref<RefType>) => {
  console.log('ProTable', props);
  const { rowKey, showIndex, requestApi, columns, paginationConfig, ...reset } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [paginationState, setPaginationState] = useState(getDefaultPagination(paginationConfig!));

  const needPagination = useMemo(() => !paginationConfig!.hide, [paginationConfig]);

  const initColumns = useMemo(() => {
    const res = [];
    if (showIndex) {
      res.push({
        title: '#',
        dataIndex: '',
        width: 60,
        render: (text: any, record: DataType, index: number) => <div>{paginationState.offset + index + 1}</div>,
      });
    }
    return Object.assign([], columns, res);
  }, [columns, paginationState]);

  const handlePagination = (page: number, pageSize: number) => {
    const offset = Math.max(0, (page - 1) * pageSize);
    setPaginationState((oldState) => {
      return {
        ...oldState,
        current: page,
        limit: pageSize,
        offset,
      };
    });
    fetchData({ offset, pageSize });
  };

  const initPagination = useMemo(() => {
    if (!needPagination) return false;

    return {
      total: paginationState.total,
      current: paginationState.current,
      pageSize: paginationState.limit,
      pageSizeOptions: paginationConfig!.pageSizeOptions || DEFAULT_PAGE_SIZE_OPTIONS,
      showTotal: (total: number) => `Total ${total} items`,
      onChange: handlePagination,
    };
  }, [paginationState]);

  const resetPagination = () => {
    setPaginationState(getDefaultPagination(paginationConfig!));
    fetchData();
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    fetchData({
      filters,
      sortAsc: sorter.order === 'ascend',
      sortField: sorter.field === undefined ? undefined : sorter.field,
    });
  };

  const fetchData = async (params?: FetchDataParams) => {
    const {
      offset = paginationState.offset,
      pageSize = paginationState.limit,
      filters,
      sortAsc,
      sortField,
    } = params || {};
    setLoading(true);
    const [e, res] = await requestApi({ limit: pageSize, offset, filters, sortAsc, sortField });
    setError(!!e);
    if (!e) {
      const { data, total } = res;
      data.forEach((item: DataType) => {
        item.key = item[rowKey];
      });
      setDataSource(data);

      needPagination &&
        setPaginationState((oldState) => {
          return {
            ...oldState,
            total,
          };
        });
    }
    setLoading(false);
  };

  useImperativeHandle(ref, () => ({
    fetchData,
    resetPagination,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  return error ? (
    <Error retryFn={fetchData} />
  ) : (
    <div
      style={{
        padding: 10,
        ...props.style,
      }}
    >
      <Table
        loading={loading}
        columns={initColumns}
        dataSource={dataSource}
        pagination={initPagination}
        onChange={handleChange}
        {...reset}
      />
    </div>
  );
});

ProTable.defaultProps = {
  style: {},
  showIndex: true,
  paginationConfig: {},
};

export default ProTable;
