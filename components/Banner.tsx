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
		<section className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
			{/* pic frame */}
			<div className='absolute top-0 left-0 z-[1] h-[95vh] w-full'>
				<Image src={`${baseURL}${Movie?.backdrop_path}`} alt={`${Movie?.title || Movie?.name}`} fill priority quality={50} className='object-cover' />
			</div>

			{/* title */}
			<h1 className='relative z-[3] text-2xl font-bold drop-shadow md:text-4xl lg:text-7xl'>{Movie?.title || Movie?.name}</h1>

			{/* overview */}
			<p className='relative z-[3] text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl'>{Movie?.overview}</p>
		</section>
	);
}

export default Banner;
