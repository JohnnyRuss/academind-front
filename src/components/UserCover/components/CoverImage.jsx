import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './coverImage.module.scss';
import { Image } from '../../Interface';
import { CameraIcon } from '../../Layouts/Icons/icons';

function CoverImage() {
  const img = useSelector(({ user }) => user.user.coverImg);

  const fileRef = useRef();
  const [file, setFile] = useState(null);

  return (
    <div className={styles.cover}>
      <Image src={file ? URL.createObjectURL(file) : img} className={styles.coverImg} />
      <label htmlFor='cover--img' className={styles.changeMediaBtn}>
        <input
          type='file'
          id='cover--img'
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
        <CameraIcon />
      </label>
    </div>
  );
}

export default CoverImage;
