import { Movie } from '@/types';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { baseURL } from '@/url';

interface Props {
	title: string;
	movies: Movie[];
}

function Row({ title, movies }: Props) {
	const [Movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		setMovies(movies);
	}, [movies]);

	return (
		<article className='space-y-0.5 z-20 md:space-y-2  md:pb-[30px]'>
			<h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>{title}</h2>

			<div className='relative'>
				<ul className='w-full flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-thin scrollbar-track-[transparent] scrollbar-thumb-red-600 scrollbar-none  hover:scrollbar-thin scrollbar'>
					{Movies.map((movie, idx) => {
						return (
							//부모요소에 flex를 적용해서 자식요소를 좌우배치하면 flex넚이값 균등배치 우선적용되기 떄문에
							//자식요소의 넓이값을 고정px로 주고 싶을때에는 width가 아닌 min-width로 설정
							<li key={idx} className='min-w-[180px] h-[80px] relative'>
								<Image src={`${baseURL}w300${movie.backdrop_path}`} alt={`${movie.title || movie.name}`} fill priority quality={70} className='object-cover' />
							</li>
						);
					})}
				</ul>
			</div>
		</article>
	);
}

export default Row;
