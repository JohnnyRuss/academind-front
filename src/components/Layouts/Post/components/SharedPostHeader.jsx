import { PostDescription } from './';
import { UserIdentifier } from '../../';

/**
 * if post is shared, here will be shown current user avatar and userName
 */
function SharedPostHeader({ data, descriptionClassName, identifierClassName }) {
  return (
    <>
      <UserIdentifier
        userId={data.authorId}
        userName={data.authorName}
        img={data.authorImg}
        timeAgo={data.createdAt}
        className={identifierClassName}
      />
      <PostDescription description={data.description} className={descriptionClassName} />
    </>
  );
}

export default SharedPostHeader;
