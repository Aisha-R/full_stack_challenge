import patientsData from '../../data/patients.json';

import { PatientEntry } from '../types';

const patients: Array<PatientEntry> = patientsData;

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

const addPatient = () => {
    return null;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};