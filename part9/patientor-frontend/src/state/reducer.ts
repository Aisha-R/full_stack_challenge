import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        },
        diagnoses: {
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        },
        diagnoses: {
          ...state.diagnoses
        }
      };
    case "UPDATE_PATIENT":
          const newPatients = Object.values(state.patients).filter((patient: Patient) => patient.id !== action.payload.id);
      return {
        ...state,
        patients: {
          ...newPatients.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          [action.payload.id]: action.payload
        },
        diagnoses: {
          ...state.diagnoses
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        patients: {
          ...state.patients
        },
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: data
    };
};

export const addPatient = (data: Patient): Action => {
    return {
        type: 'ADD_PATIENT',
        payload: data
    };
};

export const updatePatient = (data: Patient): Action => {
    return {
        type: "UPDATE_PATIENT",
        payload: data
    };
};

export const setDiagnoses = (data: Diagnosis[]): Action => {
    return {
        type: 'SET_DIAGNOSES',
        payload: data
    };
};
