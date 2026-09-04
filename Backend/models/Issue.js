import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    issueId: {
      type: String,
      unique: true
    },

    inspection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inspection",
      required: true
    },

    mine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mine",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      default: "Safety"
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },

    riskScore: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "Open",
        "Assigned",
        "In Progress",
        "Resolved",
        "Verified"
      ],
      default: "Open"
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    recurring: {
      type: Boolean,
      default: false
    },

    preventionRecommendation: {
      type: String,
      default: ""
    },

    detectedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Issue", issueSchema);