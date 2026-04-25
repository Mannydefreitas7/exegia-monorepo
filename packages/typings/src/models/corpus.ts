import type { CategoryType } from "../enums/category-type";
import type { IBaseBook } from "./base-book";

interface ICorpus extends IBaseBook {
	language: string;
	period: string;
	repository: string;
	size?: string;
	imageUrl?: string;
	category: CategoryType[];
}

export type { ICorpus };
