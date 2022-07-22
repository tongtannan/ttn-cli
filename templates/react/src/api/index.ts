import Request, { RequestParams } from '@/utils/request';

const api = new Request();

export function getUserinfo(data: RequestParams) {
  return api.get('v1/getuserinfo', data);
}
