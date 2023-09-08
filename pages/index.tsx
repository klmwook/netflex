import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/request';

const Home: NextPage = (props) => {
	console.log(props);
	return (
		<div className='relatvie h-screen bg-gradient-to-b from-[#333] to=[#141414]'>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main></main>
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	//promise.all() : promise 반환함수를 배열에 인수로 넣어서병렬식으로 해당 promise가 모두 fullfilled 상태가 되야지만 해당 값을 동기적으로 반환
	const [top, sf, drama, fantasy, comedy, action] = await Promise.all([
		fetch(requests.top).then((res) => res.json()),
		fetch(requests.sf).then((res) => res.json()),
		fetch(requests.drama).then((res) => res.json()),
		fetch(requests.fantasy).then((res) => res.json()),
		fetch(requests.comedy).then((res) => res.json()),
		fetch(requests.action).then((res) => res.json()),
	]);

	return {
		props: { top: top.results, sf: sf.results, drama: drama.results, fantasy: fantasy.results, comdey: comedy.results, action: action.results },
	};
};
