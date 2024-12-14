const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

router.get("/doctors", async function(req, res){
    let doctor = await Doctor.find({});
    res.status(200).json(doctor);
});

router.post("/doctors/add", async function(req, res){
    let doctor = new Doctor({name: req.body.name, speciality: req.body.speciality,
    });

    await doctor.save();
    res.status(200).json(doctor);
});

router.delete("/doctors/delete", async function(req, res){
    let _id = req.body._id;
    let doctor = await Doctor.findByIdAndDelete(_id);
    res.status(200).json(doctor);
});

module.exports = router;