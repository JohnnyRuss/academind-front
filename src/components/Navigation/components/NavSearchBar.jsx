import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  searchUser,
  resetSearchResult,
} from "../../../store/reducers/userReducer";
import { useBlurOnBody } from "../../../hooks";
import { selectUserSearchResult } from "../../../store/selectors/userSelectors";

import styles from "./styles/navSearchBar.module.scss";
import { SearchBarWindow } from "./";
import { SearchBar } from "../../Layouts";

function NavSearchBar() {
  const dispatch = useDispatch();

  const [activeWindow, setActiveWindow] = useState(false);
  const [key, setKey] = useState("");

  const handleOnBlur = useCallback(() => {
    setKey("");
    setActiveWindow(false);
    dispatch(resetSearchResult());
  }, [dispatch]);

  const onFocusHandler = () => setActiveWindow(true);

  const { blur, onFocus } = useBlurOnBody(onFocusHandler, handleOnBlur, [
    "navigation--searchBar",
    "searchbar-window",
    "nav-searchbar--btn",
  ]);

  function onChooseHandler() {
    setKey("");
    setActiveWindow(false);
    dispatch(resetSearchResult());
  }

  const result = useSelector(selectUserSearchResult);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (key === "" && !result[0]) return;
      else if (key === "" && result[0]) return dispatch(resetSearchResult());
      dispatch(searchUser(key));
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
