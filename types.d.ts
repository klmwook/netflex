/*
  *.ts vs *.d.tx
  .ts는 js파일로 컴파일됨
  .d.ts는 develope mode에서만 구동되고 일반 js파일로 컴파일 되지않음
  js로 컴파일되지 않으면 빌드시에도 포함되지 않기 때문에 불필요한 파일 용량을 줄일 수 있음
*/
export interface Movie {
	adult: boolean;
	media_type: string;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	overview: string;
	popularity: number;
	poster_path: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	title?: string;
	original_title?: string;
	release_date?: string;
	name?: string; //tv
	origin_country?: string[]; //tv
	origin_name?: string; //tv
	first_air_date?: string; //tv
}
