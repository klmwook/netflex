import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/request';
import Image from 'next/image';
import { Movie } from '@/types';
import Banner from '@/components/Banner';

interface Props {
	original: Movie[];
	top: Movie[];
	sf: Movie[];
	drama: Movie[];
	fantasy: Movie[];
	comedy: Movie[];
	action: Movie[];
}

//Next 기본으로 제공하는 NextPage타입에는 커스텀 Props타입이 설정되어 있지 않기 때문에 Generic을 활용해서 Props타입의 인터페이스를 직접 변수로 호출할때 설정
const Home: NextPage<Props> = ({ original, top, sf, drama, fantasy, comedy, action }: Props) => {
	return (
		<div className='relatvie h-screen bg-gradient-to-b from-[#333] to=[#141414]'>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className='relative px-4 pb-24 lg:px-16 lg:space-y-24'>
				<Banner original={original} />
			</main>
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	//promise.all() : promise 반환함수를 배열에 인수로 넣어서병렬식으로 해당 promise가 모두 fullfilled 상태가 되야지만 해당 값을 동기적으로 반환
	const [original, top, sf, drama, fantasy, comedy, action] = await Promise.all([
		fetch(requests.original).then((res) => res.json()),
		fetch(requests.top).then((res) => res.json()),
		fetch(requests.sf).then((res) => res.json()),
		fetch(requests.drama).then((res) => res.json()),
		fetch(requests.fantasy).then((res) => res.json()),
		fetch(requests.comedy).then((res) => res.json()),
		fetch(requests.action).then((res) => res.json()),
	]);

	return {
		props: { original: original.results, top: top.results, sf: sf.results, drama: drama.results, fantasy: fantasy.results, comedy: comedy.results, action: action.results },
	};
};
