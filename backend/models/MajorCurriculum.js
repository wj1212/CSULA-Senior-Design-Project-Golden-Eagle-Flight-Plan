import mongoose from "mongoose";

const MajorCurriculumSchema = new mongoose.Schema({
    major: { type: String, required: true, unique:true},

    lowerDivision: {type : [String ], default : []},
    upperDivision: {type: [String], default: []},
    electives: {type : [String] , default : [] }, 

    link: {type: [String], default:  ""},

});

export default mongoose.model("MajorCurriculum", MajorCurriculumSchema);