import { connect } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = ({ target }) => {
        props.createFilter(target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    createFilter
}

const ConnectedFilter = connect(
    null,
    mapDispatchToProps
)
    (Filter)

export default ConnectedFilter