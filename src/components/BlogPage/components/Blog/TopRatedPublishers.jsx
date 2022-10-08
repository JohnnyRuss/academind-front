import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import styles from './styles/topRatedPublishers.module.scss';
import { Image, Spinner, Link } from '../../../Interface';

function TopRatedPublishers() {
  const {
    topRatedPublishers: publishers,
    publishersLoadingState: { loading },
  } = useSelector(({ postsData }) => postsData);

  const { search, pathname } = useLocation();

  return (
    <ul className={styles.topRatedPublishers}>
      {loading && <Spinner />}
      {!loading &&
        publishers?.map((publisher) => (
          <li className={styles.topRatedPublisher} key={publisher._id}>
            <Link
              path={controllQuery(search, pathname, publisher._id)}
              className={search.includes(publisher._id) ? styles.activeLink : ''}>
              <Image src={publisher.author.profileImg} className={styles.userImg} />
              <span className={styles.details}>
                <h3 className={styles.userName}>{publisher.author.userName}</h3>
                <span className={styles.postsAmount}>{publisher.posts} blog posts</span>
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default TopRatedPublishers;

function controllQuery(search, pathname, route) {
  const start = search.slice(search.indexOf('author='));
  const authorQuery = start?.split('&')[0];
  const currRoute = authorQuery ? authorQuery.split('=')[1] : undefined;

  return search && !currRoute
    ? `${pathname}${search}&author=${route}`
    : search && currRoute && currRoute !== route
    ? `${pathname}${search.replace(`${currRoute}`, route)}`
    : search && currRoute && currRoute === route
    ? `${pathname}${search.replace(
        authorQuery.includes(`&author=${currRoute}`)
          ? `&author=${currRoute}`
          : `author=${currRoute}`,
        ''
      )}`
    : !search
    ? `?author=${route}`
    : '/';
}
