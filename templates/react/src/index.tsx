import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// import './DataStore/index';

import Layout from './layout/index';
import './index.less';

const init = (): void => {
  const container = document.getElementById('app');
  const root = createRoot(container!);
  root.render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>,
  );
};

init();
