import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const href = useLocation();

  const push = (path: string) => navigate(path);
  const replace = (path: string) => navigate(path, { replace: true });

  return {
    href,
    push,
    replace,
  };
};
