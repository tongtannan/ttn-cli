import { formatMap } from '@/utils/util';

export const PROJECT_MAP = {
  1: 'Offline',
  2: 'Online',
};

export const QC_MODE_MAP = {
  1: '1 task per page',
  2: 'N tasks per page',
};

export const LEVEL_MAP = {
  1: '1 level',
  2: '2 levels',
};

export const CALLBACK_TYPE_MAP = {
  1: 'spex',
  2: 'kafka',
};

export const PROJECT_LIST = formatMap(PROJECT_MAP);
export const QC_MODE_LIST = formatMap(QC_MODE_MAP);
export const LEVEL_LIST = formatMap(LEVEL_MAP);
export const CALLBACK_TYPE_LIST = formatMap(CALLBACK_TYPE_MAP);
