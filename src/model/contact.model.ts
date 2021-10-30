import { Document, model, Schema } from 'mongoose'

export interface ContactDocument extends Document {
  name: string
  price: string
  image: string
  address: string
  description: string
  remainSlot: string
  detail: string
}

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
})

export default model<ContactDocument>('Hotel', contactSchema)
