import { useEffect } from 'react';

function useScrollUp(scrollTo, behavior = 'instant') {
  useEffect(() => {
    if (scrollTo === 'top') return window.scrollTo({ top: 0, left: 0, behavior: behavior });
  }, [scrollTo, behavior]);
}

export default useScrollUp;
