import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '@/pages/NotFound';

import { getFlattenRouter } from '../router/helper';

type Props = Record<string, never>;

const RouterContent: React.FC<Props> = () => {
  const router = getFlattenRouter();

  return (
    <Switch>
      {router.map((r) => (
        <Route key={r.path} path={r.path} component={r.component} exact={r.exact} />
      ))}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default RouterContent;
