import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
	return (
		//전역 context를 전달해주는 커스텀 컴포넌트로 전체 페이지 컴포넌트들을 wrapping
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}
