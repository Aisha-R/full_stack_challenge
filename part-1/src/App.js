const Part = (props) => {
    return (
        <>
            <p>
                {props.name} {props.number}
            </p>
        </>
    )
}

const Header = (props) => {
    return (
        <div>
            <h2>
                {props.course}
            </h2>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.part.a['name']} number={props.part.a['exercises']} />
            <Part name={props.part.b['name']} number={props.part.b['exercises']} />
            <Part name={props.part.c['name']} number={props.part.c['exercises']} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>
                Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
            </p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content part={{ a: part1, b: part2, c: part3 }} />
            <Total exercises1={part1['exercises']} exercises2={part2['exercises']} exercises3={part3['exercises']} />
        </div>
    )
}

export default App