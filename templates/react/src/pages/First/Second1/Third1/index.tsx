import React from 'react';

import { RoutePath } from '@/router/type.d';
import UseHistory from '@/router/UseHistory';

export default () => {
  const history = UseHistory();

  const handleClick = () => {
    history.push(RoutePath.THIRD_1_DETAIL);
  };

  return <div onClick={handleClick}>Third-One</div>;
};
