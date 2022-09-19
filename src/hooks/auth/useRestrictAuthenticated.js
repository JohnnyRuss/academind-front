import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function useRestrictAuthenticated() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const enableRoutes = process.env.REACT_APP_ENABLED_ROUTE?.split(',');

    const ide = JSON.parse(localStorage.getItem('academind_passport'));

    if (enableRoutes.some((route) => route === pathname) && ide) {
      try {
        jwt_decode(ide);
        navigate(-1);
      } catch (error) {
        navigate('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useRestrictAuthenticated;
