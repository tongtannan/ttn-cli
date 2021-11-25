import React from 'react';
import { Input } from 'antd';

interface Props {
  value: string;
  onChange: any;
  form: any;
}

interface State {}

export default class CustomText extends React.Component<Props, State> {
  static defaultProps = {
    value: '',
    form: {},
  };

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const { value, form } = this.props;

    return <Input value={value} {...form.config} bordered={false} readOnly />;
  }
}
