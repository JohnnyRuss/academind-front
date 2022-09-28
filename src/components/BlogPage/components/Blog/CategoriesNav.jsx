import { useLocation } from 'react-router-dom';
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
  //prettier-ignore
  const { search} = useLocation();

  return (
    <div className={styles.categories}>
      <MultiCarousel
        responsiveness={responsive}
        autoPlay={false}
        arrows={true}
        draggable={true}
        swipeable={true}
        className={styles.slider}>
        {routes.map((r) => (
          <Link path={`?category=${r}`} key={uid(6)}>
            <span className={`${styles.listItem} ${search === r ? styles.active : ''}`}>{r}</span>
          </Link>
        ))}
      </MultiCarousel>
    </div>
  );
}

export default CategoriesNav;
