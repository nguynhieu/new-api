import { Document, model, Schema } from 'mongoose'

export interface ContactDocument extends Document {
  name: string
  email: string
  phone: string
  title: string
  content: string
}

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
})

export default model<ContactDocument>('Contact', contactSchema)
