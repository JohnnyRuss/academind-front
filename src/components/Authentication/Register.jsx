import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuthenticationQuery } from "../../hooks";
import {
  selectActiveUserRegistrationLoadingState,
  selectSentRegistrationStatus,
} from "../../store/selectors/activeUserSelectors";

import styles from "./reg.module.scss";
import { Input, TextField, Select, BTN, Error, StandSpinner } from "../Layouts";

function Register() {
  const navigate = useNavigate();

  const isSent = useSelector(selectSentRegistrationStatus);
  const { loading, error, message } = useSelector(
    selectActiveUserRegistrationLoadingState
  );

  const [firstName, setFirstName] = useState("john");
  const [lastName, setLastName] = useState("russ");
  const [email, setEmail] = useState("russ@io.com");
  const [gender, setGender] = useState("male");
  const [institution, setInstitution] = useState("devers");
  const [position, setPosition] = useState("associate professor");
  const [description, setDescription] = useState(
    "some desc here some desc here some desc here some desc here"
  );
  const [from, setFrom] = useState({
    country: "georgia-city",
    city: "ozurgeti",
  });
  const [currentLivingPlace, setCurrentLivingPlace] = useState({
    country: "georgia",
    city: "tbilisi",
  });

  const {
    sendRegistrationRequestQuery,
    regError,
    resetRegistrationErrorHandler,
  } = useAuthenticationQuery();

  function submitHandler(e) {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      gender,
      from,
      currentLivingPlace,
      registrationBio: {
        institution,
        position,
        description,
      },
    };

    sendRegistrationRequestQuery(data);
  }

  function resetState() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setGender("gender");
    setInstitution("");
    setPosition("position");
    setDescription("");
    setFrom({
      country: "",
      city: "",
    });
    setCurrentLivingPlace({
      country: "",
      city: "",
    });
  }

  useEffect(() => {
    if (isSent) resetState();
  }, [isSent]);

  useEffect(() => {
    return () => resetRegistrationErrorHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.regContainer}>
      {isSent && (
        <div className={styles.successModalContainer}>
          <div className={styles.successModal}>
            <p>
              Your registration request is successfully sent !
              <br />
              We will email you after review your information.
            </p>
            <BTN onClick={() => navigate("/", { replace: true })}>ok</BTN>
          </div>
        </div>
      )}

      {error && (
        <Error
          asModal={true}
          msg={message}
          onClose={resetRegistrationErrorHandler}
        />
      )}

      {loading && <StandSpinner />}

      <form onSubmit={submitHandler} className={styles.regForm}>
        <Input
          placeholder="first name"
          className={styles.inpField}
          label="first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={regError.firstName.hasError}
          message={regError.firstName.message}
        />

        <Input
          placeholder="last name"
          className={styles.inpField}
          label="last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={regError.lastName.hasError}
          message={regError.lastName.message}
        />

        <Input
          placeholder="email"
          className={styles.inpField}
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={regError.email.hasError}
          message={regError.email.message}
        />

        <Select
          label="gender"
          handler={(val) => setGender(val)}
          error={regError.gender.hasError}
          message={regError.gender.message}
          data={{
            default: "gender",
            values: ["male", "female"],
            name: "gender",
          }}
        />

        <div className={styles.livingPlaceFieldsContainer}>
          <span>From</span>

          <div className={styles.livingPlaceFields}>
            <Input
              placeholder="country"
              className={styles.inpField}
              label="country"
              error={regError.from.country.hasError}
              message={regError.from.country.message}
              value={from.country}
              onChange={(e) =>
                setFrom((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
            />

            <Input
              placeholder="city"
              className={styles.inpField}
              label="city"
              error={regError.from.city.hasError}
              message={regError.from.city.message}
              value={from.city}
              onChange={(e) =>
                setFrom((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.livingPlaceFieldsContainer}>
          <span>Currently Live In</span>

          <div className={styles.livingPlaceFields}>
            <Input
              placeholder="country"
              className={styles.inpField}
              label="country"
              error={regError.livingPlace.country.hasError}
              message={regError.livingPlace.country.message}
              value={currentLivingPlace.country}
              onChange={(e) =>
                setCurrentLivingPlace((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
            />

            <Input
              placeholder="city"
              className={styles.inpField}
              label="city"
              message={regError.livingPlace.city.message}
              error={regError.livingPlace.city.hasError}
              value={currentLivingPlace.city}
              onChange={(e) =>
                setCurrentLivingPlace((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <p className={styles.formHeading}>About Me</p>
        <div className={styles.workplaceFieldsContainer}>
          <Input
            type="text"
            name="institution"
            label="institution"
            placeholder="institution"
            className={styles.inpField}
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            error={regError.institution.hasError}
            message={regError.institution.message}
          />

          <Select
            label="position"
            error={regError.position.hasError}
            message={regError.position.message}
            handler={(val) => setPosition(val)}
            data={{
              default: "position",
              name: "position",
              values: [
                "professor",
                "associate professor",
                "assistant professor",
                "researcher",
                "administrative personnel",
                "phd student",
                "post-doc-fellow",
              ],
            }}
          />

          <TextField
            minRows={4}
            maxRows={8}
            className={styles.textFieldDesc}
            placeholder="description"
            label="bio"
            error={regError.description.hasError}
            message={regError.description.message}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <BTN onClick={submitHandler}>send information</BTN>
      </form>
    </div>
  );
}

export default Register;
