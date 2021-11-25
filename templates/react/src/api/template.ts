import request, { Options } from '../utils/request';

const url = '/v1/template/';
export const apiGetConfigs = (opts: Options): Promise<any> => request(`${url}configs`, { ...opts });
export const apiPostConfig = (opts: Options): Promise<any> => request(`${url}config`, { ...opts, method: 'POST' });
export const apiPutConfig = (opts: Options): Promise<any> => request(`${url}config`, { ...opts, method: 'PUT' });
