import { model, Schema } from "mongoose";

const TaskkSchema = new Schema({
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
    },
});

export default model("Task", TaskkSchema);
