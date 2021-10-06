import { Document, model, Schema, PopulatedDoc } from 'mongoose'
import tourModel, { TourDocument } from './tour.model'

export enum bookingStatus {
  PENDING,
  REJECTED,
  ACCEPTED,
}

export interface BookingDocument extends Document {
  tour: PopulatedDoc<TourDocument & Document>
  phone: number
  email: number
  status: bookingStatus
  createdAt: Date
  dateFrom: Date
  dateTo: Date
}

const tourSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: tourModel, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  star: { type: Number, required: true },
})

const bookingSchema = new Schema({
  tour: { type: tourSchema, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    emum: ['PENDING', 'REJECTED', 'ACCEPTED'],
    default: 'PENDING',
  },
  createdAt: { type: Date, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
})

export default model<BookingDocument>('Booking', bookingSchema)
