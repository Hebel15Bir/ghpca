import { ErrorTypes, FormInfo } from '@/types/formDataTypes';

export const initialRegistryState: FormInfo = {
	name: '',
	fName: '',
	gfName: '',
	sex: '',
	image: null,
	phoneNo: 0,
	department: '',
	currentYear: 0,
	issuedDate: new Date(),
	membershipType: 'active',
	donatedAmount: 0,
};

export const errorMsgs: ErrorTypes<Partial<FormInfo>> = {
	name: 'Please insert your name.',
	fName: "Please insert your father's name.",
	gfName: "Please insert your grandfather's name.",
	sex: 'Please choose a gender.',
	image: 'Please upload your image.',
	phoneNo: 'Please insert a phone number.',
	department: 'Please insert your department.',
	currentYear: 'Please insert your current year.',
	donatedAmount: 'Please insert an amount to donate.',
};
