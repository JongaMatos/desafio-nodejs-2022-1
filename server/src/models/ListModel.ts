import { model, Schema } from "mongoose";

const ListkSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default model("List", ListkSchema);
