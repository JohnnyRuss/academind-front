function TitleField({ value, setTitle }) {
  return (
    <div data-blog-post-field>
      <label htmlFor="blogPostTitle">Title</label>
      <input
        type="text"
        id="blogPostTitle"
        value={value}
        onChange={setTitle}
        placeholder="title"
      />
    </div>
  );
}

export default TitleField;
