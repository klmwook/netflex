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

	/* 
		- 라우터 이동시 라우터가 너무 빨리 이동이 되서 abort fetch router 에러 문구 뜨는 경우
		- 데이터가 fetching중이거나, 컴포넌트의 추가적인 데이터들이 fully loaded 않았을 때 라우터 변경으로 컴포넌트가 바뀌는 경우
	
		해결방안 (해당 코드는 1,2번으로 해결이 불가능 함 3번으로는 가능 - 전체 컴포넌트를 감싸고 있는 root 컴포넌트이기 때문에 unmount가 불가능하기 때문	)
			1. router.push('/', undefined, {shallow:true})
				- 라우트 이동시 fetching 기능 무시하고 router 이동만 처리 (실제 컴포넌트 변경 시)
			2. 커스텀 훅을 생성하고 그 안쪽에서 router.onChangeComplete 이벤트를 활용해서 기존 라우터 변경이 끝난이후에 router.push 호출 (다른 hook이나 핸들러 함수 안쪽에서 호출 불가)			
			3. useAuth 훅 안에서 유저정보값이 변경될 때 마다 setTimeout으로 강제 debouncing적용
	*/
	useEffect(() => {
		console.log('auth');
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserInfo(user);
				router.push('/');
			} else {
				setUserInfo(null);
				//메인에서 로그인 페이지 넘어갈때 0.6초 동안 push가 중복실행되지 못하도록 debouncing적용
				setTimeout(() => router.push('/Login'), 600);
			}
			//한번이라도 인증로직이 실행되면 초기상태를 false로 변경
			//user정보값이 받아지고 동기적으로 해당값을 false로 변경하기 위해서
			//setTimeout을 이용해서 강제로 web api에 전달했다 받음 (동기화) : promise로 가능
			setTimeout(() => (InitialLoading.current = false), 0);
		});
	}, []);

	//회원가입 함수
	const signUp = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
			})
			.catch((err) => alert(err.message));
	};

	//로그인함수
	const signIn = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
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
	return <AuthContext.Provider value={memoedContext}>{!InitialLoading.current ? children : <div className='loading'></div>}</AuthContext.Provider>;
};

export default function useAuth() {
	return useContext(AuthContext);
}
