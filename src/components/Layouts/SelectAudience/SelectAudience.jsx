import { useState } from 'react';

import styles from './selectAudience.module.scss';
import Audience from '../Audience/Audience';
import { ArrowDownRectingle, PublicIcon, LockIcon, FriendIcon } from '../Icons/icons';

function SelectAudience({ handleAudience, audience }) {
  const [activateSelection, setActivateSelection] = useState(false);

  function handleSelection(value) {
    setActivateSelection(false);
    handleAudience(value);
  }

  return (
    <div
      className={`${styles.selectAudienceBox} ${activateSelection ? styles.activeSelection : ''}`}>
      <button
        className={styles.selectAudienceMainBtn}
        onClick={() => setActivateSelection((prev) => !prev)}>
        <Audience audience={audience} />
        <span>{audience}</span>
        <ArrowDownRectingle className={styles.selectAudienceIndicator} />
      </button>
      {activateSelection && (
        <div className={styles.audienceSelectionsList}>
          <button name='public' onClick={(e) => handleSelection(e.target.name)}>
            <PublicIcon /> public
          </button>
          <button name='friends' onClick={(e) => handleSelection(e.target.name)}>
            <FriendIcon /> friends
          </button>
          <button name='private' onClick={(e) => handleSelection(e.target.name)}>
            <LockIcon /> private
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectAudience;
