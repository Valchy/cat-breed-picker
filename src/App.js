import { useState } from 'react';
import { useGetCatBreeds } from './useGetCatBreeds';
import { useImageState } from './useImageState';

// idle loading loaded changed

function App() {
	const breeds = useGetCatBreeds();
	const [breedId, setBreedId] = useState(null);
	const selectedBreed = breeds?.find(({ id }) => id === breedId) || null;
	const imageState = useImageState(selectedBreed?.image?.url);

	const breedChangeHandler = ({ target }) => {
		// Show image based on selection
		setBreedId(target.value);
	};

	const randomBreed = () => {
		let randomBreed = randomArrayElement(breeds);
		if (randomBreed !== null) breedChangeHandler({ target: { value: randomBreed.id } });
	};

	return (
		<div
			data-testid="main"
			style={{
				marginTop: 50,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			{/* Header and cat picker */}
			<h1>Cat Breed Picker</h1>
			<select value={breedId || 'default'} onChange={breedChangeHandler} data-testid="select">
				<option disabled value="default">
					...
				</option>
				{breeds?.map(({ name, id }, index) => (
					<option value={id} key={`breed-${index}`}>
						{name}
					</option>
				))}
			</select>
			<button style={{ marginTop: 15 }} onClick={randomBreed}>
				Random Breed
			</button>

			{/* Cat Image / default, loading or selected */}
			{!selectedBreed ? (
				<></>
			) : imageState === 'loaded' ? (
				<img
					style={{ margin: '25px 0' }}
					width="200"
					data-testid="cat-image"
					src={selectedBreed?.image?.url}
					alt={breedId || 'cat'}
				/>
			) : (
				<img style={{ margin: '25px 0' }} width="200" data-testid="cat-image" src="./loading.gif" alt="loading" />
			)}

			{/* Cat Info Part */}
			{selectedBreed && (
				<div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
					{selectedBreed.alt_names && <span style={{ marginBottom: 10 }}>Alt name: {selectedBreed.alt_names}</span>}
					<span>Weight: {selectedBreed.weight.metric}kg</span>
					<span>Origin: {selectedBreed.country_code}</span>
					<p>{selectedBreed.description}</p>
					<a href={selectedBreed.wikipedia_url} target="_blank" rel="noreferrer">
						Learn more
					</a>
				</div>
			)}
		</div>
	);
}

export const randomArrayElement = (array = []) => {
	if (array.length === 0) return null;
	return array[Math.floor(Math.random() * array.length)];
};

export default App;
