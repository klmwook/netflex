import Image from 'next/image';
import logo from '@/public/img/logo.svg';
import profile from '@/public/img/profile.png';
import { FaBell, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';

function Header() {
	const [Scrolled, setScrolled] = useState(false);
	const { logout } = useAuth();

	useEffect(() => {
		const handleScroll = () =>
			window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`transition-colors duration-[.5s] ${
				Scrolled && 'bg-[#141414]'
			}`}
		>
			<div className='flex items-center space-x-2 md:space-x-10'>
				<h1>
					<Image
						src={logo}
						alt='nextflix'
						width={100}
						height={100}
						className='cursor-pointer'
					/>
				</h1>

				<ul className='space-x-4 hidden md:flex '>
					<li className='headerLink'>HOME</li>
					<li className='headerLink'>TV Show</li>
					<li className='headerLink'>Movies</li>
					<li className='headerLink'>New & Popular</li>
					<li className='headerLink'>My List</li>
				</ul>
			</div>

			<div className='flex items-center space-x-4 text-sm font-light'>
				<FaSearch className='w-6' />
				<p className='hidden lg:inline'>Kids</p>
				<FaBell className='w-6' />
				<Link href='/'>
					{/* 로그아웃 버튼 클릭시 전역context에서 logout함수 가져와서 호출 */}
					<Image
						src={profile}
						width={32}
						height={32}
						alt='profile'
						className='rounded'
						onClick={logout}
					/>
				</Link>
			</div>
		</header>
	);
}

export default Header;
