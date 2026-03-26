//to get curriculum by major - pr

import express from "express";
import MajorCurriculum from "../models/MajorCurriculum.js";

const router = express.Router();

router.get("/:major", async (req, res) => {
    try{

        const curriculum = await MajorCurriculum.findOne({
            // so its not case sensitive
            major: { $regex: `^${req.params.major}$`, $options: "i" },
        });
        if(!curriculum){
            return res.json({ success: false, message: "Curriculum Not Found"});

        }

        res.json({success: true, curriculum});

    } catch(err){
        res.status(500).json({ success: false, error : err.message });
    }
});

export default router;

