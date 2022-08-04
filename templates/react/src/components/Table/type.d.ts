import type { ColumnsType, TableProps } from 'antd/es/table';

export interface DataType {
  [propName: string]: any;
}

export type Pageination = {
  hide?: boolean;
  limit?: number;
  pageSizeOptions?: Array<number>;
};

export type ProTableRequestParams = {
  offset: number;
  limit: number;
  filters?: any;
  sortAsc?: boolean;
  sortField: string | undefined;
};

interface ProTableProps extends TableProps<object> {
  style?: React.CSSProperties;
  rowKey: string;
  showIndex?: boolean;
  requestApi: (params: ProTableRequestParams) => Promise<any>;
  columns: ColumnsType<DataType>;

  paginationConfig?: Pageination;
}

export type FetchDataParams = {
  offset?: number;
  pageSize?: number;
  filters?: any;
  sortAsc?: boolean;
  sortField?: string;
  callback?: () => void;
};

export type RefType = {
  fetchData: (params: FetchDataParams) => void;
  resetPagination: () => void;
};
