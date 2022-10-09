const Part = ({ part }) => {
    return (
        <li>
            {part.name} {part.exercises}
        </li>
    )
}

const Parts = ({ parts }) => {
    const arr = parts.map(part => part.exercises)
   
    const total = arr.reduce((previous, current) => previous + current)

    return (
        <div>
            <ul>
                {parts.map(part =>
                    <Part key={part.id} part={ part } />
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

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
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
    }

    return <Course course={course} />
}

export default App