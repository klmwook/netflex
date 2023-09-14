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
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	Errors: string | null;
	Loading: boolean;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	Errors: null,
	Loading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [Loading, setLoading] = useState<boolean>(false);
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	const [Errors, setErrors] = useState<string | null>(null);
	const [InitialLoading, setInitialLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		console.log('auth');
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserInfo(user);
				setLoading(false);
				router.push('/');
			} else {
				setUserInfo(null);
				setLoading(true);
				router.push('/login');
			}
			//한번이라도 인증로직이 실행되면 초기상태를 false로 변경
			setInitialLoading(false);
		});
	}, []);

	//회원가입 함수
	const signUp = async (email: string, password: string) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
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
				setUserInfo(userInfo.user);
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
				setUserInfo(null);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	//새로고침시 같은 로그인 정보값이면 해당 값을 다시 연산하지 않도록 메모이제이션처리해서 전역 context에 넘기고
	const memoedContext = useMemo(
		() => ({ UserInfo, signIn, signUp, logout, Loading, Errors }),
		[UserInfo, Loading]
	);
	//로그인정보값이 들어와있을때에만 화면 출력
	return (
		<AuthContext.Provider value={memoedContext}>
			{!InitialLoading && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
