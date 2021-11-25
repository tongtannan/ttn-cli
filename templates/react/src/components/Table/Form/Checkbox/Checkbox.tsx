import React from 'react';
import { Checkbox } from 'antd';

interface Props {
  value: Array<any>;
  onChange: any;
  form: any;
  disabled: boolean;
}

interface State {}

export default class CustomCheckbox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const { value, onChange, disabled, form } = this.props;

    return <Checkbox.Group options={form.render.list} disabled={disabled} value={value} onChange={onChange} />;
  }
}
