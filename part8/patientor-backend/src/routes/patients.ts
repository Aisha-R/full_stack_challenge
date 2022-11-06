/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import patientService from '../services/patientService';

import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatientEntry = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(newPatientEntry);
});

export default router;