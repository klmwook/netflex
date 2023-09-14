import useAuth from '@/hooks/useAuth';
import { useRefDom } from '@/hooks/useRefDom';
import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useRef } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/globalAtom';

interface Props {
	original: Movie;
}

function Banner({ original }: Props) {
	//전역 context로 부터 초기로딩 상태값을 가져옴
	const { InitialLoading } = useAuth();
	const loading = useRef<HTMLDivElement>(null);
	const [ShowModal, setShowModal] = useRecoilState(modalState);

	return (
		<section className='h-[50vh] px-4 pb-20 pt-40 flex flex-col space-y-4 py-16 md:space-y-8 lg:space-y-12 lg:px-16 md:h-[60vh] lg:h-[85vh] lg:justify-end overflow-hidden relative'>
			{InitialLoading.current ? (
				//user인증정보 받아지기 전까지는 프레임 틀은 유지하되 로딩바만 보이고
				//인증정보 받아지면 데이터 출력
				//새로고침시 인증정보 바뀔때마다 두번 렌더링되는 것을 방지하기 위함
				<div className='loading'></div>
			) : (
				<>
					{/* pic frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full opacity-80'>
						<Image
							//서버에서 random으로 전달한 데이터를 바로 활용
							src={`${baseURL}original${original.backdrop_path}`}
							alt={`${original.title || original.name}`}
							fill
							priority
							className='object-cover'
							onLoadingComplete={() => loading.current?.remove()}
						/>
						<div className='absolute bottom-0 left-0 w-full h-full bg-gradient1'></div>
						<div ref={loading} className='loading'></div>
					</div>

					{/* title */}
					<h1 className='relative z-[3] text-2xl font-bold drop-shadow md:text-4xl lg:text-7xl'>{original.title || original.name}</h1>

					{/* overview */}
					<p className='relative z-[3] text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>{original.overview}</p>

					{/* button set */}
					<nav className='relative z-[3] flex space-x-3'>
						<button className='bannerButton bg-white text-black' onClick={() => setShowModal(true)}>
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
