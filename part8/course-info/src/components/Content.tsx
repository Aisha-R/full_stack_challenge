import { CoursePart } from '../types'

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }): JSX.Element => {

    const renderSwitch = () => {
        switch (part.type) {
            case "normal":
                return (
                    <>
                        <p style={{ fontStyle: "italic" }}>{part.description}</p>
                    </>
                )
            case "groupProject":
                return (
                    <>
                        <p>project exercises {part.groupProjectCount}</p>
                    </>
                )
            case "submission":
                return (
                    <>
                        <p style={{ fontStyle: "italic" }}>{part.description}</p>
                        <p>submit to {part.exerciseSubmissionLink}</p>
                    </>
                )
            case "special":
                return (
                    <>
                        <p style={{ fontStyle: "italic" }}>{part.description}</p>
                        <p>required skills: {part.requirements.map(req => req + ', ')}</p>
                    </>
                )
            default:
                return assertNever(part);
        }
    }

    return (
        <>
            <p style={{ fontWeight: "bold" }}>{part.name} {part.exerciseCount}</p>
            {renderSwitch()}
        </>
    )
}

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
    return (
        <>
            {courseParts.map(part => 
                <Part key={part.name} part={part} />
            )}
        </>
    )
}

export default Content;