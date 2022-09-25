import { useDispatch, useSelector } from 'react-redux';

import { activateOption, setUpdateCredentials } from '../../../../store/reducers/aboutReducer';
import { formatDate } from '../../../../functions';
import { useForeignUser } from '../../../../hooks';

import styles from './styles/infoBlock.module.scss';
import { GraduationIcon, CaseIcon } from '../../../Layouts/Icons/icons';
import { AddInfoBTN, InfoOptions } from './';

/**
 * user education and workplace infos root component
 * @param {Object} userInfo object which one contains the user info about-: [{education}], [{workplace}]
 * @returns
 */
function EduBlock({ userInfo }) {
  const dispatch = useDispatch();
  const { activeOptTarget, activeOpt } = useSelector(({ aboutPage }) => aboutPage.dom);

  const activateOptions = (target) => dispatch(activateOption(target));

  const handleUpdate = (info, target) =>
    dispatch(setUpdateCredentials({ credentials: info, target }));

  const { isActiveUser } = useForeignUser('basedOnLocation');

  return (
    <div className={styles.infoBlock}>
      <h3>Education</h3>
      {isActiveUser && <AddInfoBTN caption='education' name='education' />}
      <div className={styles.verticalDevider}>
        {userInfo?.education?.[0] ? (
          userInfo?.education.map((clg, i) => (
            <div className={styles.verticalDeviderItem} key={clg._id}>
              <GraduationIcon className={`${styles.icon} ${styles.smallIcon}`} />
              <span>
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
              {isActiveUser && (
                <InfoOptions
                  activeOpt={activeOpt}
                  activeOptTarget={activeOptTarget}
                  activateOptions={activateOptions}
                  name={`education-${i}`}
                  deleteHandler={() => {}}
                  updateHandler={() => handleUpdate(clg, 'education')}
                />
              )}
            </div>
          ))
        ) : (
          <span className={styles.verticalDeviderItem}>
            <GraduationIcon className={`${styles.icon} ${styles.smallIcon}`} />
            There are no information about education
          </span>
        )}
      </div>
      <h3>Workplaces</h3>
      {isActiveUser && <AddInfoBTN caption='workplace' name='workplace' />}
      <div className={styles.verticalDevider}>
        {userInfo?.workplace?.[0] ? (
          userInfo.workplace.map((wrp, i) => (
            <div key={wrp._id} className={styles.verticalDeviderItem}>
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
                <p>{wrp.description}</p>
              </span>
              {isActiveUser && (
                <InfoOptions
                  activeOpt={activeOpt}
                  activeOptTarget={activeOptTarget}
                  activateOptions={activateOptions}
                  name={`workplace-${i}`}
                  deleteHandler={() => {}}
                  updateHandler={() => handleUpdate(wrp, 'workplace')}
                />
              )}
            </div>
          ))
        ) : (
          <span className={styles.verticalDeviderItem}>
            <CaseIcon className={`${styles.icon} ${styles.smallIcon}`} />
            There are no information about workplace
          </span>
        )}
      </div>
    </div>
  );
}

export default EduBlock;
