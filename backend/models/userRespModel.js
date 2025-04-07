import mongoose from "mongoose";

const userRespSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (v) {
        return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/.test(v);
      },
      message: () => "Enter a valid email address",
    },
  },
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
    minLength: [3, "Firstname must be atleast 3 characters"],
    set: (v) => v.toLowerCase(),
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
    minLength: [3, "Lastname must be atleast 3 characters"],
    set: (v) => v.toLowerCase(),
  },
  phone: {
    type: String,
    // min: [10, "no is < 10"],
    // max: [10, "no is > 10"],
    validate: {
      validator: function (v) {
        if (v.length === 10) return true;
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },

  message: {
    type: String,
    required: [true, "Message is required"],
    maxLength: [100, "Message cannot exceed 100 characters"],
    minLength: [10, "Message must be atleast 10 characters long"],
  },
});
export const UserResponse = mongoose.model("UserResponse", userRespSchema);
