export interface BaseResp {
  code?: number;
}

export interface RespError {
  name: string;
  message: string;
  stack?: string;
}

export interface BaseParams {
  limit?: string | string[];
  offset?: string | string[];
}
