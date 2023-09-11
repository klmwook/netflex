import { Movie } from '@/types';
import { useEffect, useState } from 'react';

interface Props {
	original: Movie[];
}

function Banner({ original }: Props) {
	const [Movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {});

	return <div>Banner</div>;
}

export default Banner;
