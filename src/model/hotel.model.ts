import { Document, model, Schema } from 'mongoose'

export interface HotelDocument extends Document {
  name: string
  price: number
  image: string
  address: string
  description: string
  remainSlot: number
  detail: string
}

const hotelSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  remainingSlot: { type: Number, required: true },
  detail: { type: String, required: true },
})

export default model<HotelDocument>('Hotel', hotelSchema)
