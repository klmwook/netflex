import { useRefDom } from '@/hooks/useRefDom';
import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

interface Props {
	original: Movie[];
}

//서버사이드 렌더링으로 프리렌더된 데이터를 활용하는 컴포넌트일때 다음과 오류뜰떄 해결방법
//Error: Text content does not match server-rendered HTML.
//해결방법: IsClent라는 state를 만들어서 컴포넌트가 마운트되었을떄 해당값을 true 로 변경
//프리렌더된 데이터를 활용하느 코드블록에 IsClient값이 true일때에만 동작하도록 분기처리
//서버쪽에서 pre-render하려고 할때 IsClient의 조건과 맞지 않기 때문에 해당 데이터의 pre-render를 막아서 오류를 예방
function Banner({ original }: Props) {
	const [IsClient, setIsClient] = useState(false);
	//useRefDom이라는 커스텀훅을 호출해서 HTMLDivElement라는 타입이 확장된 새로운 참조객체 생성하고
	//ref props에 loading이라는 div Element요소를 참조가능하도록 설정
	//참고 링크 - https://stackoverflow.com/questions/61102101/cannot-assign-refobjecthtmldivelement-to-refobjecthtmlelement-instance
	const { ref: Loading } = useRefDom<HTMLDivElement>();
	const movieData = useRef<Movie | null>(null);
	movieData.current = original[Math.floor(Math.random() * original.length)];

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<section className=' px-4 pb-20 pt-40  flex flex-col space-y-4 py-16 md:space-y-8 lg:space-y-12 lg:px-16 lg:h-[85vh] lg:justify-end overflow-hidden relative'>
			{IsClient && (
				<>
					{/* pic frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full'>
						<Image
							src={`${baseURL}original${movieData.current.backdrop_path}`}
							alt={`${movieData.current.title || movieData.current.name}`}
							fill
							priority
							quality={70}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='object-cover'
							onLoadingComplete={() => Loading.current?.remove()}
						/>
						<div className='absolute botto-0 left-0 w-full h-full bg-gradient1'></div>
						{/* 							
							//해당 ref객체에 연결되는 요소가 Div요소면 useRef에서 반환하는 요소는 HTMLElement인데
							//ref연결될떄 판단하는 type값을 HTMLDivElement여서 ref에 참조객체 할당시 타입 오류반환
							//useRef에 직접 HTMLDivElement라는 타입을 추가할수 없기 때문에
							//useRefDom이라는 커스텀훅을 만들어서 해당 훅안에서 extends키워드로 generic을 활용에 HTMLDivElement가 포함된 타입을 변수로 넣어서 다시 반환 */}
						<div
							className='w-[40px] h-[40px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] border-4 border-solid border-[orange] rounded-[50%] z-30 border-t-[transparent] bg-red animate-ani-rotation'
							ref={Loading}
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
