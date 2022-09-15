import { useEffect } from 'react';

function useRestrictBodyOverflow(isOpen, onMount = false) {
  function restrictScroll(open) {
    const body = document.querySelector('body');
    if (open) body.style.overflow = 'hidden';
    if (!open) body.style.overflow = 'scroll';
  }

  useEffect(() => {
    if (onMount) restrictScroll(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { restrictScroll };
}

export default useRestrictBodyOverflow;
