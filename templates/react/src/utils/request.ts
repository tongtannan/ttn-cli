import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, Canceler } from 'axios';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import requestCancel, { Mode } from './requestCancel';

export type Method = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

export type RequestParams = Record<string | number | symbol, any>;

export type RequestConfig = AxiosRequestConfig;

export enum ResponseStatus {
  NOT_LOGIN = 401,
  NOT_AUTH = 403,
  NOT_FOUND = 404,
}

export enum ResponseType {
  JSON = 'json',
  BLOB = 'blob',
}

const CancelToken = Axios.CancelToken;

export default class Interface {
  public instance: AxiosInstance;

  public baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || `${window.location.protocol}//${window.location.host}/api/`;

    this.instance = Axios.create({
      baseURL: this.baseURL,
      timeout: 1000 * 10,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public fetch(
    method: Method,
    url: string,
    requestConfig: AxiosRequestConfig = {},
    useDefaultErrorToast = true,
    isRepeatRequest = false, // 重复请求场景，取消上一次未完成的请求
  ): Promise<any> {
    const id = uuidv4();

    const config = {
      method,
      url,
      ...requestConfig,
    };

    if (isRepeatRequest) {
      config.cancelToken = new CancelToken((fn: Canceler) => {
        requestCancel.push({ id, fn, mode: Mode.REPEAT });
      });
    } else if (method === 'get') {
      config.cancelToken = new CancelToken((fn: Canceler) => {
        requestCancel.push({ id, fn });
      });
    }

    return new Promise((resolve) => {
      this.instance(config)
        .then((res: AxiosResponse) => {
          const { data } = res;
          switch (requestConfig.responseType) {
            case ResponseType.BLOB:
              try {
                window.URL.createObjectURL(data);
                const fileName = res.headers['content-disposition'].split('filename=')[1];
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(data);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
              } catch (error) {}
              break;

            default:
              if (data.code === 0) {
                resolve([null, data.data]);
              } else {
                useDefaultErrorToast && message.error(data.msg);
                resolve([data]);
              }
              break;
          }
        })
        .catch((err: any) => {
          console.log('err', err);
          // 请求被取消
          if (err.code === 'ERR_CANCELED') return;

          switch (err.response?.status) {
            case ResponseStatus.NOT_LOGIN:
              const redirectUrl = err.response.data?.soup_login_url;
              window.location.href = redirectUrl;
              break;

            // case ResponseStatus.NOT_AUTH:
            //   break;

            // case ResponseStatus.NOT_FOUND:
            //   break;

            default:
              resolve([err]);
              break;
          }
        })
        .finally(() => {
          requestCancel.delete(id);
        });
    });
  }

  public get(url: string, params?: RequestParams, isRepeatRequest?: boolean): Promise<any> {
    return this.fetch(
      'get',
      url,
      {
        params,
      },
      false,
      isRepeatRequest,
    );
  }

  public download(url: string, params?: RequestParams): Promise<any> {
    return this.fetch(
      'get',
      url,
      {
        params,
        responseType: ResponseType.BLOB,
      },
      false,
    );
  }

  public post(url: string, requestConfig?: AxiosRequestConfig, useDefaultErrorToast?: boolean): Promise<any> {
    return this.fetch('post', url, requestConfig, useDefaultErrorToast);
  }

  public postFormData(url: string, requestConfig?: AxiosRequestConfig, useDefaultErrorToast?: boolean): Promise<any> {
    const data = new FormData();
    Object.entries(requestConfig?.data).forEach(([key, value]) => {
      let v: string | Blob = '';
      try {
        v = typeof value === 'string' || value instanceof Blob ? value : JSON.stringify(value);
      } catch (error) {
        v = String(v);
      }
      data.append(key, v);
    });

    return this.fetch(
      'post',
      url,
      {
        ...requestConfig,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      useDefaultErrorToast,
    );
  }

  public put(url: string, requestConfig?: AxiosRequestConfig, useDefaultErrorToast?: boolean): Promise<any> {
    return this.fetch('put', url, requestConfig, useDefaultErrorToast);
  }

  public delete(url: string, params?: RequestParams, useDefaultErrorToast?: boolean): Promise<any> {
    return this.fetch(
      'delete',
      url,
      {
        params,
      },
      useDefaultErrorToast,
    );
  }
}
