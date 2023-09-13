import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/request';
import Image from 'next/image';
import { Movie } from '@/types';
import Banner from '@/components/Banner';
import Row from '@/components/Row';

interface Props {
	original: Movie[];
	top: Movie[];
	sf: Movie[];
	drama: Movie[];
	horror: Movie[];
	comedy: Movie[];
	action: Movie[];
}

//Next 기본으로 제공하는 NextPage타입에는 커스텀 Props타입이 설정되어있지 않기 때문에
//Generic을 활용해서 Props타입의 인터페이스를 직접 변수로 호출할때 설정
const Home: NextPage<Props> = (props: Props) => {
	//배열로 묶은 데이터를 useState로 담아서 재전달
	//배열로 묶은 데이터를 useRef 참조객체에 담아서 재전달
	//비구조화할당이 아닌 객체를 통채로 받아서 전달해주고 활용하는 컴포넌트내부에서 Object.key(). value()로 내부에서 반복처리
	return (
		<div className='relatvie h-screen '>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className='relative'>
				<Banner original={props.original} />

				<section>
					{Object.values(props).map((category, idx) => (
						<Row key={idx} movies={category} title={Object.keys(props)[idx]} />
					))}
				</section>
			</main>
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	//promise.all() : promise반환함수를 배열에 인수로 넣어서 병렬식으로 해당 promise가 모두 fullfilled 상태가 되야지만 해당 값을 동기적으로 반환
	const [original, top, science_fiction, drama, TV_movies, comedy, western] =
		await Promise.all([
			fetch(requests.original).then((res) => res.json()),
			fetch(requests.top).then((res) => res.json()),
			fetch(requests.science_fiction).then((res) => res.json()),
			fetch(requests.drama).then((res) => res.json()),
			fetch(requests.TV_movies).then((res) => res.json()),
			fetch(requests.comedy).then((res) => res.json()),
			fetch(requests.western).then((res) => res.json()),
		]);

	return {
		props: {
			original: original.results,
			top_rated: top.results,
			science_fiction: science_fiction.results,
			drama: drama.results,
			TV_movies: TV_movies.results,
			comedy: comedy.results,
			western: western.results,
		},
	};
};
