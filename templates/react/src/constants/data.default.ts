export const DEFAULT_PAGINATION = {
  showSizeChanger: true,
  pageSize: 10,
  current: 1,
  offset: 0,
  pageSizeOptions: ['10', '20', '30', '40', '50'],
  position: ['bottomRight'],
  showTotal: (total) => `Total ${total} items`,
  total: 0,
};
