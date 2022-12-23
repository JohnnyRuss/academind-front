import { useDispatch } from "react-redux";
import {
  getPost,
  resetPosts,
  resetErrorOnPost,
} from "../../store/reducers/postsDataReducer";

export default function useRedirectedPostQuery() {
  const dispatch = useDispatch();

  function getPostQuery(id) {
    dispatch(getPost(id));
  }

  function resetState() {
    dispatch(resetPosts());
  }

  function handleResetPostError() {
    dispatch(resetErrorOnPost());
  }

  return { getPostQuery, resetState, handleResetPostError };
}
