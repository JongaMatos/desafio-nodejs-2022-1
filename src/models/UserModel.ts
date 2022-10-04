import { model, Schema } from "mongoose";
import * as bcrypt from "bcryptjs";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        select:false,
        required: true,
    },
});

UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

export default model("User", UserSchema);
