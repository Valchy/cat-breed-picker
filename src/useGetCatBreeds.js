import { useEffect, useState } from 'react';

export const useGetCatBreeds = () => {
	const [breeds, setBreeds] = useState([]);
	const cat_api_url = 'https://api.thecatapi.com/v1/breeds';

	useEffect(() => {
		fetch(cat_api_url)
			.then(res => res.json())
			.then(data => setBreeds(data))
			.catch(() =>
				console.error(
					'Fetch cat breeds error, sorry for the inconvenience'
				)
			);
	}, []);

	return breeds;
};
