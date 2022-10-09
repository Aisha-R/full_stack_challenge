const Part = ({ part }) => {
    return (
        <li>
            { part['name']} {part['exercises'] }
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
                    <Part key={ part['id']} part={ part } />
                )}
            </ul>
            <p>total of { total } exercises</p>
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
                <Course key={ course['id'] } course={ course } />
            )}
        </>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return <Courses courses={ courses } />
}

export default App