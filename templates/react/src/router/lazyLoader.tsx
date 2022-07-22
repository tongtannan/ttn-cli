import React from 'react';
import loadable from '@loadable/component';

import ErrorBoundary from './ErrorBoundary';

export default (loader: any): React.ReactNode => {
  const Component = loadable(loader, {
    fallback: <div>Loading...</div>,
  });

  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
};
