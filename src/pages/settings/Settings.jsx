/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { useAboutUserQuery, useRestrictPrivateRoute } from "../../hooks";

import { SettingsContainer, SideBar } from "../../components/Settings";

function Settings() {
  useRestrictPrivateRoute();

  const activeUserId = useSelector(selectActiveUserId);

  const { getAboutUserQuery } = useAboutUserQuery();

  useEffect(() => {
    getAboutUserQuery(activeUserId);
  }, []);

  return (
    <SettingsContainer>
      <SideBar />
      <Outlet />
    </SettingsContainer>
  );
}

export default Settings;
