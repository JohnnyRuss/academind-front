import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';

import { activateOption, setUpdateCredentials } from '../../../../store/reducers/aboutReducer';
import { formatDate } from '../../../../functions';

import styles from './infoBlock.module.scss';
import { GraduationIcon, CaseIcon, DotsHorizontalIcon } from '../../../Layouts/Icons/icons';
import { OptionsMini } from '../../../Layouts';
import { AddInfoBTN } from './';

/**
 * user education and workplace infos root component
 * @param {Object} userInfo object which one contains the user info about-: [{education}], [{workplace}]
 * @returns
 */
function EduBlock({ userInfo }) {
  const dispatch = useDispatch();
  const { activeOptTarget, activeOpt } = useSelector(({ aboutPage }) => aboutPage);
  const activateOptions = (target) => dispatch(activateOption(target));
  const handleUpdate = (info, target) =>
    dispatch(setUpdateCredentials({ credentials: info, target }));

  return (
    <div className={styles.infoBlock}>
      <AddInfoBTN caption='education' name='education' />
      <div className={styles.verticalDevider}>
        {userInfo.education.map((clg, i) => (
          <div className={styles.verticalDeviderItem} key={uid(6)}>
            <GraduationIcon className={`${styles.icon} ${styles.smallIcon}`} />
            <span key={uid(6)}>
              <span>studied in </span>
              <strong>{clg.collage} </strong>
              <span>at </span>
              <strong>{clg.faculty} </strong>
              <span>as </span>
              <strong>{clg.degree} </strong>
              <span>from </span>
              <strong>{formatDate(clg.years.from)} </strong>
              <span>to </span>
              <strong>{formatDate(clg.years.to)} </strong>
              <p>{clg.description}</p>
            </span>
            <button
              className={styles.optBtnUpdate}
              name={`education-${i}`}
              onClick={(e) => activateOptions(e.currentTarget.name)}>
              <DotsHorizontalIcon />
            </button>
            {activeOpt && activeOptTarget === `education-${i}` && (
              <OptionsMini
                className={styles.optModalUpdate}
                updateHandler={() => handleUpdate(clg, 'education')}
                withBtn={false}
                keyWord='information'
                pin={false}
              />
            )}
          </div>
        ))}
      </div>
      <AddInfoBTN caption='workplace' name='workplace' />
      <div className={styles.verticalDevider}>
        {userInfo.workplace.map((wrp, i) => (
          <div key={uid(6)} className={styles.verticalDeviderItem}>
            <CaseIcon className={styles.icon} />
            <span>
              <span>worked in </span>
              <strong>{wrp.company} </strong>
              <span>as </span>
              <strong>{wrp.position} </strong>
              <span>from </span>
              <strong>{formatDate(wrp.workingYears.from)} </strong>
              <span>to </span>
              <strong>{formatDate(wrp.workingYears.to)}</strong>
              <p>{userInfo.currentWorkPlace.description}</p>
            </span>
            <button
              className={styles.optBtnUpdate}
              name={`workplace-${i}`}
              onClick={(e) => activateOptions(e.currentTarget.name)}>
              <DotsHorizontalIcon />
            </button>
            {activeOpt && activeOptTarget === `workplace-${i}` && (
              <OptionsMini
                className={styles.optModalUpdate}
                updateHandler={() => handleUpdate(wrp, 'workplace')}
                withBtn={false}
                keyWord='information'
                pin={false}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EduBlock;
