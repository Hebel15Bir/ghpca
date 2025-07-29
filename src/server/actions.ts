'use server';

import { FormInfo } from '@/types/formDataTypes';
import { connectToDatabase } from './db';
import { Registrant } from './models';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: 'de7ltiwkp',
	api_key: '417382341225537',
	api_secret: 'up-Yyw2x-Noa0k_RXVKn2KG6FAM',
});

export async function uploadImage(file: File): Promise<string> {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				transformation: [
					{
						width: 150,
						height: 200,
						crop: 'thumb',
						gravity: 'face',
						zoom: 0.7,
					},
					{ angle: 'auto' },
					{ fetch_format: 'jpg' },
				],
			},
			(error, result) => {
				if (error || !result) reject(error);
				else resolve(result.secure_url);
			}
		);

		uploadStream.end(buffer);
	});
}

export async function registerMember(
	formData: FormInfo
): Promise<{ error: string }> {
	await connectToDatabase();
	const alreadyRegistered = await Registrant.findOne({
		name: formData.name.trim(),
		phoneNo: formData.phoneNo,
	});
	const { image, ...rest } = formData;

	if (alreadyRegistered) {
		return {
			error: 'You have been registered before.',
		};
	}

	if (!image) {
		return {
			error: 'Please upload your image.',
		};
	}
	if (!image.size) {
		return {
			error: 'Please upload your image.',
		};
	}

	let imageUrl: string;

	try {
		imageUrl = await uploadImage(image);
	} catch {
		return {
			error: 'The image has not been successfully uploaded. Please try again.',
		};
	}

	const registrantData = { ...rest, imageUrl };

	const registrant = new Registrant(registrantData);
	await registrant.save();

	return {
		error: '',
	};
}
