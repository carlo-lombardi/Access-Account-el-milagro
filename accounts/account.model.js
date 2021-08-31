const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: false },
  order: { type: Object, required: false },
  isRegistered: { type: Boolean, required: false },
  acceptTerms: { type: Boolean, required: false },
  role: { type: String, required: true },
  verificationToken: String,
  verified: Date,
  resetToken: {
    token: String,
    expires: Date,
  },
  passwordReset: Date,
  created: { type: Date, default: Date.now },
  updated: Date,
});

userSchema.virtual("isVerified").get(function () {
  return !!(this.verified || this.passwordReset);
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

module.exports = mongoose.model("users", userSchema);
