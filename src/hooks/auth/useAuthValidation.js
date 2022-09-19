import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function useAuthValidation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const enableRoutes = process.env.REACT_APP_ENABLED_ROUTE?.split(',');

    const ide = JSON.parse(localStorage.getItem('academind_passport'));

    if (!enableRoutes.some((route) => route === pathname) && !ide) navigate('/');
    else if (ide) {
      try {
        jwt_decode(ide);
      } catch (error) {
        navigate('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useAuthValidation;
