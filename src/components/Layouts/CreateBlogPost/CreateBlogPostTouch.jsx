import { useDispatch, useSelector } from 'react-redux';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';
import { setCreateBlogPostIsOpen } from '../../../store/reducers/createPostReducer';

import styles from './components/styles/createBlogPostTouch.module.scss';
import { MultiMediaIcon } from '../Icons/icons';
import { UserIdentifier } from '../';
import CreateBlogPostModal from './CreateBlogPostModal';

function CreateBlogPostTouch() {
  const dispatch = useDispatch();

  const { userName, image } = useSelector(selectActiveUserInfo);

  function activateModal(order) {
    dispatch(setCreateBlogPostIsOpen(order));
  }

  return (
    <>
      <div onClick={() => activateModal(true)} className={styles.createBlogPostTouch}>
        <UserIdentifier userName={userName} img={image} withTime={false} />
        <input type='text' placeholder='article...' />
        <label
          htmlFor='blogPostMedia'
          className={styles.mediaLabel}
          onClick={() => activateModal(true)}>
          <MultiMediaIcon />
          Media
        </label>
      </div>
      <CreateBlogPostModal activateModal={activateModal} />
    </>
  );
}

export default CreateBlogPostTouch;
