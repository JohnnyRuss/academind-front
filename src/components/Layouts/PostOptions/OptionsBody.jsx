import { useState } from 'react';

import { useSavePostQuery, usePostQuery } from '../../../hooks';

import styles from './styles/optionsBody.module.scss';
import { Spinner } from '../../Interface';
import { Audience } from '../';
import {
  UpdateIcon,
  BookmarkFillIcon,
  BookmarkOutlineIcon,
  ErrorIcon,
  DeleteIcon,
  ArrowDownRectingle,
  PublicIcon,
  FriendIcon,
  LockIcon,
  GroupIcon,
} from '../Icons/icons';
import BlogPostOptions from '../BlogPost/components/BlogPostOptions';

function OptionsBody({ handleUpdate, handleDeletePopUp, postId, audience, isBlogPostOptions }) {
  const { loading, optionsRules, handleSavePost } = useSavePostQuery(postId);
  const { handlePostAudience } = usePostQuery();

  const [activeAudience, setActiveAudience] = useState(false);

  function handleAudience(value) {
    if (value === audience) return setActiveAudience(false);
    handlePostAudience(postId, value);
    setActiveAudience(false);
  }

  return (
    <div className={`${styles.postOptionsModal}  options--big--modal--window`}>
      {loading && <Spinner />}
      {!loading && (
        <>
          <button className={`${styles.postOptBtn} ${styles.bookmark}`} onClick={handleSavePost}>
            {optionsRules?.isBookmarked && <BookmarkFillIcon />}
            {!optionsRules?.isBookmarked && <BookmarkOutlineIcon />}
            <span>save</span>
          </button>
          {optionsRules?.belongsToUser && (
            <>
              <div className={styles.audienceBox}>
                <button
                  className={styles.audienceMainBtn}
                  onClick={() => setActiveAudience((prev) => !prev)}>
                  <Audience audience={audience} /> {audience === 'users' ? 'only users' : audience}
                  <ArrowDownRectingle
                    className={`${styles.arrowIndicator} ${
                      activeAudience ? styles.arrowIndicatorActive : ''
                    }`}
                  />
                </button>
                {activeAudience && (
                  <div className={styles.audienceOptionsList}>
                    <button name='public' onClick={(e) => handleAudience(e.target.name)}>
                      <PublicIcon />
                      public
                    </button>
                    {isBlogPostOptions && (
                      <button name='users' onClick={(e) => handleAudience(e.target.name)}>
                        <GroupIcon />
                        only users
                      </button>
                    )}
                    {!isBlogPostOptions && (
                      <>
                        <button name='friends' onClick={(e) => handleAudience(e.target.name)}>
                          <FriendIcon />
                          friends
                        </button>
                        <button name='private' onClick={(e) => handleAudience(e.target.name)}>
                          <LockIcon />
                          private
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <button className={styles.postOptBtn} onClick={handleUpdate}>
                <UpdateIcon />
                <span>update</span>
              </button>
              <button
                className={`${styles.postOptBtn} ${styles.postOptBtnDelete}`}
                onClick={handleDeletePopUp}>
                <DeleteIcon />
                <span>delete</span>
              </button>
            </>
          )}
          <button className={styles.postOptBtn}>
            <ErrorIcon />
            <span>report</span>
          </button>
        </>
      )}
    </div>
  );
}

export default OptionsBody;
