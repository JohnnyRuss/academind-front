import { useRestrictBodyOverflow } from '../../../hooks';

import Modal from 'react-modal';
import styles from './modal.module.scss';
import { CloseIcon } from '../Icons/icons';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    zIndex: '9999',
    overflowX: 'hidden',
  },
};

Modal.setAppElement('#root');

function Modall({ children, className, isOpen, setIsOpen, extraStyles = {} }) {
  customStyles.content = { ...customStyles.content, ...extraStyles };

  const { restrictScroll } = useRestrictBodyOverflow(isOpen, true);

  function closeModal() {
    restrictScroll(false);
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
      <div className={`${styles.modalContent} ${className || ''}`}>
        {children}
        <button className={styles.modalCloseBtn} onClick={closeModal}>
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
}

export default Modall;
