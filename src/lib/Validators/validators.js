import validator from "validator";
import {
  VALID_BLOG_POST_CATEGORIES,
  USER_GENDER,
  USER_WORKPLACE_POSITIONS,
} from "../config";

export class Validator {
  _blogPostTitleMinLetterCount = 3;

  _blogPostMinWordCount = 3;

  _avalableBlogPostCategories = VALID_BLOG_POST_CATEGORIES;

  availableGenders = USER_GENDER;

  availablePositions = USER_WORKPLACE_POSITIONS;

  //////////////////////////////////////////////

  checkStrSize({ value, min }) {
    if (!value?.trim()) return { isLess: false, isEmpty: true };
    else if (min && value.trim().length < min)
      return { isLess: true, isEmpty: false };
    else return { isLess: false, isEmpty: false };
  }

  checkArrSize({ data }) {
    if ((Array.isArray(data) && !data[0]) || !data) return { isEmpty: true };
    else return { isEmpty: false };
  }

  checkValidBlogPostCategory(category) {
    if (!this._avalableBlogPostCategories.some((cat) => cat === category))
      return { isValid: false };
    else return { isValid: true };
  }

  checkWordCount({ data, min }) {
    if (typeof data !== "string" || !data.trim())
      return { isEmpty: true, isValid: false, isLeft: NaN };

    const fragments = data.trim().split(" ");

    if ((Array.isArray(fragments) && !fragments[0]) || !data.trim())
      return { isEmpty: true, isValid: false, isLeft: NaN };
    else if (Array.isArray(fragments) && fragments.length < min)
      return { isEmpty: false, isValid: false, isLeft: min - fragments.length };
    else return { isEmpty: false, isValid: true, isLeft: NaN };
  }

  checkDate({ date }) {
    return validator.isDate(new Date(date));
  }

  checkDegree({ data }) {
    return { isValidDegree: true };
  }

  checkOnlyLatinLetters({ value }) {
    const reg = /^[A-Za-z\s]*$/;
    return reg.test(value);
  }

  checkOnlyLatinLettersAndDash({ value }) {
    const reg = /^[A-Za-z\s-]*$/;
    return reg.test(value);
  }

  checkIsEmail({ value }) {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reg.test(value);
  }

  checkIsValidGender({ value }) {
    return this.availableGenders.includes(value);
  }

  checkIsValidWokplacePosition({ value }) {
    return this.availablePositions.includes(value);
  }

  checkWhiteSpace({ value }) {
    const reg = /\s/g;
    return reg.test(value);
  }

  // helpers
  executeStrSizeAndLatinLetters({
    value,
    min,
    location,
    key,
    withDash = false,
  }) {
    const { isEmpty, isLess } = this.checkStrSize({ value, min });

    const isLatin = withDash
      ? this.checkOnlyLatinLettersAndDash({ value })
      : this.checkOnlyLatinLetters({ value });

    const [step1, step2] = location.split(".");

    let message = {
      hasError: false,
      message: "",
    };

    if (isEmpty)
      message = {
        hasError: true,
        message: `please enter ${key}`,
      };
    else if (min && isLess)
      message = {
        hasError: true,
        message: `${key} must contain min ${min} letter`,
      };
    else if (!isLatin)
      message = {
        hasError: true,
        message: `${key} must contain only latin letters`,
      };

    if (step2) this.error[step1][step2] = message;
    else this.error[step1] = message;
  }
}
