import React from 'react';
import Loadable from 'react-loadable';
import LoadableComponent from '@loadable/component';
import { Button } from 'antd';

import { Loading } from '@/components';

const isDev = process.env.NODE_ENV === 'development';

const createContainer = (loader): React.ReactNode => {
  if (isDev) return LoadableComponent(loader);

  return Loadable({
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
}

export default createContainer;
