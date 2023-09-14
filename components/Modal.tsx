import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState } from '@/recoil/globalAtom';

function Modal() {
	const [_, setShowModal] = useRecoilState(modalState);
	const movieData = useRecoilValue(movieState);
	return (
		<aside className='fixed w-full h-screen top-0 left-0 z-50 bg-black/90 p-10 flex items-center justify-center'>
			<article className='w-[600px] h-full'>
				<h2>{movieData?.original_title || movieData?.origin_name}</h2>
			</article>
			<span className='absolute top-10 right-10 text-[16px] text-white cursor-pointer font-bold' onClick={() => setShowModal(false)}>
				close
			</span>
		</aside>
	);
}

export default Modal;
