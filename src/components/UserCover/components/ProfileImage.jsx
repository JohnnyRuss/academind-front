import { useSelector } from 'react-redux';
import { useUpdateUserCover, useForeignUser } from '../../../hooks';

import { selectUserCover } from '../../../store/selectors/userSelectors';

import styles from './styles/profileImage.module.scss';
import { Image, Spinner } from '../../Interface';
import { CameraIcon } from '../../Layouts/Icons/icons';
import UpdateUserCoverBTN from './UpdateUserCoverBTN';

function ProfileImage() {
  const { profileImg } = useSelector(selectUserCover);

  const belongActiveUser = useForeignUser('basedOnLocation');

  const { fileRef, file, setFile, saveChangeHandler, cancelChangeHandler, loading } =
    useUpdateUserCover('profileImg');

  return (
    <>
      <div className={styles.profile}>
        {loading && <Spinner />}
        <Image src={file ? URL.createObjectURL(file) : profileImg} className={styles.profileImg} />
        {belongActiveUser && !loading && (
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
        )}
      </div>
      {file && (
        <UpdateUserCoverBTN cancelHandler={cancelChangeHandler} submitHandler={saveChangeHandler} />
      )}
    </>
  );
}

export default ProfileImage;
