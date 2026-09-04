import mongoose from "mongoose";

const inspectionSchema = new mongoose.Schema(
  {
    mine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mine",
      required: true
    },

    location: {
      type: String,
      required: true
    },

    inspectionDate: {
      type: Date,
      required: true
    },

    inspector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    category: {
      type: String,
      enum: [
        "Safety",
        "Environment",
        "Equipment",
        "Infrastructure",
        "Worker Welfare",
        "Emergency"
      ],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },

    riskScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    photo: {
      type: String,
      default: null
    },

    remarks: {
      type: String,
      default: ""
    },

    complianceStatus: {
      type: String,
      enum: ["Compliant", "Warning", "Non-Compliant"],
      default: "Compliant"
    },

    riskAlert: {
      type: Boolean,
      default: false
    },

    recurringRisk: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Inspection", inspectionSchema);