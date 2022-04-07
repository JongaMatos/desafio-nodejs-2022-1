import {model, Schema} from 'mongoose';

const ListkSchema = new Schema({

    title:{
        type: String,
        required: true,
        unique: false
    }

});


export default model("List", ListkSchema);
