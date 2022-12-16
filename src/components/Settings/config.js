import { nanoid } from "@reduxjs/toolkit";
import { lazy } from "react";

const ChangePasswordForm = lazy(() =>
  import("./components/Forms/ChangePasswordForm")
);
const ChangeEmailForm = lazy(() =>
  import("./components/Forms/ChangeEmailForm")
);
const ChangeEducationForm = lazy(() =>
  import("./components/Forms/ChangeEducationForm")
);
const ChangeBirthDateForm = lazy(() =>
  import("./components/Forms/ChangeBirthDateForm")
);
const ChangeLivingPlaceForm = lazy(() =>
  import("./components/Forms/ChangeLivingPlaceForm")
);
const ChangeWorkplaceForm = lazy(() =>
  import("./components/Forms/ChangeWorkplaceForm")
);
const ChangeBirthplaceForm = lazy(() =>
  import("./components/Forms/ChangeBirthplaceForm")
);

const AllDetails = lazy(() => import("./components/Detailed/AllDetails"));
const EducationDetails = lazy(() =>
  import("./components/Detailed/EducationDetails")
);
const BirthdateDetails = lazy(() =>
  import("./components/Detailed/BirthdateDetails")
);
const LivingplaceDetails = lazy(() =>
  import("./components/Detailed/LivingplaceDetails")
);
const WorkplaceDetails = lazy(() =>
  import("./components/Detailed/WorkplaceDetails")
);
const BirthplaceDetails = lazy(() =>
  import("./components/Detailed/BirthplaceDetails")
);

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
