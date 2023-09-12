import { useRef } from 'react';

//해당커스텀훅은 호출시 제너릭으로 설정한 Type을 (HTMLDivElement) 기존 HTMLElement타입에 추가
//추가된 변수에 담겨있는 타임을 다시 내부적으로 useRef를 호출해서 제네릭으로 설정
//해당 useRef는 HTMLDivElement까지 포함된 참조객체를 반환
//반환된 property를 다시 ref라는 default property에 덮어쓰기 함
//해당 훅으로 생성하느 참조객체에는 기존 Ref에서 지원하지 않는 타입도 추가해서 생성가능
export function useRefDom<T extends HTMLElement>() {
	const myRef = useRef<T>(null);

	return { ref: myRef };
}
