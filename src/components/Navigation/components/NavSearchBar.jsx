/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { useBlurOnBody, useSearchQuery } from "../../../hooks";
import { selectUserSearchResult } from "../../../store/selectors/userSelectors";

import styles from "./styles/navSearchBar.module.scss";
import { SearchBarWindow } from "./";
import { SearchBar } from "../../Layouts";

function NavSearchBar() {
  const [activeWindow, setActiveWindow] = useState(false);
  const [key, setKey] = useState("");

  const {
    searchUserQuery,
    handleResetUserSearchResultAndState,
  } = useSearchQuery();

  const handleOnBlur = useCallback(() => {
    setKey("");
    setActiveWindow(false);
    handleResetUserSearchResultAndState();
  }, []);

  const onFocusHandler = () => setActiveWindow(true);

  const { blur, onFocus } = useBlurOnBody(onFocusHandler, handleOnBlur, [
    "navigation--searchBar",
    "searchbar-window",
    "nav-searchbar--btn",
  ]);

  function onChooseHandler() {
    setKey("");
    setActiveWindow(false);
    handleResetUserSearchResultAndState();
  }

  const result = useSelector(selectUserSearchResult);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (key === "" && !result[0]) return;
      else if (key === "" && result[0])
        return handleResetUserSearchResultAndState();
      searchUserQuery(key);
    }, 1000);

    return () => clearTimeout(timer);
  }, [key]);

  return (
    <div
      className={`${styles.mainNavSearch} ${activeWindow ? styles.active : ""}`}
    >
      <SearchBar
        allowToggle={true}
        accumulator={activeWindow}
        setAccumulator={setActiveWindow}
        onFocus={onFocus}
        onChange={(e) => setKey(e.target.value)}
        value={key}
        className={styles.mainNavSearchBar}
      />
      {activeWindow && !blur && (
        <SearchBarWindow result={result} onChooseHandler={onChooseHandler} />
      )}
    </div>
  );
}

export default NavSearchBar;
