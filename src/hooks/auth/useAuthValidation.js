import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useAuthValidation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const enableRoutes = process.env.REACT_APP_ENABLED_ROUTE?.split(",");
    const ide = JSON.parse(localStorage.getItem("academind_passport"));

    if (
      enableRoutes.some(
        (route) => route === pathname || pathname.startsWith(route)
      ) &&
      !ide
    )
      navigate("/authentication/login");
  }, [pathname, navigate]);
}

export default useAuthValidation;
