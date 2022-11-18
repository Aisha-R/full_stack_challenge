import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import React from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetail from '../components/EntryDetail';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";

const PatientPage = () => {

    const { id } = useParams<{ id: string }>();

    const [{ patients }, dispatch] = useStateValue();

    const patient = Object.values(patients).find((patient: Patient) => patient.id === id);
   
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        
        try {
            if (id && patient && patient.entries) {
                
                const { data: modifiedPatient } = await axios.post<Patient>(
                    `${apiBaseUrl}/patients/${id}/entries`,
                    values
                );
                dispatch(updatePatient(modifiedPatient));
            }
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
            }
        }
    };

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
  
    return (
        <>
            {patient &&
                <>
                    <h2>{patient.name} {renderGender()}</h2>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    <h3>entries</h3>
                    {patient.entries && patient.entries.map(entry =>
                        <EntryDetail key={entry.id} entry={entry}/>
                    )}
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        onClose={closeModal}
                    />
                    <Button variant="contained" onClick={() => openModal()}>
                        Add New Entry
                    </Button>
                </>
            }
        </>
    );
};

export default PatientPage;