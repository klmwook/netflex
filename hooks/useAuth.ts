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
	User: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	Error: string | null;
	Loading: boolean;
}

//전역 context의 초기값 (IAuth타입 지정)
const AuthContext = createContext<IAuth>({
	User: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	Error: null,
	Loading: false,
});

//전역 컨텍스트를 루트 컴포넌트에 전달하기 위한 wrapping 컴포넌트
export const AuthProvider = ({ children }) => {
	const [Loading, setLoading] = useState<boolean>(false);
	const [User, setUser] = useState<User | null>(null);
	const [InitialLoading, setInitialLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		//auth상태값이 바뀔때마다 해당 useEffect가 실행됨
		onAuthStateChanged(auth, (user) => {
			//인증 상태를 감지해서
			//전달받은 인증정보가 있으면
			if (user) {
				//state에 담고 로딩풀고 메인페이지 이동
				setUser(user);
				setLoading(false);
				router.push('/');
				//전달받은 인증정보가 없으면
			} else {
				//state에 값비우고 로딩처리하고 로그인 페이지 이동
				setUser(null);
				setLoading(true);
				router.push('/login');
			}
			//한번이라도 인증로직이 실행되면 초기상태를 false로 변경
			setInitialLoading(false);
		});
	}, [router]);

	//회원가입 함수
	const signUp = async (email: string, password: string) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUser(userInfo.user);
				router.push('/');
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//로그인함수
	const signIn = async (email: string, password: string) => {
		setLoading(true);
		await signInWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUser(userInfo.user);
				router.push('/');
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//로그아웃 함수
	const logout = async () => {
		setLoading(true);
		signOut(auth)
			.then(() => {
				setUser(null);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	return (
		<AuthContext.Provider
			value={{ User, signIn, signUp, logout, Loading, Error }}
		>
			{!InitialLoading && children}
		</AuthContext.Provider>
	);
};

//전역 컨텍스트에 접근하기 위한 커스텀훅
export default function useAuth() {
	return useContext(AuthContext);
}
