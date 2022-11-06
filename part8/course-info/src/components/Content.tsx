import { CoursePartsProps } from '../types'

const Content = ({ courseParts }: { courseParts: Array<CoursePartsProps> }): JSX.Element => {
    return (
        <>
            {courseParts.map(part =>
                <p key={part.name}>
                    {part.name} {part.exerciseCount}
                </p>
            )}
        </>
    )
}

export default Content;