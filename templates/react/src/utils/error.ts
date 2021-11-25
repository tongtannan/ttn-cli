import { message } from 'antd';

function getErrorMsg(code) {
  switch (code) {
    // Database error
    case 69900000:
      return 'Data error';

    default:
      return '';
  }
}

export function checkError(res, useDefaultErrorToast: boolean) {
  if (useDefaultErrorToast) {
    const { code, msg } = res;

    const errorMsg = getErrorMsg(code) || msg;

    message.error(errorMsg);
  }
}
