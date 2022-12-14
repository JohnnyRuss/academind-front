import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usePostQuery } from "../../../../hooks";

import { setUpdateBlogPostModalOpen } from "../../../../store/reducers/portalReducer";
import { destructurePostUpdateData } from "../../../../lib/destructurers";

import styles from "./styles/article.module.scss";
import { BlogPostIdentifier, PostOptions } from "../../../Layouts";

function Article({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { deletePostHandler, savePostHandler } = usePostQuery();

  function deleteHandler() {
    navigate({ pathname: "/blog" }, { replace: true });
    deletePostHandler(post._id);
  }

  return (
    <div className={styles.postIntro}>
      <div className={styles.articleHead}>
        <BlogPostIdentifier
          title={post.title}
          author={post.author}
          tags={post.tags}
          audience={post.audience}
          categories={post.categories}
          postId={post._id}
          createdAt={post.createdAt}
        />
        <PostOptions
          audience={post.audience}
          isBlogPostOptions={true}
          postId={post._id}
          savePostHandler={() => savePostHandler(post._id)}
          deleteHandler={deleteHandler}
          updateHandler={() =>
            dispatch(
              setUpdateBlogPostModalOpen(destructurePostUpdateData(post))
            )
          }
        />
      </div>
      <div className={styles.article}>{post.article}</div>
    </div>
  );
}

export default Article;
