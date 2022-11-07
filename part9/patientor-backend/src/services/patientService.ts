import patientsData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NewPatientEntry } from '../types';
import toNewPatientEntry from "../utils";

const patients: Array<PatientEntry> = patientsData.map(obj => {
    const object = toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    object.entries = [];
    return object;
});

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): Omit<PatientEntry, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry,
        entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getEntry = (id: string): PatientEntry | undefined => {
    const patient = patients.find(patient => patient.id === id);
  
    return patient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getEntry
};