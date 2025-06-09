// hooks/useLoginStatus.js
import { useEffect, useState } from 'react';
import { getToken, getMobile } from '@/utils/auth';

const useLoginStatus = () => {
  const [status, setStatus] = useState({ loggedIn: false, mobile: null });

  useEffect(() => {
    const token = getToken();
    const mobile = getMobile();
    if (token && mobile) {
      setStatus({ loggedIn: true, mobile });
    } else {
      setStatus({ loggedIn: false, mobile: null });
    }
  }, []);

  return status;
};

export default useLoginStatus;
