import {
  ValidateBlogPostCreate,
  ValidateCreatePost,
} from "../../lib/validateCreatePost";

export default function useValidateCreatePost() {
  function validateCreateBlogPost(credentials) {
    const { createError } = new ValidateBlogPostCreate(credentials)
      .validateTitle()
      .validateLabels()
      .validateCategory()
      .validateArticle();

    return createError;
  }

  function validateCreatePost(credentials) {
    const { createError } = new ValidateCreatePost(credentials);

    return createError;
  }

  return {
    validateCreateBlogPost,
    validateCreatePost,
  };
}
