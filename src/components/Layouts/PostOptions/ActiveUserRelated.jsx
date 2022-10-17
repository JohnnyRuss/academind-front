import styles from './styles/optionsBody.module.scss';
import { Audience } from '../';

import {
  UpdateIcon,
  DeleteIcon,
  ArrowDownRectingle,
  PublicIcon,
  FriendIcon,
  LockIcon,
  GroupIcon,
} from '../Icons/icons';

function ActiveUserRelated({
  isBlogPostOptions,
  audience,
  setActiveAudience,
  activeAudience,
  handleAudience,
  handleUpdate,
  handleDeletePopUp,
}) {
  return (
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
  );
}

export default ActiveUserRelated;
