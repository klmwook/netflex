import Head from 'next/head';
import Image from 'next/image';

function Login() {
	return (
		<main className='relative flex w-full h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
			<Head>
				<title>NetFlex Member</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Image
				src='https://rb.gy/p2hphi'
				fill
				priority
				className='z-10 opacity-60 hidden md:inline object-cover'
				alt='Login'
			/>
		</main>
	);
}

export default Login;
