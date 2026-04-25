import type { BookType, FormatType } from "../enums";

interface IBaseBook {
	uuid: string;
	name: string;
	type: BookType;
	format: FormatType;
	description?: string;
	downloadUri?: string;
	licence?: string;
	date?: Date;
	credits?: string;
};

export type { IBaseBook };
