import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

interface Props {
	original: Movie[];
}

function Banner({ original }: Props) {
	const [Movie, setMovie] = useState<Movie | null>(null);
	const Loading = useRef<any>();

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * original.length);
		setMovie(original[randomNum]);
	}, [original]);

	return (
		<section className=' px-4 pb-20 pt-40  flex flex-col space-y-4 py-16 md:space-y-8 lg:space-y-12 lg:px-16 lg:h-[85vh] lg:justify-end overflow-hidden relative'>
			{Movie && (
				<>
					{/* pic frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full'>
						<Image
							src={`${baseURL}original${Movie.backdrop_path}`}
							alt={`${Movie.title || Movie.name}`}
							fill
							priority
							quality={70}
							className='object-cover'
							onLoadingComplete={() => Loading.current.remove()}
						/>
						<div className='absolute botto-0 left-0 w-full h-full bg-gradient1'></div>
						<div
							className='w-[40px] h-[40px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] border-4 border-solid border-[orange] rounded-[50%] z-30 border-t-[transparent] bg-red animate-ani-rotation'
							ref={Loading}
						></div>
					</div>

					{/* title */}
					<h1 className='relative z-[3] text-2xl font-bold drop-shadow md:text-4xl lg:text-7xl'>
						{Movie.title || Movie.name}
					</h1>

					{/* overview */}
					<p className='relative z-[3] text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
						{Movie.overview}
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
