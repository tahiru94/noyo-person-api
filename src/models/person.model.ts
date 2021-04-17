import { Schema } from 'mongoose';
import { v4 } from 'uuid';

const PersonSchema = new Schema({
    id: {
        type: String,
        default: v4() // auto-generated ID; different from MongoDB _id
    },
    version: {
        type: Date,
        default: new Date()
    },
    firstName: {
        type: String,
        required: 'A first name must be entered for each Person.'
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: 'A last name must be entered for each Person.'
    },
    email: {
        type: String,
        required: 'An email must be entered for each Person.'
    },
    age: {
        type: Number,
        required: 'An age must be entered for each Person.'
    }
});

export default PersonSchema;