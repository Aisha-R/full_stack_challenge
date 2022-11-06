import diagnosesData from '../../data/diagnoses.json';

import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosesData;

const getEntries = (): DiagnosisEntry[] => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getEntries,
    addDiagnosis
};