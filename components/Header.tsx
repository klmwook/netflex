import Image from 'next/image';
import logo from '@/public/img/logo.svg';
import profile from '@/public/img/profile.png';
import { FaBell, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

function Header() {
	return (
		<header>
			<div className='flex items-center space-x-2 md:space-x-10'>
				<h1>
					<Image src={logo} alt='netflex' width={100} height={100} className='cursor-pointer' />
				</h1>

				<ul className='space-x-4 md:flex'>
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
					<Image src={profile} alt='profile' width={32} height={32} className='rounded' />
				</Link>
			</div>
		</header>
	);
}

export default Header;
