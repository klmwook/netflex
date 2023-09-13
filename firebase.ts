import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
	authDomain: 'next-netflex.firebaseapp.com',
	projectId: 'next-netflex',
	storageBucket: 'next-netflex.appspot.com',
	messagingSenderId: '954010734197',
	appId: '1:954010734197:web:67b0863f6d7b1b4054b23c',
};

//firebase로 구동되는 app이 없으면 아직 인증처리 되지않았으므로
//인증처리가 되지 않은 상태에서만 초기화 (불필요한 인증객체 초기화 방지)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();

export default app;
export { auth };
