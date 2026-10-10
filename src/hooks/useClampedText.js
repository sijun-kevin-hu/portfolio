import { useEffect, useRef, useState } from 'react';

export function useClampedText(isExpanded) {
  const textRef = useRef(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return undefined;

    const checkOverflow = () => {
      if (isExpanded) return;
      setIsClamped(text.scrollHeight > text.clientHeight + 1);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(checkOverflow)
      : null;
    observer?.observe(text);

    return () => {
      window.removeEventListener('resize', checkOverflow);
      observer?.disconnect();
    };
  }, [isExpanded]);

  return { textRef, isClamped };
}
