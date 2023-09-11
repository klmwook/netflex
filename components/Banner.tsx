import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
	original: Movie[];
}

function Banner({ original }: Props) {
	const [Movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * original.length);
		setMovie(original[randomNum]);
	}, [original]);

	return (
		<section>
			<div>
				<Image src={`${baseURL}${Movie?.backdrop_path}`} alt={`${Movie?.title || Movie?.name}`} fill priority />
			</div>
		</section>
	);
}

export default Banner;
