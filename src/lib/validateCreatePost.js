class Validator {
  checkStrSize({ value, min }) {
    if (!value) return { isLess: false, isEmpty: true };
    else if (min && value.length < min) return { isLess: true, isEmpty: false };
    else return { isLess: false, isEmpty: false };
  }

  checkArrSize({ data }) {
    if (Array.isArray(data) && data.length < 1) return { isEmpty: true };
    else return { isEmpty: false };
  }

  checkValidCategory(category) {
    if (!this._avalableBlogPostCategories.some((cat) => cat === category))
      return { isValid: false };
    else return { isValid: true };
  }

  checkWordCount({ data, min }) {
    if (!data && typeof data !== "string")
      return { isEmpty: true, isValid: false, isLeft: NaN };

    const fragments = data.trim().split(" ");

    if ((Array.isArray(fragments) && !fragments[0]) || !data.trim())
      return { isEmpty: true, isValid: false, isLeft: NaN };
    else if (Array.isArray(fragments) && fragments.length < min)
      return { isEmpty: false, isValid: false, isLeft: min - fragments.length };
    else return { isEmpty: false, isValid: true, isLeft: NaN };
  }
}

export class ValidateBlogPostCreate extends Validator {
  _blogPostTitleMinLetterCount = 3;
  _blogPostMinWordCount = 1;

  _avalableBlogPostCategories = [
    "economics",
    "business",
    "law",
    "medicine",
    "psychology",
    "philosophy",
    "politics",
    "natural sciences",
    "exact sciences",
    "other",
  ];

  createError = {
    error: false,
    title: {
      hasError: false,
      message: "",
    },
    labels: {
      hasError: false,
      message: "",
    },
    category: {
      hasError: false,
      message: "",
    },
    article: {
      hasError: false,
      message: "",
    },
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validateTitle() {
    const { isEmpty, isLess } = this.checkStrSize({
      value: this.credentials.title,
      min: this._blogPostTitleMinLetterCount,
    });

    if (isEmpty)
      this.createError.title = {
        hasError: true,
        message: "please enter the post title",
      };
    else if (isLess)
      this.createError.title = {
        hasError: true,
        message: "title must contains min 3 letters",
      };

    this.createError.error = isEmpty || isLess ? true : false;

    return this;
  }

  validateLabels() {
    const labels = this.credentials.labels
      ? JSON.parse(this.credentials.labels)
      : [];

    const { isEmpty } = this.checkArrSize({ data: labels });

    if (isEmpty)
      this.createError.labels = {
        hasError: true,
        message: "please enter at least 1 label",
      };

    this.createError.error = isEmpty ? true : false;

    return this;
  }

  validateCategory() {
    const { isValid } = this.checkValidCategory(this.credentials.category);

    if (!isValid) {
      this.createError.error = true;
      this.createError.category = {
        hasError: true,
        message: "please select the category",
      };
    }

    return this;
  }

  validateArticle() {
    const { isEmpty, isValid, isLeft } = this.checkWordCount({
      data: this.credentials.article,
      min: this._blogPostMinWordCount,
    });

    if (isEmpty)
      this.createError.article = {
        hasError: true,
        message: "please enter article text",
      };
    if (!isValid)
      this.createError.article = {
        hasError: true,
        message: `article must contain min ${this._blogPostMinWordCount} word. Left ${isLeft} word.`,
      };

    this.createError.error = isEmpty || !isValid ? true : false;

    return this;
  }
}

export class ValidateCreatePost extends Validator {
  createError = {
    error: false,
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }
}
