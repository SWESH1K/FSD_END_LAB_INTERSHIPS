import mongoose from "mongoose"


const Schema=mongoose.Schema
const InternshipSchema= new Schema({
    company: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    isFavorite: {
        type: String,
        required: true
    },
    },{timestamps: true})

export default mongoose.model('Internship', InternshipSchema)