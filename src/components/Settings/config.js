import { nanoid } from "@reduxjs/toolkit";

import ChangePasswordForm from "./components/Forms/ChangePasswordForm";
import ChangeEmailForm from "./components/Forms/ChangeEmailForm";
import ChangeEducationForm from "./components/Forms/ChangeEducationForm";
import ChangeBirthDateForm from "./components/Forms/ChangeBirthDateForm";
import ChangeLivingPlaceForm from "./components/Forms/ChangeLivingPlaceForm";
import ChangeWorkplaceForm from "./components/Forms/ChangeWorkplaceForm";
import ChangeBirthplaceForm from "./components/Forms/ChangeBirthplaceForm";

import AllDetails from "./components/Detailed/AllDetails";
import EducationDetails from "./components/Detailed/EducationDetails";
import BirthdateDetails from "./components/Detailed/BirthdateDetails";
import LivingplaceDetails from "./components/Detailed/LivingplaceDetails";
import WorkplaceDetails from "./components/Detailed/WorkplaceDetails";
import BirthplaceDetails from "./components/Detailed/BirthplaceDetails";

export const toRender = {
  forms: {
    changePassword: <ChangePasswordForm />,
    changeEmail: <ChangeEmailForm />,
    changeEducation: <ChangeEducationForm />,
    changeBirthdate: <ChangeBirthDateForm />,
    changeLivingplace: <ChangeLivingPlaceForm />,
    changeWorkplace: <ChangeWorkplaceForm />,
    changeBirthplace: <ChangeBirthplaceForm />,
  },
  detailed: {
    showAll: <AllDetails />,
    showEducation: <EducationDetails />,
    showBirthdate: <BirthdateDetails />,
    showLivingplace: <LivingplaceDetails />,
    showWorkplace: <WorkplaceDetails />,
    showBirthplace: <BirthplaceDetails />,
  },
};

export const editableKeysShort = [
  {
    key: "changePassword",
    label: "change password",
    id: nanoid(),
  },
  {
    key: "changeEmail",
    label: "change email",
    id: nanoid(),
  },
];

export const detailedKeys = [
  {
    key: "showAll",
    label: "all details",
    id: nanoid(),
  },
  {
    key: "showBirthdate",
    label: "birthdate",
    id: nanoid(),
  },
  {
    key: "showBirthplace",
    label: "birthplace",
    id: nanoid(),
  },
  {
    key: "showLivingplace",
    label: "livingplace",
    id: nanoid(),
  },
  {
    key: "showEducation",
    label: "education",
    id: nanoid(),
  },
  {
    key: "showWorkplace",
    label: "workplace",
    id: nanoid(),
  },
];

export const editableKeys = {
  changePassword: { key: "changePassword", label: "password" },
  changeEmail: { key: "changeEmail", label: "email" },
  changeEducation: { key: "changeEducation", label: "education" },
  changeBirthdate: { key: "changeBirthdate", label: "birthdate" },
  changeLivingplace: { key: "changeLivingplace", label: "livingplace" },
  changeWorkplace: { key: "changeWorkplace", label: "workplace" },
  changeBirthplace: { key: "changeBirthplace", label: "birthplace" },
};
