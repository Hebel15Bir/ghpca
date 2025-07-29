'use client';

import DropDown from '@/components/DropDown';
import SpinBall from '@/components/SpinBall';
import TextInput from '@/components/TextInput';
import { registerMember } from '@/server/actions';
import { FormInfo, ReducerAction } from '@/types/formDataTypes';
import { errorMsgs, initialRegistryState } from '@/utils/consts';
import { validateFormData } from '@/utils';
import Image from 'next/image';
import { FormEvent, useReducer, useState } from 'react';

function reducer(state: FormInfo, action: ReducerAction): FormInfo {
	switch (action.type) {
		case 'update field':
			return {
				...state,
				...action.payload,
			};
		case 'reset form':
			return initialRegistryState;
		default:
			return state;
	}
}

export default function RegisterPage() {
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const [error, setError] = useState('');
	const [state, dispatch] = useReducer(reducer, initialRegistryState);

	const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const missing = validateFormData(state, errorMsgs);
		if (missing) {
			setError(missing);
			return;
		}
		setLoading(true);
		const { error } = await registerMember(state);
		setLoading(false);
		URL.revokeObjectURL(imageUrl);
		setImageUrl('');
		if (error) {
			setError(error);
			setSuccess(false);
		} else {
			setSuccess(true);
			setError('');
		}
	};

	return (
		<form id='form' className='w-md max-w-screen mx-auto shadow-lg rounded p-6'>
			<h2 className='text-2xl font-bold text-center mb-4'>
				GHPCA Registration Form
			</h2>
			<div className='flex w-full justify-center items-center gap-3 mb-3'>
				<div className='min-w-0 flex-1'>
					<div>
						<TextInput
							placeholder='Name'
							name='name'
							value={state.name}
							handleChange={(newVal) => {
								dispatch({
									type: 'update field',
									payload: { name: newVal },
								});
							}}
						/>
						<TextInput
							placeholder="Father's Name"
							name='fName'
							value={state.fName}
							handleChange={(newVal) => {
								dispatch({
									type: 'update field',
									payload: { fName: newVal },
								});
							}}
						/>
						<TextInput
							placeholder="Grandfather's Name"
							name='gfName'
							value={state.gfName}
							handleChange={(newVal) => {
								dispatch({
									type: 'update field',
									payload: { gfName: newVal },
								});
							}}
						/>
						<div>
							<input
								type='radio'
								className='mr-1 h-4 w-4 cursor-pointer'
								name='sex'
								id='male'
								value='male'
								checked={state.sex === 'male'}
								onChange={(e) => {
									dispatch({
										type: 'update field',
										payload: { sex: e.target.value },
									});
								}}
							/>
							<label className='mr-3 text-lg' htmlFor='male'>
								Male
							</label>
							<input
								type='radio'
								className='mr-1 h-4 w-4 cursor-pointer'
								name='sex'
								id='female'
								value='female'
								checked={state.sex === 'female'}
								onChange={(e) => {
									dispatch({
										type: 'update field',
										payload: { sex: e.target.value },
									});
								}}
							/>
							<label className='mr-3 text-lg' htmlFor='female'>
								Female
							</label>
						</div>
					</div>
				</div>
				<div className='flex items-center overflow-hidden justify-center border border-gray-300 p-2 w-[150px] h-52'>
					{imageUrl ? (
						<Image
							id='preview'
							src={imageUrl}
							className='object-cover w-full h-full'
							alt='image of student'
							width={150}
							height={200}
						/>
					) : (
						<label
							id='imageLabel'
							htmlFor='imageInput'
							className='flex items-center justify-center w-full h-full cursor-pointer bg-gray-200 border border-gray-300 rounded-md'
						>
							Upload Image
							<input
								type='file'
								accept='image/*'
								name='file'
								id='imageInput'
								className='hidden'
								onChange={(e) => {
									const file = e.target.files?.[0] as File;
									if (file) {
										setImageUrl(URL.createObjectURL(file));
										dispatch({
											type: 'update field',
											payload: { image: file },
										});
									} else {
										setError(
											'The photo has not been uploaded. Please try again.'
										);
									}
								}}
							/>
						</label>
					)}
				</div>
			</div>
			<div className='flex'>
				<span className='flex items-center px-2 bg-gray-200 mb-2.5'>+251</span>
				<TextInput
					name='phoneNo'
					placeholder='Phone Number'
					value={state.phoneNo ? state.phoneNo : ''}
					handleChange={(newVal) => {
						dispatch({
							type: 'update field',
							payload: { phoneNo: parseInt(newVal) },
						});
					}}
				/>
			</div>
			<TextInput
				placeholder='Department'
				name='department'
				value={state.department}
				handleChange={(newVal) => {
					dispatch({
						type: 'update field',
						payload: { department: newVal },
					});
				}}
			/>
			<TextInput
				name='currentYear'
				placeholder='Current Year'
				value={state.currentYear ? state.currentYear : ''}
				handleChange={(newVal) => {
					dispatch({
						type: 'update field',
						payload: { currentYear: parseInt(newVal) },
					});
				}}
			/>
			<div className='flex items-center text-lg space-x-2 mb-2.5'>
				<label htmlFor='membershipType' className='text-nowrap mb-2.5'>
					Membership Type
				</label>
				<DropDown
					name='membershipType'
					value={state.membershipType}
					items={['active', 'donor']}
					handleChange={(newVal) => {
						dispatch({
							type: 'update field',
							payload: { membershipType: newVal as 'active' | 'donor' },
						});
					}}
				/>
			</div>
			<TextInput
				name='donatedAmount'
				placeholder='Amount to Donate'
				value={state.donatedAmount ? state.donatedAmount : ''}
				handleChange={(newVal) => {
					dispatch({
						type: 'update field',
						payload: { donatedAmount: parseInt(newVal) },
					});
				}}
			/>
			{error && (
				<div className='bg-red-500 p-2 text-white rounded mb-2 5'>{error}</div>
			)}
			<button
				type='submit'
				onClick={handleSubmit}
				className='w-full cursor-pointer p-2 bg-blue-500 text-white rounded-md'
			>
				Register
			</button>
			{isLoading && <SpinBall />}
			{success && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-40'>
					<div className='bg-white rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center'>
						<div className='flex items-center justify-center mb-4'>
							<svg
								className='w-12 h-12 text-green-500'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								viewBox='0 0 24 24'
							>
								<circle
									cx='12'
									cy='12'
									r='10'
									stroke='currentColor'
									strokeWidth='2'
									fill='none'
								/>
								<path
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8 12l3 3 5-5'
								/>
							</svg>
						</div>
						<div className='text-green-700 text-lg font-semibold mb-2'>
							Thank you for registering. Your kindness will help keep people
							alive and healthy.
						</div>
						<button
							className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
							type='button'
							onClick={() => {
								dispatch({
									type: 'reset form',
								});
								setSuccess(false);
							}}
						>
							Press to go back
						</button>
					</div>
				</div>
			)}
		</form>
	);
}
