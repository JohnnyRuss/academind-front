/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBookmarks } from '../../store/reducers/userReducer';
import { resetPosts } from '../../store/reducers/postsDataReducer';
import { selectUserId } from '../../store/selectors/userSelectors';
import { selectPosts } from '../../store/selectors/postSelectors';

import { usePost, useRestrictPrivateRoute } from '../../hooks';

import styles from './components/bookmarks.module.scss';
import { Post } from '../Layouts';
import { Spinner } from '../Interface';

function Bookmarks() {
  const dispatch = useDispatch();

  useRestrictPrivateRoute();

  const { id } = useSelector(selectUserId);
  const data = useSelector(selectPosts);

  const { loading } = useSelector(({ user }) => user.nestedLoadingState);

  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();

  useEffect(() => {
    dispatch(getBookmarks(id));
    return () => dispatch(resetPosts());
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
            activateUpdatePostModal={activateUpdatePostModal}
          />
        ))}
    </div>
  );
}

export default Bookmarks;
