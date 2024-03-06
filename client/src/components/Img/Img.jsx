import { useLazyLoading } from '../../hooks';

export const Img = ({ className, src, alt }) => {
	const { imgSrc, node } = useLazyLoading({ src });
	return (
		<img
			ref={node}
			src={imgSrc}
			alt={alt}
			className={`w-full h-full object-cover ${className} `}
		/>
	);
};
