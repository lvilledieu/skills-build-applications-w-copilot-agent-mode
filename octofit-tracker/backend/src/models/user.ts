import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true },
);

export default model('User', userSchema);
