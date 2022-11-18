import { Diagnosis, Entry } from "../types";
import { useStateValue } from "../state";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const EntryDetail = ({ entry }: { entry: Entry }): JSX.Element => {

    const [{ diagnoses },] = useStateValue();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const assertNever = (value: any): never => {
        throw new Error(
            `Unhandled discriminated member: ${JSON.stringify(value)}`
        );
    };

    const renderHealthIcon = (rating: number) => {
        switch (rating) {
            case 0:
                return (
                    <>
                        <FavoriteIcon color="success" />
                    </>
                );
            case 1:
                return (
                    <>
                        <FavoriteIcon color="primary" />
                    </>
                );
            case 2:
                return (
                    <>
                        <FavoriteIcon color="secondary" />
                    </>
                );
            case 3:
                return (
                    <>
                        <FavoriteIcon color="error" />
                    </>
                );
            default:
                return assertNever(rating);
        }
    };

    const renderType = () => {
        switch (entry.type) {
            case "HealthCheck":
                return (
                    <>
                        <MonitorHeartIcon />
                        {renderHealthIcon(entry.healthCheckRating)}
                    </>
                );
            case "Hospital":
                return (
                    <>
                        <LocalHospitalIcon />
                        <p>discharge: {entry.discharge.criteria} on {entry.discharge.date}</p>
                    </>
                );
            case "OccupationalHealthcare":
                return (
                    <>
                        <MedicalInformationIcon />
                        <p>employer: {entry.employerName}</p>
                    </>
                );
            default:
                return assertNever(entry);
        }
    };

    const renderCodes = (codes: Array<Diagnosis['code']> | undefined) => {
        const diagnosisCodes = Object.values(diagnoses).filter((diagnosis: Diagnosis) => codes && codes.includes(diagnosis.code));

        return <ul>{diagnosisCodes && diagnosisCodes.map(diagnosis => <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>)}</ul>;
    };
    
    return (
        <div style={{ border: "solid", margin: 15, marginLeft: 0, padding: 10 }}>
            <p>{entry.date}</p>
            {renderType()}
            <p style={{ fontStyle: "italic"}}>{entry.description}</p>
            {renderCodes(entry.diagnosisCodes)}
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

export default EntryDetail;