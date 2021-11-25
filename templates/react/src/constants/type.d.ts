import { ColumnsType } from 'antd/es/table';

export enum PermissionKeys {
  TEST_MANAGEMENT_MGMT_READ = 'test_management.mgmt.read',
  TEST_MANAGEMENT_MGMT_WRITE = 'test_management.mgmt.write',
}

export enum FormItemType {
  ITEM = 'item',
  LIST = 'list',
}

export enum ActionType {
  DEFAULT_GET = 'default_get',
  DEFAULT_ADD = 'default_add',
  DEFAULT_EDIT = 'default_edit',
  DEFAULT_DELETE = 'default_delete',
}

export enum FormType {
  TEXT = 'text',
  INPUT = 'input',
  INPUT_NUMBER = 'input_number',
  DADIO = 'radio',
  CHECKBOX = 'checkbox',
}
// form
export interface TableFormType {
  show: boolean;
  type?: FormType | string;
  extra?: string;
  disabledEdit?: boolean;
  render?: any;
}

export interface TableColumnsType extends ColumnsType {
  title: string;
  key?: string;
  dataIndex?: string;
  width?: number;
  fixed?: string;
  render?: any;
  form?: TableFormType;
}
// btns
interface TableBtnListType {
  id: number;
  type: string;
  icon: any;
  label: string;
  title: string;
  action: ActionType | string;
}

export interface TableBtnsType {
  show: boolean;
  list?: Array<TableBtnListType>;
}
// action
interface TableActionListType {
  id: number;
  label: string;
  title: string;
  action: ActionType | string;
  disabled: boolean;
}

export interface TableActionsType {
  show: boolean;
  list?: Array<TableActionListType>;
}

// api
interface TableApiType {
  [propName: string]: any;
}

export interface QcRuleListType {
  label: string;
  value: string;
  disabled?: boolean;
}
