import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function useScrollUp(scrollTo, behavior = 'instant') {
  const { id } = useParams();

  useEffect(() => {
    if (scrollTo === 'top') return window.scrollTo({ top: 0, left: 0, behavior: behavior });
  }, [scrollTo, behavior, id]);
}

export default useScrollUp;
