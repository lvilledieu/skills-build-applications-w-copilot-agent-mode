import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
