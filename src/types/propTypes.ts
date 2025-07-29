export interface TextInputProps<T> {
	name: string;
	placeholder: string;
	value: T;
	handleChange: (newVal: string) => void;
}

export interface CheckBoxProps {
	name: string;
	placeholder: string;
	value: boolean;
	handleChange: () => void;
}

export interface DropDownProps<T> {
	name: string;
	value: T;
	placeholder?: string;
	items: T[];
	handleChange: (newVal: string) => void;
}
