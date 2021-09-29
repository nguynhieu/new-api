import { Document, model, Schema } from 'mongoose'

export interface TourDocument extends Document {
  name: string
  image: string[]
  price: number
  star: number
  startDate: Date
  description: string
  address: string
  remainSlot: number
  createdAt: Date
  phone: string
  email: string
}

const tourSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  star: { type: String, required: true },
  startDate: { type: Date, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  remainSlot: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
})

export default model<TourDocument>('Tour', tourSchema)
