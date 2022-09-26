import { uid } from 'uid';

import { blogPosts } from '../../utils';

import styles from './components/Blog/blog.module.scss';
import { SideBar, CreatePost, BlogPost } from '../Layouts';
import { Stand, RightBar, CategoriesNav } from './components/Blog';
import DraftEditor from './DraftEditor';

function Blog() {
  return (
    <div className={styles.blogPage}>
      <SideBar className={styles.leftBar}>{/* <p>test</p> */}</SideBar>
      <Stand />
      <CategoriesNav />
      <div className={styles.content}>
        <DraftEditor />
        {/* <CreatePost className={styles.createBlogPost} /> */}
        {blogPosts.map((post) => (
          <BlogPost post={post} key={uid(6)} />
        ))}
      </div>
      <RightBar />
    </div>
  );
}

export default Blog;
