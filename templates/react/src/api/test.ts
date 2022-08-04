import Request, { RequestParams, RequestConfig } from '@/utils/request';

const api = new Request();

export function get(data: RequestParams) {
  return api.get('v1/dashboard/overall', data, true);
}

export function post(data: RequestConfig) {
  return api.post('v1/qc/tasks', data);
}

export function formPost(data: RequestConfig) {
  return api.postFormData('v1/upload/words', data);
}

export function testDelete(data: RequestParams) {
  return api.delete('v1/upload/words', data);
}

export function download(data: RequestParams) {
  return api.download('v1/download/content_performances/record', data);
}
