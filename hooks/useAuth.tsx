import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import { auth } from '../firebase';

//InitialLoading의 useRef 객체 타입 지정
interface Iloading {
	current: boolean | null;
}

//전역 context객체 타입 지정
interface IAuth {
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	InitialLoading: Iloading;
}

//AuthProvider 컴포넌트가 감싸는 페이지 컴포넌트의 타입 지정
interface AuthProviderProps {
	children: React.ReactNode;
}

//전역 컨텍스트 값 초기화
const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	//IntialLoading값을 전역 컨텍스트에 추가
	InitialLoading: { current: true },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	//유저인증 정보가 바뀔때마다 호출
	//로그인 유무에 따라서 메인, 로그인 페이지로 강제 이동 처리
	const InitialLoading = useRef<boolean>(true);
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		console.log('auth');
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserInfo(user);
				router.push('/');
			} else {
				setUserInfo(null);
				router.push('/Login');
			}
			//한번이라도 인증로직이 실행되면 초기상태를 false로 변경
			//user정보값이 받아지고 동기적으로 해당값을 false로 변경하기 위해서
			//setTimeout을 이용해서 강제로 web api에 전달했다 받음 (동기화) : promise로 가능
			InitialLoading.current = false;
		});
	}, []);

	//회원가입 함수
	const signUp = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
				router.push('/');
			})
			.catch((err) => alert(err.message));
	};

	//로그인함수
	const signIn = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
				router.push('/');
			})
			.catch((err) => alert(err.message));
	};

	//로그아웃 함수
	const logout = async () => {
		signOut(auth)
			.then(() => {
				setUserInfo(null);
			})
			.catch((err) => alert(err.message));
	};

	//새로고침시 같은 로그인 정보값이면 해당 값을 다시 연산하지 않도록 메모이제이션처리해서 전역 context에 넘기고
	const memoedContext = useMemo(() => ({ UserInfo, signIn, signUp, logout, InitialLoading }), [UserInfo, InitialLoading]);
	//로그인정보값이 들어와있을때에만 화면 출력
	//실시간으로 적용되는 IntialLoading값을 전역 context에 담음
	return <AuthContext.Provider value={memoedContext}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
	return useContext(AuthContext);
}
