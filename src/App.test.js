/* eslint-disable import/first */
jest.mock('./useGetCatBreeds');
jest.mock('./useImageState');

import { fireEvent, render, screen } from '@testing-library/react';
import App, { randomArrayElement } from './App';
import * as useGetCatBreedsImports from './useGetCatBreeds';
import * as useImageStateImports from './useImageState';

const MOCK_DATA = [
	{
		weight: {
			imperial: '7  -  10',
			metric: '3 - 5'
		},
		id: 'abys',
		name: 'Abyssinian',
		cfa_url: 'http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx',
		vetstreet_url: 'http://www.vetstreet.com/cats/abyssinian',
		vcahospitals_url: 'https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian',
		temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
		origin: 'Egypt',
		country_codes: 'EG',
		country_code: 'EG',
		description:
			'The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.',
		life_span: '14 - 15',
		indoor: 0,
		lap: 1,
		alt_names: '',
		adaptability: 5,
		affection_level: 5,
		child_friendly: 3,
		dog_friendly: 4,
		energy_level: 5,
		grooming: 1,
		health_issues: 2,
		intelligence: 5,
		shedding_level: 2,
		social_needs: 5,
		stranger_friendly: 5,
		vocalisation: 1,
		experimental: 0,
		hairless: 0,
		natural: 1,
		rare: 0,
		rex: 0,
		suppressed_tail: 0,
		short_legs: 0,
		wikipedia_url: 'https://en.wikipedia.org/wiki/Abyssinian_(cat)',
		hypoallergenic: 0,
		reference_image_id: '0XYvRd7oD',
		image: {
			id: '0XYvRd7oD',
			width: 1204,
			height: 1445,
			url: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'
		}
	},
	{
		weight: {
			imperial: '7 - 10',
			metric: '3 - 5'
		},
		id: 'aege',
		name: 'Aegean',
		vetstreet_url: 'http://www.vetstreet.com/cats/aegean-cat',
		temperament: 'Affectionate, Social, Intelligent, Playful, Active',
		origin: 'Greece',
		country_codes: 'GR',
		country_code: 'GR',
		description:
			'Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.',
		life_span: '9 - 12',
		indoor: 0,
		alt_names: '',
		adaptability: 5,
		affection_level: 4,
		child_friendly: 4,
		dog_friendly: 4,
		energy_level: 3,
		grooming: 3,
		health_issues: 1,
		intelligence: 3,
		shedding_level: 3,
		social_needs: 4,
		stranger_friendly: 4,
		vocalisation: 3,
		experimental: 0,
		hairless: 0,
		natural: 0,
		rare: 0,
		rex: 0,
		suppressed_tail: 0,
		short_legs: 0,
		wikipedia_url: 'https://en.wikipedia.org/wiki/Aegean_cat',
		hypoallergenic: 0,
		reference_image_id: 'ozEvzdVM-',
		image: {
			id: 'ozEvzdVM-',
			width: 1200,
			height: 800,
			url: 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg'
		}
	}
];

const useGetCatBreedsSpy = jest.spyOn(useGetCatBreedsImports, 'useGetCatBreeds');
const useImageStateSpy = jest.spyOn(useImageStateImports, 'useImageState');

describe('Main entry point App', () => {
	beforeEach(() => {
		useGetCatBreedsSpy.mockImplementation(() => MOCK_DATA);
		useImageStateSpy.mockImplementation(() => 'loaded');
	});

	it('should not break when rendering App component', () => {
		render(<App />);
		expect(screen.getByTestId('main')).toBeVisible();
	});

	it('should render cats', () => {
		render(<App />);

		expect(screen.getByTestId('select').childElementCount).toBe(MOCK_DATA.length + 1);

		// expect() expect to dropdown to have 2 cat breeeds
	});

	it('should change the selected cat on changing the select element', () => {
		render(<App />);
		expect(screen.getByTestId('cat-image')).toHaveAttribute('alt', 'default cat');
		fireEvent.change(screen.getByTestId('select'), { target: { value: 'abys' } });

		expect(screen.getByTestId('cat-image')).toHaveAttribute('alt', 'abys');

		// when it changes we need to expect it to change the selected cat
	});
});

describe('randomArrayElement function', () => {
	it('should return one random element from array', () => {
		expect(randomArrayElement([1, 3, 45, 6, 22, 4, 61, 2, 343])).not.toBeNaN();
	});

	it('should return null if empty array', () => {
		expect(randomArrayElement([])).toBeNull();
	});
});
