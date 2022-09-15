import { useSelector, useDispatch } from 'react-redux';

import { activateOption, setUpdateCredentials } from '../../../../store/reducers/aboutReducer';

import styles from './infoFragment.module.scss';
import { DotsHorizontalIcon } from '../../../Layouts/Icons/icons';
import { OptionsMini } from '../../../Layouts';
import AddInfoBTN from './AddInfoBTN';

/**
 * use only when you want to render information block which one contains single information unlike workplace and education blocks which ones contains array of information
 * @param {children} childrenJSX gets and wraps children elements
 * @param {string} name this is an attribute which is shared by AddInfoBTN and OptionsBTN in the case to detect which kind of info block is user-interacted. So it is a kind of unique identifier of information block and whenever user clicks one of this BTN this name attribute will be sent to the redux-state to describe which information block element is user-interacted and then, base on that describtion, AboutPage UpdateForms activates specific target
 * @param {string} caption is just the title of AddInfoBTN
 * @param {object} userInfo is the object which one have to describe information whats this specific information block contains, more exactly in the case whenever user desides to update his/her about-information, base on that userInfo-object-information fields which are described in it will be sent to redux-state, and from the redux-state AboutPage UpdateForms will autofill these specific fields
 * @example
 * children --> <p>some text</p>
 * name --> const name='edu'
 * caption --> const caption='education'
 * userInfo --> userInfo={birthDate:'1990-19-07'}
 * @returns the Bucket(AddInfoBTN; OptionsBTN, OptionsModal and Children) of information block.
 */
function InfoFragment({ children, name, caption, userInfo }) {
  const dispatch = useDispatch();
  const { activeOptTarget, activeOpt } = useSelector(({ aboutPage }) => aboutPage);

  const activateOptions = (target) => dispatch(activateOption(target));

  const handleUpdate = () =>
    dispatch(setUpdateCredentials({ credentials: userInfo, target: name }));

  return (
    <div className={styles.infoFragment}>
      <AddInfoBTN caption={caption} name={name} />
      {children}
      <button
        className={styles.optBtnUpdate}
        name={name}
        onClick={(e) => activateOptions(e.currentTarget.name)}>
        <DotsHorizontalIcon />
      </button>
      {activeOpt && activeOptTarget === name && (
        <OptionsMini
          className={styles.optModalUpdate}
          updateHandler={handleUpdate}
          withBtn={false}
          keyWord='information'
          pin={false}
        />
      )}
    </div>
  );
}

export default InfoFragment;
