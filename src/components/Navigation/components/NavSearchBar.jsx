import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchUser, resetSearchResult } from '../../../store/reducers/userReducer';

import styles from './styles/navSearchBar.module.scss';
import { SearchBar } from '../../Layouts';
import { Link, Avatar } from '../../Interface';

function NavSearchBar() {
  const dispatch = useDispatch();
  const result = useSelector(({ user }) => user.searchResult);

  const [activeWindow, setActiveWindow] = useState(false);
  const [key, setKey] = useState('');

  const [blur, setBlur] = useState(true);

  function onFocusHandler() {
    setActiveWindow(true);
    setBlur(false);
  }

  function onChooseHandler() {
    setActiveWindow(false);
    setKey('');
    dispatch(resetSearchResult());
  }

  useEffect(() => {
    if (blur) return;

    document.querySelector('body').addEventListener('click', function (e) {
      if (e.target.dataset.searchBarInput === 'true') return;
      setBlur(true);
      setActiveWindow(false);
      setKey('');
      dispatch(resetSearchResult());
    });
  }, [blur, dispatch]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (key === '' && !result[0]) return;
      else if (key === '' && result[0]) return dispatch(resetSearchResult());

      dispatch(searchUser(key));
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div className={styles.search}>
      <SearchBar
        onFocus={onFocusHandler}
        onChange={(e) => setKey(e.target.value)}
        value={key}
        allowToggle={true}
        className={styles.navigationSearchBar}
      />
      {activeWindow && !blur && (
        <div className={styles.searchWindow}>
          <div className={styles.resultsList}>
            {result?.map((result) => (
              <Link
                path={`/profile/${result._id}/posts`}
                key={result._id}
                className={styles.resultsListItem}
                onClick={onChooseHandler}>
                <Avatar img={result.profileImg} />
                <span>{result.userName}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavSearchBar;
