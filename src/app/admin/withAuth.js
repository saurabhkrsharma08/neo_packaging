import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
          router.push('/admin/login');
          return;
        }

        try {
          await axios.get('/api/auth/check', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          router.push('/admin/login');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;