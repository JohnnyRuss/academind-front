import { uid } from 'uid';

import { blogPosts } from '../../utils';

import styles from './components/Blog/blog.module.scss';
import { SideBar, BlogPost, CreateBlogPostTouch } from '../Layouts';
import { Stand, RightBar, CategoriesNav } from './components/Blog';

function Blog() {
  return (
    <div className={styles.blogPage}>
      <SideBar className={styles.leftBar}>{/* <p>test</p> */}</SideBar>
      <Stand />
      <CategoriesNav />
      <div className={styles.content}>
        <CreateBlogPostTouch />
        {blogPosts.map((post) => (
          <BlogPost post={post} key={uid(6)} />
        ))}
      </div>
      <RightBar />
    </div>
  );
}

export default Blog;
