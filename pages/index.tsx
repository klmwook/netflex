import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/request';
import { Movie } from '@/types';
import Banner from '@/components/Banner';
import Row from '@/components/Row';
import Modal from '@/components/Modal';
import { useRecoilValue } from 'recoil';
import { modalState } from '@/recoil/globalAtom';

//props로 전달받는 data의 타입 지정
interface Props {
	original: Movie[];
	top: Movie[];
	sf: Movie[];
	drama: Movie[];
	horror: Movie[];
	comedy: Movie[];
	action: Movie[];
	random: Movie;
}

const Home: NextPage<Props> = (props: Props) => {
	const showModal = useRecoilValue(modalState);
	return (
		<div className='relatvie h-screen '>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{/* Header 컴포넌트 - 로그아웃 버튼 포함 */}
			<Header />

			<main className='relative'>
				{/* Banner 컴포넌트 - 랜덤 데이터 전달 */}
				<Banner original={props.random} />

				<section>
					{/* row 컴포넌트 - props 전달된 데이터 배열들을 반복 처리 */}
					{Object.values(props)
						//데이터 하나는 배열이 아니므로 해당 데이터 제외하고 반복처리
						.filter((data) => data.length)
						.map((category, idx) => (
							<Row key={idx} movies={category} title={Object.keys(props)[idx]} />
						))}
				</section>
			</main>
			{showModal && <Modal />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	//서버쪽에서 ssr 방식으로 미리 data fetching
	const [original, top, science_fiction, drama, TV_movies, comedy, western] = await Promise.all([
		fetch(requests.original).then((res) => res.json()),
		fetch(requests.top).then((res) => res.json()),
		fetch(requests.science_fiction).then((res) => res.json()),
		fetch(requests.drama).then((res) => res.json()),
		fetch(requests.TV_movies).then((res) => res.json()),
		fetch(requests.comedy).then((res) => res.json()),
		fetch(requests.western).then((res) => res.json()),
	]);

	//fetching된 데이터 배열중에서 original데이터 배열만 랜덤으로 객체정보 하나 분류
	const randomOrigin = original.results[Math.floor(Math.random() * original.results.length)];

	return {
		//페이지 컴포넌트의 prop로 위의 데이터 전달
		props: {
			original: original.results,
			top_rated: top.results,
			science_fiction: science_fiction.results,
			drama: drama.results,
			TV_movies: TV_movies.results,
			comedy: comedy.results,
			western: western.results,
			random: randomOrigin,
		},
	};
};
