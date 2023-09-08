const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
	top: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&languages=en-US`,
	sf: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=878`,
	drama: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=18`,
	comedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=14`,
	fantasy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=35`,
	action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=28`,
};

export default requests;
