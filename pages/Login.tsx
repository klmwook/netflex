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

	//handleSubmit함수가 인증처리 완료시 동기적으로 실행될 콜백 함수
	//해당함수에 등록된 타입은 해당hook이 내장하고 있는 인터페이스로 지정
	const join: SubmitHandler<Inputs> = async ({ email, password }) => {
		console.log(`Email : ${email}`);
		console.log(`Password : ${password}`);
	};

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

			<form
				//submit 이벤트가 발생시 handleSubmit이 인증처리를 해주고 인증의 결과값을 등록된 콜백함수에 전달
				onSubmit={handleSubmit(join)}
				className='relative z-50 mt-24 space-y-8 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
			>
				<h1 className='text-4xl font-semibold'>Sign In</h1>

				<div className='space-y-4'>
					<input
						type='email'
						placeholder='Email'
						className='input'
						{...register('email', { required: true })}
					/>
					{errors.email && <span>Please enter a valid Email</span>}
					<input
						type='password'
						placeholder='Password'
						className='input'
						{...register('password', { required: true })}
					/>
					{errors.password && <span>Please enter a valid Password</span>}
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
