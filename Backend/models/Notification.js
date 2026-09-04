import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    type: {
      type: String,
      enum: [
        "HIGH_RISK",
        "OVERDUE",
        "ASSIGNED",
        "VERIFICATION",
        "COMPLIANCE"
      ],
      required: true
    },

    title: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    relatedIssue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      default: null
    },

    relatedMine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mine",
      default: null
    },

    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Notification",
  notificationSchema
);