import patientsData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NewPatientEntry } from '../types';
import toNewPatientEntry from "../utils";

const patients: Array<PatientEntry> = patientsData.map(obj => {
    const object = toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    return object;
});

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): Omit<PatientEntry, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};