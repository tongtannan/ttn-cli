import React from 'react';
import { PageHeader } from 'antd';

import CustomTable from '@/components/Table/Table';
import { TABLE_CONFIG } from './config/config';

type Props = Record<string, never>;

interface State {}

export default class ShardingPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-content-wrap">
        <PageHeader title="Sharding" ghost={false} />
        <div className="main-page-content">
          <CustomTable {...TABLE_CONFIG()} />
        </div>
      </div>
    );
  }
}
