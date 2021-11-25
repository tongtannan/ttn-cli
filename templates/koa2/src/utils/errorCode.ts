export const errorCode = {
  REQUEST_NOT_ALLOWED: {
    code: 10000,
    msg: 'Request not allowed',
  },

  UNKNOWN_ERROR: {
    code: 10001,
    msg: 'Unknown error',
  },

  NO_PERMISSION: {
    code: 10003,
    msg: 'No permission',
  },

  DATA_DUPLICATE: {
    code: 80000001,
    msg: 'Data duplication',
  },

  DATA_MISSING: {
    code: 80000002,
    msg: 'Data does not exist',
  },

  DATA_LIST: {
    code: 80000003,
    msg: 'Failed to get data list',
  },

  DATA_QUERY: {
    code: 80000004,
    msg: 'Data query failed',
  },

  DATA_UPDATE: {
    code: 80000005,
    msg: 'Data update failed',
  },

  DATA_DELETE: {
    code: 80000006,
    msg: 'Data delete failed',
  },

  DATA_SAVE: {
    code: 80000007,
    msg: 'Data save failed',
  },

  DATA_EXIST: {
    code: 80000008,
    msg: 'Data existence query failed',
  },

  PARAMETER: {
    code: 80000009,
    msg: 'Parameters are invalid',
  },

  INCONSISTENCY: {
    code: 8000010,
    msg: 'Data is inconsistent',
  },

  UNAVAILABLE: {
    code: 8000011,
    msg: 'Data is unavailable',
  },

  STATUS: {
    code: 8000012,
    msg: 'Status is wrong',
  },
};
