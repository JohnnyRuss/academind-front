import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useRestrictAuthenticated() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const enableRoutes = process.env.REACT_APP_ENABLED_ROUTE?.split(',');

    const ide = JSON.parse(localStorage.getItem('academind_passport'));
    if (enableRoutes.some((route) => route === pathname) && ide) navigate(-1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useRestrictAuthenticated;
