import React, { CSSProperties } from 'react';
import { Spin } from 'antd';

const spinContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '150px',
};

interface Props {
  style?: CSSProperties;
}

const Loading: React.FC<Props> = ({ style = {} }) => (
  <div style={{ ...spinContainerStyle, ...style }}>
    <Spin size="large" />
  </div>
);

export default Loading;
