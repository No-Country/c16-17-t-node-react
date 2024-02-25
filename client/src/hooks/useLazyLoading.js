import {
  useEffect,
  useRef,
  useState,
} from 'react';

export function useLazyLoading({ src }) {
  const [imgSrc, setimgSrc] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=');
  const node = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) setimgSrc(src);
    });
    observer.observe(node.current);

    return () => {
      observer.disconnect();
    }
  }, [src]);

  return {
    imgSrc,
    node,
  };
}
