import {model, Schema} from 'mongoose';

const TaskListkSchema = new Schema({

    title:{
        type: String,
        required: true,
        unique: false
    }

});


export default model("TaskList", TaskListkSchema);
