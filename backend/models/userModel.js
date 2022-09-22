import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: { type: Object, required: true },
  password: { type: String, required: true },
  highestScore: { type: Number, default: 0 },
  isAdmin: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: new Date() },
});

const User = mongoose.model('User', userSchema);
export default User;
