import styles from './infoBlock.module.scss';
import { CalendarIcon, LocationIcon, RotateIcon } from '../../../Layouts/Icons/icons';
import { InfoFragment } from './';

/**
 * user basic infos root component
 * @param {Object} userInfo object which one contains the user info about-: birthDate, {birthPlace}, {livingPlace} and registration date
 * @returns
 */
function BasicInfoBlock({ userInfo }) {
  return (
    <div className={styles.infoBlock}>
      <InfoFragment
        name='birthdate'
        caption='birthdate'
        userInfo={{ birthDate: userInfo.birthDate }}>
        <CalendarIcon className={styles.icon} />
        <span>
          <span>Birthdate </span>
          <strong>{userInfo.birthDate}</strong>
        </span>
      </InfoFragment>
      <InfoFragment
        name='birthplace'
        caption='birth place'
        userInfo={{ country: userInfo.birthPlace.country, city: userInfo.birthPlace.city }}>
        <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <span>
          <span>From </span>
          <strong>{userInfo.birthPlace.city} </strong>
          <strong>{userInfo.birthPlace.country}</strong>
        </span>
      </InfoFragment>
      <InfoFragment
        name='livingplace'
        caption='living place'
        userInfo={{ city: userInfo.livesIn.city, country: userInfo.livesIn.country }}>
        <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <span>
          <span>Lives in </span>
          <strong>{userInfo.livesIn.city} </strong>
          <strong>{userInfo.livesIn.country}</strong>
        </span>
      </InfoFragment>
      <div className={styles.infoFragment}>
        <RotateIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <span>
          <span>Joined at </span>
          <strong>{userInfo.joinedAt}</strong>
        </span>
      </div>
    </div>
  );
}

export default BasicInfoBlock;
