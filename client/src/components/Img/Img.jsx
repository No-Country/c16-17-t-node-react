import { useLazyLoading } from './../../hooks';

export function Img({
  className,
  src,
  alt,
}) {
  const { imgSrc, node } = useLazyLoading({ src });

  return (
    <img
      ref={node}
      className={`w-full h-full object-cover bg-gray-300 ${className}`}
      src={imgSrc}
      alt={alt}
    />
  );
}
