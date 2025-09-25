/**
 * Student model: represents a student profile and links back to a User.
 * You can expand fields as your project grows.
 */

import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IStudent extends Document {
  user: Types.ObjectId;         // ref to User
  firstName: string;
  lastName: string;
  email: string;
  major?: string;
  gradTerm?: string;            // example: "Spring 2026"
}

const StudentSchema = new Schema<IStudent>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    major: { type: String, default: "" },
    gradTerm: { type: String, default: "" }
  },
  { timestamps: true }
);

const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;



