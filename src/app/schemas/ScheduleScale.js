import mongoose from 'mongoose';

const ScheduleScale = new mongoose.Schema(
  {
    user: {
      type: Number,
      required: true,
      unique: true,
    },
    scale: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('ScheduleScale', ScheduleScale);
