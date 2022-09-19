import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './profileImage.module.scss';
import { Image } from '../../Interface';
import { CameraIcon } from '../../Layouts/Icons/icons';

function ProfileImage() {
  const img = useSelector(({ user }) => user.user.profileImg);

  const fileRef = useRef();
  const [file, setFile] = useState(null);

  return (
    <div className={styles.profile}>
      <Image src={file ? URL.createObjectURL(file) : img} className={styles.profileImg} />
      <label htmlFor='profile--img' className={styles.changeMediaBtn}>
        <input
          type='file'
          id='profile--img'
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
        <CameraIcon />
      </label>
    </div>
  );
}

export default ProfileImage;
