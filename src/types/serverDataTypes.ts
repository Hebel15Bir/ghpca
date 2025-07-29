import { FormInfo } from './formDataTypes';

export interface IRegistrant extends Omit<FormInfo, 'image'> {
	imageUrl: string;
}
