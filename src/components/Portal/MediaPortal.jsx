import { useSelector, useDispatch } from 'react-redux';
import { Modal, SwiperSlider } from '../Layouts';

import { deactivateMediaModal } from '../../store/reducers/portalReducer';

import styles from './styles/mediaPortal.module.scss';

function MediaPortal() {
  const dispatch = useDispatch();
  const { mediaModalIsOpen, activeMediaIndex, mediaFiles } = useSelector(({ portal }) => portal);

  const deactivateHandler = () => dispatch(deactivateMediaModal());

  return (
    <Modal
      isOpen={mediaModalIsOpen}
      setIsOpen={deactivateHandler}
      className={styles.postModal}
      extraStyles={{ background: 'rgba(0, 0, 0, 0.8)', transform: 'translate(-50%, -46%)' }}>
      {activeMediaIndex >= 0 && (
        <SwiperSlider mediaFiles={mediaFiles} initialSlide={activeMediaIndex} />
      )}
    </Modal>
  );
}

export default MediaPortal;
