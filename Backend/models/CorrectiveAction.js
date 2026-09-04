import mongoose from "mongoose";

const correctiveActionSchema = new mongoose.Schema(
  {
    actionId: {
      type: String,
      unique: true
    },

    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      required: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    team: {
      type: String,
      default: "Compliance Team"
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },

    deadline: {
      type: Date,
      required: true
    },

    action: {
      type: String,
      required: true
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
      default: "Assigned"
    },

    resolutionPhoto: {
      type: String,
      default: null
    },

    evidenceDocument: {
      type: String,
      default: null
    },

    remarks: {
      type: String,
      default: ""
    },

    verificationStatus: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Rework"
      ],
      default: "Pending"
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    verifiedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "CorrectiveAction",
  correctiveActionSchema
);