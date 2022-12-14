import { formatDate } from "../../../../lib";

import styles from "./styles/infoBlock.module.scss";
import {
  CalendarIcon,
  LocationIcon,
  RotateIcon,
} from "../../../Layouts/Icons/icons";
import { InfoFragment } from "./";

/**
 * user basic infos root component
 * @param {Object} userInfo object which one contains the user info about-: birthDate, {birthPlace}, {livingPlace} and registration date
 * @returns
 */
function BasicInfoBlock({ userInfo }) {
  return (
    <div className={styles.infoBlock}>
      <InfoFragment
        name="birthdate"
        caption="birthdate"
        userInfo={{ birthDate: userInfo?.birthDate }}
      >
        <CalendarIcon className={styles.icon} />
        {userInfo?.birthDate ? (
          <span>
            <span>Birthdate </span>
            <strong>{formatDate(userInfo.birthDate)}</strong>
          </span>
        ) : (
          <span>There are no information about birthdate</span>
        )}
      </InfoFragment>
      <InfoFragment
        name="birthplace"
        caption="birth place"
        userInfo={{
          country: userInfo?.from?.country,
          city: userInfo?.from?.city,
        }}
      >
        <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
        {userInfo?.from ? (
          <span>
            <span>From </span>
            <strong>{userInfo.from.city} </strong>
            <strong>{userInfo.from.country}</strong>
          </span>
        ) : (
          <span>There are no information about birthplace</span>
        )}
      </InfoFragment>
      <InfoFragment
        name="livingplace"
        caption="living place"
        userInfo={{
          city: userInfo?.currentLivingPlace?.city,
          country: userInfo?.currentLivingPlace?.country,
        }}
      >
        <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
        {userInfo?.currentLivingPlace ? (
          <span>
            <span>Lives in </span>
            <strong>{userInfo.currentLivingPlace.city} </strong>
            <strong>{userInfo.currentLivingPlace.country}</strong>
          </span>
        ) : (
          <span>There are no information about livingplace</span>
        )}
      </InfoFragment>
      <div className={styles.infoFragment}>
        <RotateIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <span>
          <span>Joined at </span>
          <strong>{formatDate(userInfo?.createdAt)}</strong>
        </span>
      </div>
    </div>
  );
}

export default BasicInfoBlock;
