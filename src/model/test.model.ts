import { Document, model, Schema } from 'mongoose'

interface testDocument extends Document {
  text: string
}

const testSchema = new Schema({
  text: { type: String, required: true },
})

export default model<testDocument>('Test', testSchema)
