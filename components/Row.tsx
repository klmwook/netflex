import { Movie } from '@/types';
import List from './List';

interface Props {
	title: string;
	movies: Movie[];
}

function Row({ title, movies }: Props) {
	return (
		<article className='pl-4 pb-[10px] mb-4  md:pb-[30px] md:pl-12'>
			<h2 className='w-56 cursor-pointer text-base font-semibold text-[#e5e5e5] transition duration-200 md:text-xl lg:text-2xl hover:text-white '>
				{title.includes('_')
					? title
							.split('_')
							.map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
							.join(' ')
					: title.charAt(0).toUpperCase() + title.substring(1, title.length)}
			</h2>

			<div className='relative group'>
				<List movies={movies} />
			</div>
		</article>
	);
}

export default Row;
