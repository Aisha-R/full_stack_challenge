const Parts = ({ parts }) => {
    const arr = parts.map(part => part['exercises'])

    const total = arr.reduce((previous, current) => previous + current)

    return (
        <div>
            <ul>
                {parts.map(part =>
                    <li key={part['id']}>
                        {part['name']} {part['exercises']}
                    </li>
                )}
            </ul>
            <p>total of {total} exercises</p>
        </div>
    )
}

const Course = ({ courses }) => {

    return (
        <>
            {courses.map(course =>
                <div key={course['id']}>
                    <h2>{course['name']}</h2>
                    <Parts parts={course['parts']} />
                </div>
            )}
        </>
    )
}

export default Course