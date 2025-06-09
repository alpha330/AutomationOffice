// hooks/useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { LOGOUT_ACTION } from '@/actions/authActions';

const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      // توکن نداریم، کاربر رو بیرون بنداز
      dispatch(LOGOUT_ACTION());
      router.push('/login'); // مسیر لاگینت رو تنظیم کن
    }

  }, []);
};

export default useAuth;
