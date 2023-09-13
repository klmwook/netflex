import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '../firebase';

interface IAuth {
	user: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	error: string | null;
	loading: boolean;
}

export const AuthProvider = ({ children }) => {
	const [Loading, setLoading] = useState<boolean>(false);
	const [User, setUser] = useState<User | null>(null);
	const [InitalLoading, setInitalLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		//Auth 상태값이 바뀔때마다 해당 useEffect가 실행 됨.
		onAuthStateChanged(auth, (user) => {
			//인증 상태를 감지해서 전달받은 인증정보 있는지 여부 체크
			if (user) {
				//state에 User정보를 받아서 로딩을 제거하고 메인페이지로 이동
				setUser(user);
				setLoading(false);
				router.push('/');
			} else {
				//state에 값 비우고 로딩을 보여지게하고 로그인 페이지로 이동
				setUser(null);
				setLoading(true);
				router.push('/Login');
			}

			//한번이라도 인증 로직이 실행되면 초기상태를 false로 설정
			setInitalLoading(false);
		});
	}, [router]);
};
