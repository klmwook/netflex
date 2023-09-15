import { atom } from 'recoil';
import { Movie } from '@/types';

export const modalState = atom<boolean>({
	//atom 객체의 key값이 고유값으로 인지되야되는데 되지 않았음.
	//next에서 pre-render가 미리 되기 때문에 서버에서 한번, hydrate때 또 한번 컴포넌트가 구동 될 때 마다 고유값을 뒤에 추가로 'performance.now()를 붙여서 고유값으로 지정하여 키값 중복 오류 해결
	key: `modalState${performance.now()}`,
	default: false,
});

export const movieState = atom<Movie | null>({
	key: `movieState${performance.now()}`,
	default: null,
});
