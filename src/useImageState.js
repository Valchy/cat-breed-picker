import { useEffect, useState } from 'react';

export const useImageState = (url, onLoad, onError) => {
	const [state, setState] = useState('idle');

	useEffect(() => {
		if (!url) return setState('idle');
		const img = new Image();
		setState('loading');
		img.src = url;
		const onImageLoad = () => {
			setState('loaded');
			onLoad?.();
			img.remove();
		};
		const onImageError = () => {
			setState('error');
			onError?.();
			img.remove();
		};
		img.addEventListener('load', onImageLoad);
		img.addEventListener('error', onImageError);

		return () => {
			img.removeEventListener('load', onImageLoad);
			img.removeEventListener('error', onImageError);
			img.remove();
		};
	}, [url, onLoad, onError, setState]);

	return state;
};
