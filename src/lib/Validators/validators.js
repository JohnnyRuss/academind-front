import validator from "validator";

export class Validator {
  checkStrSize({ value, min }) {
    if (!value.trim()) return { isLess: false, isEmpty: true };
    else if (min && value.trim().length < min)
      return { isLess: true, isEmpty: false };
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

  checkDate({ date }) {
    return validator.isDate(new Date(date));
  }

  checkDegree({ data }) {
    return { isValidDegree: true };
  }
}
