import { BASE_URL } from '@/constants';
import { mergeQueryInUrl } from './url';
import { checkError } from './error';

const API_TIMEOUT = 10000;

export interface Options {
  query?: Record<string, string | number | boolean>;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, any>;
  useFormData?: boolean;
  useDefaultErrorToast?: boolean;
}

interface FetchOptType {
  method: string;
  body?: Record<string, any>;
  headers?: Record<string, any>;
}

const isDev = process.env.NODE_ENV === 'development';

export default (url: string, options: Options = {}): Promise<any> => {
  const {
    query = {},
    method = 'GET',
    body = {},
    headers = {},
    useFormData = false,
    useDefaultErrorToast = true,
    ...rest
  } = options;
  const endpoint = mergeQueryInUrl(`${BASE_URL}${url}`, query);
  const opts: FetchOptType = {
    method: method.toUpperCase(),
  };
  if (body && opts.method !== 'GET') {
    opts.body = useFormData ? body : JSON.stringify(body);
  }

  opts.headers = {
    'Content-Type': 'application/json',
    ...headers,
  };

  let requestTimeout = null;
  return Promise.race([
    fetch(endpoint, {
      ...rest,
      ...opts,
    } as RequestInit),
    new Promise((resolve, reject) => {
      requestTimeout = setTimeout(() => {
        const error = new Error('request time out, please try again!');
        reject(error);
      }, API_TIMEOUT);
    }),
  ])
    .then((res: Response) => {
      window.clearTimeout(requestTimeout);
      if (res.status === 401) {
        throw Object.assign(new Error(res.statusText), {
          status: res.status,
          response: res.text(),
          message: res.statusText,
        });
      }
      const isJson = res.headers && (res.headers.get('Content-Type') || '').includes('application/json');
      if (res.ok && isJson) {
        return res.json();
      }
      if (res.ok && res.text) {
        return res.text();
      }

      throw Object.assign(new Error(res.statusText), {
        status: res.status,
        response: isJson ? res.json() : res.text(),
        message: res.statusText,
      });
    })
    .then((res) => {
      if (res.code) {
        checkError(res, useDefaultErrorToast);
        // This code should be the corresponding business error code
        return [{ ...res, message: res.message || res.msg }];
      }
      return [undefined, res.data];
    })
    .catch((e) => {
      if (e.response) {
        return e.response.then((res) => {
          if (e.status === 401) {
            const arr = res.split(/[\n]/);
            const urlObject = JSON.parse(arr[0]);
            // const msgObject = JSON.parse(arr[1]);
            const msg = isDev ? e.message || 'User not login' : 'redirect';
            window.location.href = urlObject.soup_login_url;
            // if (!isDev) {}
            return [{ message: msg }];
          }

          return [res];
        });
      }
      return [e];
    });
};
