import { Document, model, Schema } from 'mongoose'
import config from '../config'

interface AdminDocument extends Document {
  username: string
  password: string
  avatar?: string
}

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: config.defaultAvatar },
})

export default model<AdminDocument>('Admin', adminSchema)
