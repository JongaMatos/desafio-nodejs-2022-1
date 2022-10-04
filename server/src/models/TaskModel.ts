import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: "List",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default model("Task", TaskSchema);
