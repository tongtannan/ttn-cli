import React, { useState } from 'react';
import { Result, Button } from 'antd';

type Props = {
  subTitle?: string;
  buttonText?: string;
  retryFn?: () => void;
};

const Error = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const switchLoading = () => setLoading((oldState) => !oldState);

  const handleRetry = async () => {
    switchLoading();
    props.retryFn && (await props.retryFn());
    switchLoading();
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle={props.subTitle}
      extra={
        props.retryFn ? (
          <Button type="primary" loading={loading} onClick={handleRetry}>
            {props.buttonText}
          </Button>
        ) : null
      }
    />
  );
};

Error.defaultProps = {
  subTitle: 'Sorry, something went wrong.',
  buttonText: 'Retry',
};

export default Error;
