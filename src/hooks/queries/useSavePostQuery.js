/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useHelperQueries from './useHelperQueries';

import { removeBookmark } from '../../store/reducers/postsDataReducer';
import usePostQuery from './usePostQuery';

function useSavePostQuery(postId) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { savePostHandler } = usePostQuery();

  const { loading, optionsRules, getOptionsRules, setOptionsRules } = useHelperQueries();

  function removeBookmarkHandler() {
    if (pathname.endsWith('bookmarks')) dispatch(removeBookmark(postId));
  }

  function handleSavePost() {
    savePostHandler(postId);

    optionsRules?.isBookmarked && removeBookmarkHandler();

    setOptionsRules((prevState) => ({
      ...prevState,
      isBookmarked: !prevState.isBookmarked,
    }));
  }

  useEffect(() => {
    getOptionsRules(postId);
  }, [postId]);

  return { loading, optionsRules, handleSavePost };
}

export default useSavePostQuery;
