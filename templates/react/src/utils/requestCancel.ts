import { Canceler } from 'axios';

export enum Mode {
  NORMAL = 'normal',
  REPEAT = 'repeat',
}

export interface Cancel {
  mode?: Mode;
  id: number;
  fn: Canceler;
}

class RequestCancel {
  public cancelList: Array<Cancel>;

  constructor() {
    this.cancelList = [];
  }

  public push(cancel: Cancel): void {
    this.cancelList.push(cancel);
  }

  public delete(id: number) {
    const idx = this.cancelList.findIndex((item) => item.id === id);
    idx > -1 && this.cancelList.splice(idx, 1);
  }

  public cancelRepeatRequest() {
    const list = this.cancelList.filter((item) => item.mode === Mode.REPEAT);
    this.cancelRequest(list);
  }

  public cancelRequest(list?: Array<Cancel>) {
    list = list || this.cancelList;
    while (list.length) {
      const cancel = list.pop();
      cancel!.fn && cancel!.fn();
    }
  }

  public clear() {
    this.cancelList = [];
  }
}

const requestCancel = window.requestCancel || (window.requestCancel = new RequestCancel());
export default requestCancel;
