class Validator {
  checkStrSize({ value, min }) {
    if (!value) return { isLess: false, isEmpty: true };
    else if (min && value.length < min) return { isLess: true, isEmpty: false };
    else return { isLess: false, isEmpty: false };
  }

  checkArrSize({ data }) {
    if (!data) return { isEmpty: true };
    else if (Array.isArray(data) && data.length < 1) return { isEmpty: true };
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

    if (isEmpty || isLess) this.createError.error = true;

    return this;
  }

  validateLabels() {
    const labels = this.credentials.labels
      ? JSON.parse(this.credentials.labels)
      : [];

    const { isEmpty } = this.checkArrSize({ data: labels });

    if (isEmpty) {
      this.createError.error = true;
      this.createError.labels = {
        hasError: true,
        message: "please enter at least 1 label",
      };
    }

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

    if (isEmpty || !isValid) this.createError.error = true;

    return this;
  }
}

export class ValidateCreatePost extends Validator {
  createError = {
    error: false,
    message: "",
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validatePost() {
    const { isEmpty: tagsIsEmpty } = this.validateTags();
    const { isEmpty: mediaIsEmpty } = this.validateMedia();
    const { isEmpty: imagesIsEmpty } = this.validateImages();
    const { isEmpty: descriptionIsEmpty, isLess } = this.validateDescription();

    if (
      tagsIsEmpty &&
      mediaIsEmpty &&
      imagesIsEmpty &&
      (descriptionIsEmpty || isLess)
    ) {
      this.createError.error = true;
      this.createError.message =
        "Validation Error. Please provide us some value";
    }

    return this;
  }

  validateTags() {
    const tags = this.credentials.tags ? JSON.parse(this.credentials.tags) : [];

    return this.checkArrSize({ data: tags });
  }

  validateMedia() {
    const media = this.credentials.media
      ? JSON.parse(this.credentials.media)
      : [];

    return this.checkArrSize({ data: media });
  }

  validateImages() {
    return this.checkArrSize({ data: this.credentials.images });
  }

  validateDescription() {
    return this.checkStrSize({ value: this.credentials.description, min: 2 });
  }
}
