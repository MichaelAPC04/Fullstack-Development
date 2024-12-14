const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

router.get("/patients", async function(req, res){
    let patient = await Patient.find({});
    res.status(200).json(patient);
});

router.post("/patients/add", async function(req, res){
    let patient = new Patient({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
    });
    await patient.save();
    res.status(200).json(patient);
});

router.put("/patients/update", async function(req, res){
    let _id = req.body._id;
    let patient = await Patient.findById(_id);
    patient.name = req.body.name;
    patient.age = req.body.age;
    patient.weight = req.body.weight;
    await patient.save();
    res.status(200).json(patient);
});

router.put("/patients/add-patient", async function(req, res){
    let doctor_id = req.body.doctor_id;
    let patient_id = req.body.patient_id;

    let doctor = await Doctor.findById(doctor_id);
    doctor.patients.push(patient_id);
    await doctor.save();
    res.status(200).json(doctor);
});

module.exports = router;