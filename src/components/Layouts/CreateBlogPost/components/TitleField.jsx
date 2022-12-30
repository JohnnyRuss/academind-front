function TitleField({ value, setTitle, error }) {
  return (
    <div data-blog-post-field>
      <label
        title="is required and must contain min 2 letter"
        htmlFor="blogPostTitle"
      >
        Title
      </label>
      <input
        type="text"
        id="blogPostTitle"
        value={value}
        onChange={setTitle}
        placeholder="title"
      />
      {error.hasError && <p data-create-blogpost-error-box>{error.message}</p>}
    </div>
  );
}

export default TitleField;
