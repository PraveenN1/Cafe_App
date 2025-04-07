import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique:true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength:8
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  console.log("Original password:", this.password);
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Hashed password:", this.password); 
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword=async function (password){
    return await bcrypt.compare(password,this.password);
};

export const User = mongoose.model('User', UserSchema);
