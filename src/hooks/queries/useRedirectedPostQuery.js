import { useDispatch } from "react-redux";
import { getPost, resetPosts } from "../../store/reducers/postsDataReducer";

export default function useRedirectedPostQuery() {
  const dispatch = useDispatch();

  function getPostQuery(id) {
    dispatch(getPost(id));
  }

  function resetState() {
    dispatch(resetPosts());
  }

  return { getPostQuery, resetState };
}
