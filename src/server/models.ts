import { IRegistrant } from '@/types/serverDataTypes';
import { Document, Model, model, models, Schema, Types } from 'mongoose';

export interface IMongoRegistrant extends IRegistrant, Document {
	_id: Types.ObjectId;
}

const registrantSchema = new Schema<IMongoRegistrant>({
	name: { type: String },
	fName: { type: String },
	gfName: { type: String },
	imageUrl: { type: String },
	sex: { type: String },
	phoneNo: { type: Number },
	department: { type: String },
	currentYear: { type: Number },
	issuedDate: { type: Date },
	membershipType: { type: String, default: 'active' },
	donatedAmount: { type: Number },
});

export const Registrant: Model<IMongoRegistrant> =
	models.Registrant || model<IMongoRegistrant>('Registrant', registrantSchema);
