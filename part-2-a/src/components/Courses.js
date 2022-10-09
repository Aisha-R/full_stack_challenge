const Part = ({ part }) => {
    return (
        <li>
            {part['name']} {part['exercises']}
        </li>
    )
}

const Parts = ({ parts }) => {
    const arr = parts.map(part => part['exercises'])

    const total = arr.reduce((previous, current) => previous + current)

    return (
        <div>
            <ul>
                {parts.map(part =>
                    <Part key={part['id']} part={part} />
                )}
            </ul>
            <p>total of {total} exercises</p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <h2>{course['name']}</h2>
            <Parts parts={course['parts']} />
        </div>
    )
}

const Courses = ({ courses }) => {

    return (
        <>
            {courses.map(course =>
                <Course key={course['id']} course={course} />
            )}
        </>
    )
}

export default Courses