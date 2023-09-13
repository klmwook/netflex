import { useRefDom } from '@/hooks/useRefDom';
import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useEffect, useState, useRef, RefObject } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

interface Props {
	original: Movie[];
}

function Banner({ original }: Props) {
	const [IsClient, setIsClient] = useState(false);

	const loading = useRef<HTMLDivElement>(null);
	const movieData = useRef<Movie | null>(null);
	movieData.current = original[Math.floor(Math.random() * original.length)];

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<section className='px-4 pb-20 pt-40  flex flex-col space-y-4 py-16 md:space-y-8 lg:space-y-12 lg:px-16 lg:h-[85vh] lg:justify-end overflow-hidden relative'>
			{IsClient && (
				<>
					{/* pic frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full opacity-80'>
						<Image
							src={`${baseURL}original${movieData.current.backdrop_path}`}
							alt={`${movieData.current.title || movieData.current.name}`}
							fill
							priority
							className='object-cover'
							onLoadingComplete={() => loading.current?.remove()}
						/>
						<div className='absolute bottom-0 left-0 w-full h-full bg-gradient1'></div>
						<div
							ref={loading}
							className='w-[40px] h-[40px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-4 border-t-[transparent] border-solid border-[orange] rounded-[50%] z-50 bg-red animate-rotation'
						></div>
					</div>

					{/* title */}
					<h1 className='relative z-[3] text-2xl font-bold drop-shadow md:text-4xl lg:text-7xl'>
						{movieData.current.title || movieData.current.name}
					</h1>

					{/* overview */}
					<p className='relative z-[3] text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
						{movieData.current.overview}
					</p>

					{/* button set */}
					<nav className='relative z-[3] flex space-x-3'>
						<button className='bannerButton bg-white text-black'>
							<FaPlay /> Play
						</button>
						<button className='bannerButton bg-[gray] text-white'>
							<FaInfoCircle /> More Info
						</button>
					</nav>
				</>
			)}
		</section>
	);
}

export default Banner;
