import { NewPatientEntry, Gender, Entry, HealthCheckRating, DiagnosisEntry, Discharge, SickLeave, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Type } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntries = (param: any): param is Entry[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return param.every((entry: Entry) => ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(entry.type));
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries');
    }

    return entries;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };

    return newEntry;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }

    return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName');
    }

    return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is number => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.keys(HealthCheckRating).includes(HealthCheckRating[param as number]);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    
    if (/*healthCheckRating && */isHealthCheckRating(healthCheckRating)) {
        switch (healthCheckRating) {
            case 0:
                return HealthCheckRating.Healthy;
            case 1:
                return HealthCheckRating.LowRisk;
            case 2:
                return HealthCheckRating.HighRisk;
            default:
                return HealthCheckRating.CriticalRisk;
        }
    } else {
        throw new Error('Incorrect or missing healthCheckRating');
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCodes = (param: any): param is Array<DiagnosisEntry['code']> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return param.every((code: string) => typeof(code) === "string");
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<DiagnosisEntry['code']> => {
    
    if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosisCodes');
    }

    return diagnosisCodes;
};

const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria');
    }

    return criteria;
};

type DischargeFields = { criteria: unknown, date: unknown };

const parseDischarge = ({ criteria, date }: DischargeFields): Discharge => {
    const newDischarge: Discharge = {
        criteria: parseCriteria(criteria),
        date: parseDate(date)
    };

    return newDischarge;
};

type SickLeaveFields = { startDate: unknown, endDate: unknown };

const parseSickLeave = ({ startDate, endDate }: SickLeaveFields): SickLeave => {
    const newSickLeave: SickLeave = {
        startDate: parseDate(startDate),
        endDate: parseDate(endDate)
    };

    return newSickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheck = (param: any): param is Type.HealthCheck => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return param === Type.HealthCheck;
};

const parseHealthCheck = (type: unknown): Type.HealthCheck => {
    if (!type || !isHealthCheck) {
        throw new Error('Incorrect or missing type');
    }

    return type as Type.HealthCheck;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHospital = (param: any): param is Type.Hospital => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return param === Type.Hospital;
};

const parseHospital = (type: unknown): Type.Hospital => {
    if (!type || !isHospital) {
        throw new Error('Incorrect or missing type');
    }

    return type as Type.Hospital;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isOccupationalHealthcare = (param: any): param is Type.OccupationalHealthcare => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return param === Type.OccupationalHealthcare;
};

const parseOccupationalHealthcare = (type: unknown): Type.OccupationalHealthcare => {
    if (!type || !isOccupationalHealthcare) {
        throw new Error('Incorrect or missing type');
    }

    return type as Type.OccupationalHealthcare;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): Omit<HealthCheckEntry, 'id'> | Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcareEntry, 'id'> | undefined => {
   
    switch (object.type) {
        case "HealthCheck":

            const healthCheckEntry: Omit<HealthCheckEntry, 'id'> = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                type: parseHealthCheck(object.type),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };

            if (object.diagnosisCodes) {
                return { ...healthCheckEntry, diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)};
            }

            return healthCheckEntry;
        case "Hospital":

            const hospitalEntry: Omit<HospitalEntry, 'id'> = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                type: parseHospital(object.type),
                discharge: parseDischarge(object.discharge as DischargeFields)
            };

            if (object.diagnosisCodes) {
                return { ...hospitalEntry, diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes) };
            }

            return hospitalEntry;
        case "OccupationalHealthcare":
            const occupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                type: parseOccupationalHealthcare(object.type),
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave as SickLeave)
            };
            
            if (object.diagnosisCodes) {
                return { ...occupationalHealthcareEntry, diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes) };
            }

            return occupationalHealthcareEntry;
    }
    
    return undefined;
};

export default { toNewPatientEntry, toNewEntry };