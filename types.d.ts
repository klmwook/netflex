/*
  *.ts vs *.d.tx
  .ts는 js파일로 컴파일됨
  .d.ts는 develope mode에서만 구동되고 일반 js파일로 컴파일 되지않음
  js로 컴파일되지 않으면 빌드시에도 포함되지 않기 때문에 불필요한 파일 용량을 줄일 수 있음
*/
export interface Movie {
	adult?: boolean;
	first_air_date?: string;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	origin_contry?: string[];
	original_language: string;
	original_title?: string;
	origin_name?: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title?: string;
	name?: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
