import mongoose, { Schema, Document } from 'mongoose';

export interface IDiary extends Document {
  title: string;
  content: string;
  date: string;
  tags: string[];
  mood: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DiarySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    tags: [{ type: String }],
    mood: { type: String, required: true },
    userId: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IDiary>('Diary', DiarySchema);