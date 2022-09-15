import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import styles from './updateForm.module.scss';
import { Image } from '../../../Interface';

const UpdateBirthDate = lazy(() => import('./UpdateBirthDate'));

const UpdateBirthPlace = lazy(() => import('./UpdateBirthPlace'));

const UpdateLivingPlace = lazy(() => import('./UpdateLivingPlace'));

const UpdateWorkPlace = lazy(() => import('./UpdateWorkPlace'));

const UpdateEducation = lazy(() => import('./UpdateEducation'));

const dynamicForms = {
  birthdate: <UpdateBirthDate />,
  birthplace: <UpdateBirthPlace />,
  livingplace: <UpdateLivingPlace />,
  workplace: <UpdateWorkPlace />,
  education: <UpdateEducation />,
};

/**
 * root component for update info blocks. it is connected to redux-state, takes target from it and base on target renders appropriate element
 * @returns
 */
function UpdateForm() {
  const { active, target } = useSelector(({ aboutPage }) => aboutPage);

  return (
    <div className={styles.updateInfo}>
      <Image
        src='/img/about.jpg'
        priority={true}
        className={`${styles.updateCover} ${
          active ? styles.animateCloseCover : styles.animateSetCover
        }`}
      />
      <div
        className={`${styles.update} ${
          active ? styles.animateActiveUpdate : styles.animateCloseUpdate
        }`}>
        <Suspense fallback={`Loading...`}>{dynamicForms[target]}</Suspense>
      </div>
    </div>
  );
}

export default UpdateForm;
