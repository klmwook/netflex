import { Movie } from '@/types';
import Image from 'next/image';
import { baseURL } from '@/url';

interface Props {
	movies: Movie[];
}

function List({ movies }: Props) {
	return (
		<ul className='w-full flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-thin  scrollbar-track-[transparent] scrollbar-thumb-[transparent]   group-hover:scrollbar-thumb-red-600 '>
			{movies.map((movie, idx) => {
				return (
					<li
						key={idx}
						className='min-w-[120px] h-[70px] relative md:min-w-[180px] md:h-[80px] lg:min-w-[200px] lg:h-[100px]'
					>
						<Image
							src={`${baseURL}w300${movie.backdrop_path}`}
							alt={`${movie.title || movie.name}`}
							fill
							quality={70}
							placeholder='blur'
							blurDataURL={`${baseURL}w300${movie.backdrop_path}`}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='object-cover'
						/>
					</li>
				);
			})}
		</ul>
	);
}

export default List;
