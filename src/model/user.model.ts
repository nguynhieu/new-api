import { Document, model, Schema } from 'mongoose'
import config from '../config'

interface UserDocument extends Document {
  email: string
  password: string
  username: string
  avatar: string
  phone?: string
  deliveryAddress?: {
    address: string
    ward: string
    district: string
    city: string
  }
  disable: boolean
}

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true, default: config.defaultAvatar },
  phone: { type: String },
  deliveryAddress: {
    address: { type: String },
    ward: { type: String },
    district: { type: String },
    city: { type: String },
  },
  disable: { type: Boolean, required: true, default: false },
})

export default model<UserDocument>('User', userSchema)
