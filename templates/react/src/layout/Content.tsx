import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import { routerFlatten } from '@/router/router.config';

class Content extends React.Component {
  render() {
    return (
      <Routes>
        {routerFlatten.map((r) => (
          <Route key={r.path} path={r.path} element={r.component} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}

export default Content;
