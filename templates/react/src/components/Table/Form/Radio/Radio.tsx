import React from 'react';
import { Radio } from 'antd';

interface Props {
  value: string;
  onChange: any;
  form: any;
  disabled: boolean;
}

interface State {}

export default class CustomRadio extends React.Component<Props, State> {
  static defaultProps = {
    value: '',
  };

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  };

  renderRadio = () =>
    this.props.form.render.list.map((item) => (
      <Radio value={item.value} key={item.value}>
        {item.label}
      </Radio>
    ));

  render() {
    const { value, disabled } = this.props;

    return (
      <Radio.Group disabled={disabled} value={value} onChange={this.handleChange}>
        {this.renderRadio()}
      </Radio.Group>
    );
  }
}
