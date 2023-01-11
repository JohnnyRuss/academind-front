import { Validator } from "./validators";

export default class ValidateRegistrationInfo extends Validator {
  error = {
    error: false,
    firstName: {
      hasError: false,
      message: "",
    },
    lastName: {
      hasError: false,
      message: "",
    },
    email: {
      hasError: false,
      message: "",
    },
    gender: {
      hasError: false,
      message: "",
    },
    from: {
      country: {
        hasError: false,
        message: "",
      },
      city: {
        hasError: false,
        message: "",
      },
    },
    livingPlace: {
      country: {
        hasError: false,
        message: "",
      },
      city: {
        hasError: false,
        message: "",
      },
    },
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

  init() {
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validateGender();
    this.validateFrom();
    this.validateLivingPlace();
    this.validateCompany();
    this.validatePosition();
    this.validateDescription();

    return this.error;
  }

  validateFirstName() {
    this.executeStrSizeAndLatinLetters({
      location: "firstName",
      value: this.credentials.firstName,
      min: 2,
      key: "firstname",
    });

    const hasWhiteSpace = this.checkWhiteSpace({
      value: this.credentials.firstName,
    });

    if (hasWhiteSpace)
      this.error.firstName = {
        hasError: true,
        message: "please enter only the firstname",
      };

    if (!this.error.error && this.error.firstName.hasError)
      this.error.error = true;
  }

  validateLastName() {
    this.executeStrSizeAndLatinLetters({
      location: "lastName",
      value: this.credentials.lastName,
      min: 2,
      key: "lastname",
    });

    const hasWhiteSpace = this.checkWhiteSpace({
      value: this.credentials.lastName,
    });

    if (hasWhiteSpace)
      this.error.lastName = {
        hasError: true,
        message: "please enter only the lastname",
      };

    if (!this.error.error && this.error.lastName.hasError)
      this.error.error = true;
  }

  validateEmail() {
    const isEmail = this.checkIsEmail({ value: this.credentials.email });

    if (!isEmail)
      this.error.email = {
        hasError: true,
        message: "please enter valid email",
      };

    if (!this.error.error && this.error.email.hasError) this.error.error = true;
  }

  validateGender() {
    const isValid = this.checkIsValidGender({ value: this.credentials.gender });

    if (!isValid)
      this.error.gender = {
        hasError: true,
        message: "please select a gender",
      };

    if (!this.error.error && this.error.gender.hasError)
      this.error.error = true;
  }

  validateFrom() {
    this.executeStrSizeAndLatinLetters({
      location: "from.country",
      value: this.credentials.from.country,
      min: 2,
      key: "country",
      withDash: true,
    });

    this.executeStrSizeAndLatinLetters({
      location: "from.city",
      value: this.credentials.from.city,
      min: 2,
      key: "city",
      withDash: true,
    });

    if (
      !this.error.error &&
      (this.error.from.country.hasError || this.error.from.city.hasError)
    )
      this.error.error = true;
  }

  validateLivingPlace() {
    this.executeStrSizeAndLatinLetters({
      location: "livingPlace.country",
      value: this.credentials.currentLivingPlace.country,
      min: 2,
      key: "country",
      withDash: true,
    });

    this.executeStrSizeAndLatinLetters({
      location: "livingPlace.city",
      value: this.credentials.currentLivingPlace.city,
      min: 2,
      key: "city",
      withDash: true,
    });

    if (
      !this.error.error &&
      (this.error.livingPlace.country.hasError ||
        this.error.livingPlace.city.hasError)
    )
      this.error.error = true;
  }

  validateCompany() {
    this.executeStrSizeAndLatinLetters({
      location: "institution",
      value: this.credentials.registrationBio.institution,
      min: 3,
      key: "institution",
    });

    if (!this.error.error && this.error.institution.hasError)
      this.error.error = true;
  }

  validatePosition() {
    const isValidPoition = this.checkIsValidWokplacePosition({
      value: this.credentials.registrationBio.position,
    });

    if (!isValidPoition)
      this.error.position = {
        hasError: true,
        message: "please select a position",
      };

    if (!this.error.error && this.error.position.hasError)
      this.error.error = true;
  }

  validateDescription() {
    const { isEmpty, isValid, isLeft } = this.checkWordCount({
      data: this.credentials.registrationBio.description,
      min: 10,
    });

    if (isEmpty || !isValid)
      this.error.description = {
        hasError: true,
        message: `please enter information about yourself. At least 10 word. Left ${isLeft}`,
      };

    if (!this.error.error && this.error.description.hasError)
      this.error.error = true;
  }
}
