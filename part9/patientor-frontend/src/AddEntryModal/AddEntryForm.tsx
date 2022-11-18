import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, DiagnosisSelection, HealthCheckRatingOption, TypeOption } from "../AddPatientModal/FormField";
import { HealthCheckRating, Diagnosis } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = { description: string; date: string; specialist: string; diagnosisCodes: Array<Diagnosis['code']>; type: string; healthCheckRating: HealthCheckRating; employerName: string; startDate: string, endDate: string };

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

const typeOptions: TypeOption[] = [
    { value: "HealthCheck", label: "Health Check" },
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                type: "HealthCheck",
                healthCheckRating: HealthCheckRating.Healthy,
                employerName: "",
                startDate: "",
                endDate: ""
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (values.type === "HealthCheck" && !values.healthCheckRating) {
                    errors.healthCheckRating = requiredError;
                }
                if (values.type === "OccupationalHealthcare" && !values.employerName) {
                    errors.employerName = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

                const renderType = () => {
                    switch (values.type) {
                        case "HealthCheck":
                            return <SelectField label="HealthCheckRating" name="healthCheckRating" options={healthCheckRatingOptions} />;
                        case "OccupationalHealthcare":
                            return (
                                <>
                                    <Field
                                        label="Employer Name"
                                        placeholder="Employer Name"
                                        name="employerName"
                                        component={TextField}
                                    />
                                    <Field
                                        label="Sick Leave (Start Date)"
                                        placeholder="YYYY-MM-DD"
                                        name="startDate"
                                        component={TextField}
                                    />
                                    <Field
                                        label="Sick Leave (End Date)"
                                        placeholder="YYYY-MM-DD"
                                        name="endDate"
                                        component={TextField}
                                    />
                                </>
                            );
                    }
                };
              
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <SelectField label="Type" name="type" options={typeOptions} />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)} />
                        {renderType()}
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;