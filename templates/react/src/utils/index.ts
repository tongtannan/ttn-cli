import request from './request';
import getIn from './getIn';

export * from './url';
export * from './request';
export { request, getIn };

// export const logout = () => {};
export const logout = () => request('/v1/agent/logout', { method: 'POST' });
