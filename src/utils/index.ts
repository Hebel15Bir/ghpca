import { DateInfo, ErrorTypes } from '@/types/formDataTypes';

export function validateFormData<
	T extends Record<string, string | number | File | null | Date>
>(formData: T, errors: ErrorTypes<T>): string | null {
	for (const key in formData) {
		const value = formData[key];

		const isEmpty = value === 0 || value === '' || value === null;

		if (isEmpty) {
			return errors[key];
		}
	}

	return null;
}
