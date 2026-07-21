import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, message: "Name is required" },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ['User', 'Admin'], default: 'User' }
    },
    { timestamps: true }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;