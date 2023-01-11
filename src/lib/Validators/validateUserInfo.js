import { Validator } from "./validators";

export default class ValidateUserInfo extends Validator {
  birthDateError = {
    error: false,
    message: "",
  };

  livingPlaceError = {
    error: false,
    city: {
      hasError: false,
      message: "",
    },
    country: {
      hasError: false,
      message: "",
    },
  };

  educationError = {
    error: false,
    collage: {
      hasError: false,
      message: "",
    },

    faculty: {
      hasError: false,
      message: "",
    },

    degree: {
      hasError: false,
      message: "",
    },
  };

  workPlaceError = {
    error: false,
    company: {
      hasError: false,
      message: "",
    },

    position: {
      hasError: false,
      message: "",
    },
  };

  currentWorkPlaceError = {
    error: false,

    institution: {
      hasError: false,
      message: "",
    },

    position: {
      hasError: false,
      message: "",
    },

    description: {
      hasError: false,
      message: "",
    },
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validateBirthdate() {
    const { isEmpty } = this.checkStrSize({
      value: this.credentials,
    });

    const isValidDate = this.checkDate({ date: this.credentials });

    if (isEmpty)
      this.birthDateError = {
        error: true,
        message: "please enter date",
      };
    else if (!isValidDate)
      this.birthDateError = {
        error: true,
        message: "please enter valid date",
      };

    return this;
  }

  validateLivingplace() {
    const { isEmpty: emptyCountry } = this.checkStrSize({
      value: this.credentials.country,
    });

    const { isEmpty: emptyCity } = this.checkStrSize({
      value: this.credentials.city,
    });

    if (emptyCountry)
      this.livingPlaceError.country = {
        hasError: true,
        message: "please enter the country",
      };

    if (emptyCity)
      this.livingPlaceError.city = {
        hasError: true,
        message: "please enter the city",
      };

    if (emptyCountry || emptyCity) this.livingPlaceError.error = true;

    return this;
  }

  validateEducation() {
    const { isEmpty: emptyCollage } = this.checkStrSize({
      value: this.credentials.collage,
    });

    const { isEmpty: emptyFaculty } = this.checkStrSize({
      value: this.credentials.faculty,
    });

    const { isValidDegree } = this.checkDegree({
      data: this.credentials.degree,
    });

    if (emptyCollage)
      this.educationError.collage = {
        hasError: true,
        message: "please enter the collage",
      };

    if (emptyFaculty)
      this.educationError.faculty = {
        hasError: true,
        message: "please enter the faculty",
      };

    if (!isValidDegree)
      this.educationError.degree = {
        hasError: true,
        message: "please select the degree",
      };

    if (emptyCollage || emptyFaculty || !isValidDegree)
      this.educationError.error = true;

    return this;
  }

  validateWorkplace() {
    const { isEmpty: emptyCompany } = this.checkStrSize({
      value: this.credentials.company,
    });

    const { isEmpty: emptyPosition } = this.checkStrSize({
      value: this.credentials.position,
    });

    if (emptyCompany)
      this.workPlaceError.company = {
        hasError: true,
        message: "please enter the company name",
      };

    if (emptyPosition)
      this.workPlaceError.position = {
        hasError: true,
        message: "please enter your position",
      };

    if (emptyCompany || emptyPosition) this.workPlaceError.error = true;

    return this;
  }

  validateCurrentWorkplace() {
    const { isEmpty: emptyInstitution } = this.checkStrSize({
      value: this.credentials.institution,
    });

    const isValidPoition = this.checkIsValidWokplacePosition({
      value: this.credentials.position,
    });

    const {
      isEmpty: isEmptyDescription,
      isValid: isValidDescription,
      isLeft,
    } = this.checkWordCount({
      data: this.credentials.description,
      min: 10,
    });

    if (emptyInstitution)
      this.currentWorkPlaceError.institution = {
        hasError: true,
        message: "please enter the company name",
      };

    if (!isValidPoition)
      this.currentWorkPlaceError.position = {
        hasError: true,
        message: "please select position",
      };

    if (isEmptyDescription || !isValidDescription)
      this.currentWorkPlaceError.description = {
        hasError: true,
        message: `please enter information about yourself. At least 10 word. Left ${isLeft}`,
      };

    if (
      emptyInstitution ||
      !isValidPoition ||
      isEmptyDescription ||
      !isValidDescription
    )
      this.currentWorkPlaceError.error = true;

    return this;
  }
}
