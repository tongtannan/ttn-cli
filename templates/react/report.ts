/*
 * @Author: TTN
 * @Date: 2022-07-21 16:12:30
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-07-21 16:12:30
 * @FilePath: /qcadmin/Users/tannan.tong/Desktop/projects/react-template/report.ts
 */
import { EXPIRES_TIME } from '../config';
import { getTimestamp, getLocationHref, validateOption, _support, generateUUID } from '../utils';
import { BreadcrumbPushData, InitOptions, RecortType, ReportCategoryType } from '../types';

export default class Report {
  maxCount = 100;

  expiresTime = 0;

  needClear = false;

  stack: Array<BreadcrumbPushData> = [];

  constructor() {}

  push(data: BreadcrumbPushData) {
    this.clear();
    this.immediatePush(data);
  }

  immediatePush(data: BreadcrumbPushData) {
    const time = getTimestamp();
    data.id = data.id || (data.id = generateUUID());
    data.time = data.time || (data.time = time);
    data.expiresTime = new Date(time + this.expiresTime);
    data.url = data.url || (data.url = getLocationHref());

    if (this.stack.length >= this.maxCount) {
      this.shift();
    }

    this.stack.push(data);
  }

  clear() {
    if (this.needClear) {
      this.needClear = false;
      this.stack = [];
    }
  }

  shift(): boolean {
    return this.stack !== undefined;
  }
  // send后 下次push的时候清空stack
  getStack(): Array<BreadcrumbPushData> {
    this.needClear = true;
    return this.stack;
  }

  getCategory(type: RecortType) {
    switch (type) {
      case RecortType.XHR:
      case RecortType.FETCH:
        return ReportCategoryType.HTTP;
      case RecortType.CLICK:
      case RecortType.DBCLICK:
      case RecortType.ROUTE:
      case RecortType.TIMEOUT:
        return ReportCategoryType.USER;
      case RecortType.CUSTOMER:
      case RecortType.CONSOLE:
        return ReportCategoryType.DEBUG;
      case RecortType.UNHANDLEDREJECTION:
      case RecortType.CODE_ERROR:
      case RecortType.RESOURCE:
      case RecortType.VUE:
      case RecortType.REACT:
      default:
        return ReportCategoryType.EXCEPTION;
    }
  }

  bindOptions(paramOptions: InitOptions = {}) {
    const { maxCount = 10, expiresTime } = paramOptions;
    validateOption(maxCount, 'maxCount', 'Number') && (this.maxCount = maxCount);
    validateOption(expiresTime, 'expiresTime', 'Number') && (this.expiresTime = expiresTime);
  }
}

const report = _support.report || (_support.report = new Report());

export { report };
