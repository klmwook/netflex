import Head from 'next/head';
import Image from 'next/image';
import logo from '@/public/img/logo.svg';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
	email: string;
	password: string;
}

function Login() {
	const [Login, setLogin] = useState<boolean>(false);
	const {
		register, //원하는 input 요소에 전개연산자로 등록해서 값 관리
		handleSubmit, //submit이벤트 발생시 register에 등록된 input값들의 인증처리 함수
		formState: { errors }, //인증에 실패했을 때 커스텀 에러메시지를 등록 할 수 잇는 객체
	} = useForm<Inputs>();

	return (
		<main className='relative flex w-full h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
			<Head>
				<title>Nextflix Member</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Image
				src='https://rb.gy/p2hphi'
				fill
				priority
				className='z-10 opacity-60 hidden md:inline object-cover'
				alt='login'
			/>

			<Image
				width={150}
				height={150}
				src={logo}
				alt='logo'
				className='absolute left-4 top-4 cursor-pointer md:left-10 md:top-6 z-10'
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			/>

			<form className='relative z-50 mt-24 space-y-8 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
				<h1 className='text-4xl font-semibold'>Sign In</h1>

				<div className='space-y-4'>
					<input type='email' placeholder='Email' className='input' />
					<input type='password' placeholder='Password' className='input' />
				</div>

				<button className='w-full rounded bg-[#e40914] py-3 font-semibold'>
					Sign In
				</button>

				<div className='text-[gray]'>
					New to Nextflix?
					<button className='text-white ml-4 hover:underline'>
						Sign up Now
					</button>
				</div>
			</form>
		</main>
	);
}

export default Login;
