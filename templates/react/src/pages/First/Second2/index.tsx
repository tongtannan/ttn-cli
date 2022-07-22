import React, { memo, useEffect } from 'react';
import { Button } from 'antd';

import { get } from '@/api/test';
import requestCancel from '@/utils/requestCancel';

export default memo(() => {
  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    requestCancel.cancelRepeatRequest();
    get({
      biz_id: 2,
      date: 20220721,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      second
      <Button onClick={handleClick}>api</Button>
    </div>
  );
});
