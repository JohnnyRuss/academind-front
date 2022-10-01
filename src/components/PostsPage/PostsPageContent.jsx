import { CreatePost } from '../Layouts';
import PostsPagePostsList from './components/PostsPagePostsList';

function PostsPageContent({ posts, infinite }) {
  return (
    <PostsPagePostsList data={posts} infinite={infinite}>
      <CreatePost />
    </PostsPagePostsList>
  );
}

export default PostsPageContent;
