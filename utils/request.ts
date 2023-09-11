const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
	//original: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&region=US&sort_by=release_date.asc&networks=Netflix&release_date.gte=2017-02-01`,
	original: `${BASE_URL}/trending/all/day?with_networks=213&api_key=${API_KEY}`,
	top: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&languages=en-US`,
	sf: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=878`,
	drama: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=18`,
	fantasy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=14`,
	comedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=35`,
	action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=28`,
};

export default requests;
