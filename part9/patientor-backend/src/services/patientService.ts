import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NewPatientEntry, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import utils from "../utils";

let patients: Array<PatientEntry> = patientsData.map(obj => {
    const object = utils.toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
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

const addEntry = (patient: PatientEntry, entry: Entry): PatientEntry | null => {

    const object = utils.toNewEntry(entry) as Omit<HealthCheckEntry, 'id'> | Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcareEntry, 'id'>;
    
    if (!object) {
        return null;
    }

    const addedEntry = {
        ...patient,
        entries: patient.entries.concat({ ...object, id: uuid() })
    };
    
    patients = patients.map(listed => {
        if (listed.id === patient.id) {
            return addedEntry;
        }
        return listed;
    });
  
    return addedEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getEntry,
    addEntry
};