export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other',
}

export enum Type {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: Type.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: Type.Hospital;
    discharge: Discharge;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: Type.OccupationalHealthcare;
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type NewEntry = Omit<Entry, 'id'>;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;