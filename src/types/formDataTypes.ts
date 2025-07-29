export type DateInfo = {
	year: number;
	month: string;
	day: number;
};

export type FormInfo = {
	name: string;
	fName: string;
	gfName: string;
	sex: string;
	image: File | null;
	phoneNo: number;
	department: string;
	currentYear: number;
	issuedDate: Date;
	membershipType: 'active' | 'donor';
	donatedAmount: number;
};

export type ErrorTypes<T> = {
	[K in keyof T]: string;
};

export type ReducerAction =
	| { type: 'reset form' }
	| { type: 'update field'; payload: Partial<FormInfo> };
