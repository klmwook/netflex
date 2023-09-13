const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
//213
const requests = {
	//original: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&region=US&sort_by=release_date.asc&networks=Netflix&release_date.gte=2017-02-01`,
	original: `${BASE_URL}/trending/all/day?with_networks=Netflix&api_key=${API_KEY}`,
	top: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&with_networks=Netflix&languages=en-US`,
	science_fiction: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=Netflix&languages=en-US&with_genres=878`,
	drama: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=Netflix&languages=en-US&with_genres=18`,
	TV_movies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=Netflix&languages=en-US&with_genres=10770`,
	comedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=Netflix&languages=en-US&with_genres=35`,
	western: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=Netflix&languages=en-US&with_genres=37`,
};

export default requests;
