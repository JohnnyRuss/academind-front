import React from "react";
import styles from "./reg.module.scss";

import { Input, DateForm, TextField, Select } from "../Layouts";

function Register() {
  async function submitHandler(e) {}
  return (
    <div className={styles.regContainer}>
      <form onSubmit={submitHandler} className={styles.regForm}>
        <Input
          placeholder="first name"
          className={styles.inpField}
          label="first name"
        />

        <Input
          placeholder="last name"
          className={styles.inpField}
          label="last name"
        />

        <Input placeholder="email" className={styles.inpField} label="email" />

        <div className={styles.genderBox}>
          <label>gender</label>
          <Select
            data={{
              default: "gender",
              values: ["male", "female"],
              name: "gender",
            }}
          />
        </div>

        <div className={styles.livingPlaceFieldsContainer}>
          <span>from</span>
          <div className={styles.livingPlaceFields}>
            <Input
              placeholder="email"
              className={styles.inpField}
              label="country"
            />
            <Input
              placeholder="email"
              className={styles.inpField}
              label="city"
            />
          </div>
        </div>

        <div className={styles.livingPlaceFieldsContainer}>
          <span>currently live in</span>
          <div className={styles.livingPlaceFields}>
            <Input
              placeholder="email"
              className={styles.inpField}
              label="country"
            />
            <Input
              placeholder="email"
              className={styles.inpField}
              label="city"
            />
          </div>
        </div>

        <p className={styles.formHeading}>About Me</p>
        <div className={styles.workplaceFieldsContainer}>
          <Input
            type="text"
            name="company"
            label="company"
            placeholder="company"
            className={styles.inpField}
          />
          <Input
            type="text"
            name="position"
            label="position"
            placeholder="position"
            className={styles.inpField}
          />
          <div className={styles.description}>
            <TextField
              minRows={4}
              maxRows={8}
              className={styles.textFieldDesc}
              placeholder="description"
            />
          </div>
          {/* <div className={styles.dateFormsWrapper}>
            <span>Date From</span>
            <div className={styles.dateFrom}>
              <DateForm
              // handler={handleDateFrom}
              // date={userWorkplace.workingYears?.from}
              />
            </div>
          </div>
          <div className={styles.dateFormsWrapper}>
            <span>Date To</span>
            <div className={styles.dateTo}>
              <DateForm
              // handler={handleDateTo}
              // date={}
              />
            </div>
          </div> */}
        </div>

        {/* <p className={styles.formHeading}>educaction</p>
        <div className={styles.educationFieldsContainer}>
          <div className={styles.educationFirstCol}>
            <Input
              type="text"
              name="collage"
              label="collage"
              placeholder="collage"
              // value={collage}
              // onChange={(e) => setCollage(e.target.value)}
              className={styles.inpField}
            />
            <Input
              type="text"
              name="faculty"
              label="faculty"
              placeholder="faculty"
              // value={faculty}
              // onChange={(e) => setFaculty(e.target.value)}
              className={styles.inpField}
            />
            <div className={styles.degreeBox}>
              <label>degree</label>
              <Select
                data={{
                  default: "degree",
                  values: ["bachelor", "master"],
                  name: "degree",
                }}
              />
            </div>
          </div>
          <div className={styles.educationDatesBox}>
            <div className={styles.dateFormsWrapper}>
              <span>Date From</span>
              <div className={styles.dateForm}>
                <DateForm
                // handler={handleDateFrom}
                // date={userEducation.years?.from}
                />
              </div>
            </div>
            <div className={styles.dateFormsWrapper}>
              <span>Date To</span>
              <div className={styles.dateForm}>
                <DateForm
                // handler={handleDateTo}
                // date={userEducation.years?.to}
                />
              </div>
            </div>
          </div>
          <div className={styles.description}>
            <TextField
              minRows={4}
              maxRows={8}
              className={styles.textFieldDesc}
              placeholder="description"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div> */}
      </form>
    </div>
  );
}

export default Register;
