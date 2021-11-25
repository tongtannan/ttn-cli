import React, { useCallback, useState } from 'react';
import { Result } from 'antd';

// import { logout } from '@/utils';
type Props = Record<string, never>;

const NotFound: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const switchAccount = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    // const [e] = await logout();
    setLoading(false);

    // if (e) {
    //   return message.error(e.message || 'Unkonwn error');
    // }
    window.location.reload();
  }, [loading]);

  return (
    <Result
      status="500"
      extra={
        <>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>You do not have access to Content QC Platform </div>
          <div style={{ fontSize: '16px', color: 'rgba(77, 74, 74, 0.65)' }}>
            Contact your team leader for help or{' '}
            <span style={{ cursor: 'pointer', color: '#2673dd' }} onClick={switchAccount}>
              switch account
            </span>
            .
          </div>
        </>
      }
    />
  );
};

export default NotFound;
