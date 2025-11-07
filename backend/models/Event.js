import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // stored as string for flexibility
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    hashtags: { type: [String], default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdByName: { type: String, default: "" }, // cache faculty name for display
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

