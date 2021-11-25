import React from 'react';
import Loadable from 'react-loadable';
import { Button } from 'antd';

import { Loading } from '@/components';

const createContainer = (loader): React.ReactNode =>
  Loadable({
    loading: (props): React.ReactNode => {
      if (props.error) {
        return (
          <div>
            Error! <Button onClick={props.retry}>Retry</Button>
          </div>
        );
      }
      return <Loading />;
    },
    loader,
  });

export default createContainer;
