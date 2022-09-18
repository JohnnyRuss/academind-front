import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../store/selectors/userSelectors';

import styles from './styles/postsPageUserInfo.module.scss';
import {
  CalendarIcon,
  LocationIcon,
  CaseIcon,
  PersonIcon,
  RotateIcon,
} from '../../Layouts/Icons/icons';

function PostsPageUserInfo() {
  const { birthDate, from, currentLivingPlace, workplace, friendsAmount, createdAt } =
    useSelector(selectUserInfo);

  return (
    <ul className={styles.postsPageUserShortInfoList}>
      {birthDate && (
        <li>
          <CalendarIcon className={styles.icon} />
          <span>
            <span>Birthdate </span>
            <strong>{moment(new Date(birthDate)).format('DD-MM-YYYY')}</strong>
          </span>
        </li>
      )}
      {Object.values(from)[0] && (
        <li>
          <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
          <span>
            <span>From </span>
            <strong>{from.city} </strong>
            <strong>{from.country}</strong>
          </span>
        </li>
      )}
      {Object.values(currentLivingPlace)[0] && (
        <li>
          <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
          <span>
            <span>Lives in </span>
            <strong>{currentLivingPlace.city} </strong>
            <strong>{currentLivingPlace.country}</strong>
          </span>
        </li>
      )}
      {Object.values(workplace)[0] && (
        <li>
          <CaseIcon className={styles.icon} />
          <span>
            <span>Current workplace </span>
            <strong>{workplace.company} </strong>
            <span>as </span>
            <strong>{workplace.position}</strong>
          </span>
        </li>
      )}
      <li>
        <PersonIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <span>
          <span>Friends </span>
          <strong>{friendsAmount}</strong>
        </span>
      </li>
      <li>
        <RotateIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <span>
          <span>Joined at </span>
          <strong>{moment(new Date(createdAt)).format('DD-MM-YYYY')}</strong>
        </span>
      </li>
    </ul>
  );
}

export default PostsPageUserInfo;
