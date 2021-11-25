import React from 'react';
import ReactDom from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Layout from './layout/index';
import './styles.less';

const init = (): void => {
  const root = document.querySelector('#app');
  ReactDom.render(<Layout />, root);
};

init();
