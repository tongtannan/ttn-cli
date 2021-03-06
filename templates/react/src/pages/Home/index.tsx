import React, { memo, useEffect } from 'react';
import { Button } from 'antd';

import demo from '@/assets/demo.png';

import { get } from '@/api/test';

export default memo(() => {
  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    get({
      biz_id: 1,
      date: 20220721,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      {/* <img src={demo} alt="demo" /> */}

      <Button onClick={handleClick}>api</Button>
    </div>
  );
});
