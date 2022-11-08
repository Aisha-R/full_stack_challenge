import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import { Patient, Diagnosis } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import React from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {

    const { id } = useParams<{ id: string }>();

    const [{ patients }, dispatch] = useStateValue();
   
    const patient = Object.values(patients).find((patient: Patient) => patient.id === id);

    React.useEffect(() => {

        const fetchPatient = async () => {

            try {
                if (id) {
                    const { data: patientFromApi } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch(updatePatient(patientFromApi));
                }
            } catch (e) {
                console.error(e);
            }
        };

        if (Object.keys(patients).length === 0 || patient && !patient.ssn) {

            void fetchPatient();
        }

    }, [dispatch]);

    const renderGender = () => {
        if (patient) {
            switch (patient.gender) {
                case 'female':
                    return <FemaleIcon />;
                case 'male':
                    return <MaleIcon />;
                case 'other':
                    return <TransgenderIcon />;
                default:
                    return patient.gender;
            }
        }
    };
    
    const renderCodes = (codes: Array<Diagnosis['code']> | undefined) => {
        return <ul>{codes && codes.map(code => <li key={code}>{code}</li>)}</ul>;
    };
  
    return (
        <>
            {patient &&
                <>
                    <h2>{patient.name} {renderGender()}</h2>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    <h3>entries</h3>
                    {patient.entries && patient.entries.map(entry =>
                        <div key={entry.id}>
                            <p>{entry.date} {entry.description}</p>
                            {renderCodes(entry.diagnosisCodes)}
                        </div>
                    )}
                </>
            }
        </>
    );
};

export default PatientPage;