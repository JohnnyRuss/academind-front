/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectAboutUserData } from "../../store/selectors/aboutPageSelectors";
import { useAboutUserQuery } from "../../hooks";

import styles from "./newVersion.module.scss";
import {
  BirthdateFragment,
  LivingplaceFragment,
  FromFragment,
  EducationFragment,
  WorkplaceFragment,
  RegisterFragment,
  EmailFragment,
  GenderFragment,
} from "../Layouts";

function NewVersion(props) {
  const { id } = useParams();

  const data = useSelector(selectAboutUserData);
  const { getAboutUserQuery } = useAboutUserQuery();

  useEffect(() => {
    getAboutUserQuery(id);
  }, []);

  return (
    data && (
      <div className={styles.newVersion}>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>registered</h4>
          <RegisterFragment data={data.createdAt} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>email</h4>
          <EmailFragment data={data.email} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>birthdate</h4>
          <BirthdateFragment data={data.birthDate} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>gender</h4>
          <GenderFragment data={data.gender} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>bithplace</h4>
          <LivingplaceFragment data={data.currentLivingPlace} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>livingplace</h4>
          <FromFragment data={data.from} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>education</h4>
          <div className={styles.nestedList}>
            {data.education.map((edu) => (
              <EducationFragment data={edu} key={edu._id} />
            ))}
          </div>
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>workplace</h4>
          <div className={styles.nestedList}>
            {data.workplace.map((workplace) => (
              <WorkplaceFragment data={workplace} key={workplace._id} />
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default NewVersion;
