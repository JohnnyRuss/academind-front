import { useLocation, NavLink, useParams } from 'react-router-dom';
import { uid } from 'uid';

import styles from './styles/categoriesNav.module.scss';
import { MultiCarousel } from '../../../Layouts';
import { Link } from '../../../Interface';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 8,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1280, min: 960 },
    items: 6,
    slidesToSlide: 3,
  },
  tablet_portrate: {
    breakpoint: { max: 960, min: 464 },
    items: 4,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const routes = [
  'global',
  'economics',
  'jurisprudence',
  'medicine',
  'math',
  'phisique',
  'chemistry',
  'test 8',
  'test 9',
  'test 10',
];

function CategoriesNav() {
  const { search, pathname } = useLocation();
  const { categorySubString, categorySubStringArr } = generateCategorySubstring(search);

  return (
    <div className={styles.categories}>
      <MultiCarousel
        responsiveness={responsive}
        autoPlay={false}
        arrows={true}
        draggable={true}
        swipeable={true}
        className={styles.slider}>
        {routes.map((route) => (
          <NavLink
            to={controllCategoryQuery(
              categorySubString,
              categorySubStringArr,
              route,
              pathname,
              search
            )}
            key={uid(6)}>
            <span
              className={`${styles.listItem} ${
                categorySubStringArr?.includes(route) ? styles.active : ''
              }`}>
              {route}
            </span>
          </NavLink>
        ))}
      </MultiCarousel>
    </div>
  );
}

export default CategoriesNav;

function generateCategorySubstring(search) {
  const hasCategory = search.includes('category');
  const start = hasCategory ? search.slice(search.indexOf('category')).split('&')[0] : '';

  const categorySubStringArr = start ? start.split('category=')[1].split(',') : [];
  const categorySubString = categorySubStringArr?.join(',');

  return { categorySubStringArr, categorySubString };
}

function controllCategoryQuery(categorySubString, categorySubStringArr, route, pathname, search) {
  return categorySubString
    ? categorySubStringArr.includes(route) && categorySubStringArr.length > 1
      ? `${pathname}${search}`.replace(`,${route}`, '')
      : categorySubStringArr.includes(route) && categorySubStringArr.length === 1
      ? `${pathname}${search.replace(
          search.includes(`&category=${route}`) ? `&category=${route}` : `category=${route}`,
          ''
        )}`
      : search.includes(route)
      ? ''
      : `${pathname}${search.replace(`${categorySubString}`, `${categorySubString},${route}`)}`
    : search
    ? `${pathname}${search}&category=${route}`
    : `?category=${route}`;
}
