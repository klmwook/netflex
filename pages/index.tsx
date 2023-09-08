import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>NETFLEX - 사이트 개발 공부</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header></Header>
			<main>
				<h1>NETFLEX - 연습</h1>
			</main>
		</div>
	);
};

export default Home;
