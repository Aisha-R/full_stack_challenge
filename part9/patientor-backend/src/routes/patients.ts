import patientService from '../services/patientService';
import utils from '../utils';

import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = utils.toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.getEntry(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
   
});

router.post('/:id/entries', (req, res) => {
    const patient = patientService.getEntry(req.params.id);
    
    if (patient) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const modifiedPatient = patientService.addEntry(patient, req.body);
        if (modifiedPatient) {
            res.send(modifiedPatient);
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(404);
    }
});

export default router;