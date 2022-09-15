import { useDispatch, useSelector } from 'react-redux';

import { setTarget } from '../../../../store/reducers/aboutReducer';

import styles from './addInfoBtn.module.scss';
import { RoundedPlusIcon, ArrowRightRectingle } from '../../../Layouts/Icons/icons';

/**
 * button which is connected to redux-state. it sends the name(passed as a prop) of target to state. has a dynamic caption(passed as a prop)
 * @param {String} name target name atrribute for identification
 * @param {String} caption title of button
 * @example
 * name="edu" caption="education"
 * @returns
 */
function AddInfoBTN({ name, caption }) {
  const dispatch = useDispatch();
  const { target, proccessUpdate } = useSelector(({ aboutPage }) => aboutPage);

  const handleAddInfo = (target) => dispatch(setTarget(target));

  return (
    <button
      name={name}
      onClick={(e) => handleAddInfo(e.currentTarget.name)}
      className={`${styles.addInfoBtn} ${target === name ? styles.activeAddBtn : ''}`}
      disabled={target === name}>
      {target !== name && <RoundedPlusIcon />}
      <span>
        {proccessUpdate && target === name ? 'update' : 'add'} {caption}
      </span>
      {target === name && <ArrowRightRectingle />}
    </button>
  );
}

export default AddInfoBTN;
