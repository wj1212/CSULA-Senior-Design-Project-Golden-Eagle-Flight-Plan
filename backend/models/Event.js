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

    // Students who RSVP'd to this event
    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],

    // Optional link to the scoreboard — faculty sets this when creating an event
    // so RSVP'd students can use it to complete matching milestone tasks.
    scoreboardCategory: {
      type: String,
      enum: ["ACADEMIC_PROGRESS", "CAREER_PREP", "COMMUNITY_LEADERSHIP", null],
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

