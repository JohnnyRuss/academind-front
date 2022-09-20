/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBookmarks } from '../../store/reducers/userReducer';
import { selectUserId } from '../../store/selectors/userSelectors';
import { selectPosts } from '../../store/selectors/postSelectors';

import { usePost } from '../../hooks';

import styles from './components/bookmarks.module.scss';
import { Post } from '../Layouts';
import { Spinner } from '../Interface';

function Bookmarks() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUserId);
  const data = useSelector(selectPosts);

  const { loading } = useSelector(({ user }) => user.nestedLoadingState);

  const { activatePostMediaHandler } = usePost();

  useEffect(() => {
    dispatch(getBookmarks(id));
  }, []);

  return (
    <div className={styles.bookmarks}>
      {loading && <Spinner />}
      {!loading &&
        data?.map((bookmark) => (
          <Post
            data={bookmark}
            key={bookmark._id}
            activatePostMediaHandler={activatePostMediaHandler}
          />
        ))}
    </div>
  );
}

export default Bookmarks;
