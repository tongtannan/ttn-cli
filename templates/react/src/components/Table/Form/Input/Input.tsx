import React from 'react';
import { Input } from 'antd';

interface Props {
  value: string;
  onChange: any;
  form: any;
  disabled: boolean;
}

interface State {}

export default class CustomInput extends React.Component<Props, State> {
  static defaultProps = {
    value: '',
    form: {},
  };

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { value, disabled, form } = this.props;

    return <Input value={value} onChange={this.handleChange} disabled={disabled} {...form.config} />;
  }
}
